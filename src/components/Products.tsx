import { ImageLink, PRODUCT_PER_PAGE, Product, ProductList } from "../types";
import { useEffect, useState } from "react"
import Loading from "./Loading";
import { useDebounce } from "../hooks/use-debounce";
import Input from "./Input";

const Products = () => {
  const [options, setOptions] = useState<string>(`?limit=${PRODUCT_PER_PAGE}`);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductList>(undefined);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 500)

  // Fetch data function
  const fetchProducts = async (queryParams: string) => {
    try {
      const data = await fetch(`https://dummyjson.com/products${queryParams}`)
        .then(res => res.json())
        .finally(() => setIsLoading(false))
      setTotalPage(data.total / PRODUCT_PER_PAGE)
      const productsData = data.products.map((product: any) => {
        return {
          id: product.id,
          name: product.title,
          price: product.price,
          images: product.images
        }
      }) as Product[];

      if (!productList) {
        setProductList(productsData);
      } else {
        setProductList((prevProducts: ProductList) => [...prevProducts as Product[], ...productsData]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Refetch data after updating query parameters
  useEffect(() => {
    fetchProducts(options);
  }, [options])

  //Search after stop typing 500ms
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      setProductList(undefined);
      setOptions(`/search?limit=${PRODUCT_PER_PAGE}&q=${debouncedValue}`);
      setPage(1)
    }
  }, [debouncedValue])


  // Listen when scrolling to the end of the list
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolling to the end and not loading and not exceeding the totalPage
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !isLoading && page < totalPage) {
        setIsLoading(true);
        if (debouncedValue.length !== 0) {
          setOptions((`/search?limit=${PRODUCT_PER_PAGE}&skip=${page * PRODUCT_PER_PAGE}&q=${debouncedValue}`));
        } else {
          setOptions(`?limit=${PRODUCT_PER_PAGE}&skip=${page * PRODUCT_PER_PAGE}`);

        }
        setPage((prev: number) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);
  
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Input onSearch={(searchValue) => setSearchValue(searchValue)} />

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex justify-between w-full min-w-[800px]">
            <h3 className="text-red-600 text-[32px] pb-5">
              List of Products:
            </h3>
            <h3 className="text-red-600 text-[32px] pb-5">
              Total Products: {totalPage * PRODUCT_PER_PAGE}
            </h3>
          </div>
          {productList?.map((product: Product, i: number) => (
            <div key={i} className="flex flex-col items-center gap-2 w-full p-10 border border-solid border-[#333] bg-cyan-400 z-10">
              <h5 className="text-[32px] text-green-600 text-center">
                {product.name}
              </h5>
              <p className="text-2xl text-black text-center">
                {product.price}$
              </p>
              <div className="flex items-center gap-3">
                {product.images.map((imageLink: ImageLink, id: number) => (
                  <img key={id} src={imageLink} alt={`product number ${id + 1}`} className="w-[150px] h-[200px]" />
                ))}
              </div>
            </div>
          ))}
          {productList && productList.length === 0 && <p>There is no products</p>}
          {isLoading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default Products