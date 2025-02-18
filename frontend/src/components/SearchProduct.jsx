import { Search, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/";
export const SearchProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const { products } = useProductStore();

  useEffect(() => {
    
    if (products && products.length > 0) {
     

      const filtered = products.filter((product) =>
        Object.values(product).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchKeyword]);

  return (
    <div className="flex flex-col justify-center items-center ">
      {/* SEARCH INPUT */}
      <div className="my-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
          placeholder="Search for a product"
        />
      </div>

      {/* DISPLAYING SEARCH RESULT */}

      {searchKeyword.length > 0 && (
        <div className="bg-gray-950 p-6 rounded-xl w-[70%]">
         
          {filteredProducts?.map((product) => (
            <SearchProductItem key={product._id} product={product} />
          ))}

          {/* ITEMS NOT FOUND */}
          {filteredProducts.length == 0 && (
            <div className="flex gap-2 items-center justify-center">
              <TriangleAlert className="text-emerald-500" />
              <span className="font-bold"> Product not found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;

export const SearchProductItem = ({product})=>{
  var prodName = product.name
  const productPage ="/product/" + product._id
  if (product.name.length > 45){
    prodName = product.name.slice(0,45) + " ..."
  }
  return (
    <Link to={productPage}>
    <div className="grid grid-cols-6 m-1 rounded-xl p-2 items-center  justify-center hover:bg-gray-900">
      {/* Image + title */}
      <div className="col-span-5 flex gap-4 items-center">

        <img
          className="h-10 w-10 rounded-full object-cover"
          src={product.image}
        />
        <span className="">{prodName}</span>
      </div>
      <span className=" col-span-1 italic text-gray-500 text-center">{product.category}</span>
    </div>
    </Link>
  );
}
