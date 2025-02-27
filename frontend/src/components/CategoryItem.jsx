import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { shrinkName } from "../utils";

export const CategoryItem = ({ category }) => {

  if(!category.enabled)return
  const categoryLink ="/category/" + category.name.replace(/ /g, "-").toLowerCase() // the / /g is to replqace globally because the " " will only replace the first one
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group">
      <Link to={categoryLink}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />

          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 shadow-xl border-t-2 border-emerald-500 right-0 p-4 z-20 bg-black/50 group-hover:bg-black/80 transition-all duration-400 backdrop-filter backdrop-blur-md">
            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-emerald-500">
              {shrinkName(category.name, 20)}
            </h3>
            <p className="text-sky-500 text-sm flex items-center gap-2">
              Explore {category.name} <ArrowRight />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
