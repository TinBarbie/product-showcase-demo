
type InputProps = {
    onSearch: (searchValue: string) => void
}

const Input = ({ onSearch }: InputProps) => {
    return (
        <div className="h-10 flex items-center gap-4">
            <label htmlFor="description">
                Search for products
            </label>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                className="h-[60px] w-[250px]"
                onChange={(e) => { onSearch(e.target.value) }} />
        </div>
    )
}

export default Input