import { ChevronsRight } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components";
import { useCategoryStore, useProductStore } from "../stores";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const SideCategory = () => {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0);
  const { category } = useParams();
  const { categories, fetchAllCategories, loading } = useCategoryStore();
   const { fetchProductsByCategory, products } = useProductStore();
   useLayoutEffect(() => {
     fetchAllCategories();
   }, [fetchAllCategories]);
 


  return (
    <div className="hidden md:flex justify-center h-full w-full  overflow-hidden">
      <div className="flex h-[90vh]   justify-center items-start overflow-hidden  ">
        <div className=" border border-gray-900 p-8 m-4 bg-gray-950 rounded-xl  ">
          <span className="text-emerald-500 font-bold text-2xl">
            Explore Other Categories
          </span>

        
          {categories.map((cat) => (
            <div
              key={cat._id}
              className={`rounded-xl ${
                cat.name.toLowerCase() === category.toLowerCase()
                  ? "text-emerald-500 font-bold   bg-gray-800"
                  : "bg-gray-900"
              }`}
            >
              <Link
                to={`/category/${cat.name.toLowerCase()}`}
                className="text-lg flex items-center m-2 rounded-xl p-2 gap-2"
              >
                <ChevronsRight />

                {cat.name.slice(0, 1).toUpperCase() +
                  cat.name.slice(1)}
              </Link>
            </div>
          ))}
          <LoadingSpinner loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SideCategory;
