export type ImageLink = string;

export type Product = {
    id: number;
    name: string;
    price: number;
    images: ImageLink[]
}

export type ProductList = Product[] | undefined

export const PRODUCT_PER_PAGE = 20;