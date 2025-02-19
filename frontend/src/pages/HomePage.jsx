import { CategoryItem, FeaturedProducts, SearchProduct} from "../components";
import { useEffect } from "react";
import { useProductStore, useCategoryStore } from "../stores";



export function HomePage() {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  const {fetchAllCategories, categories} = useCategoryStore();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchAllCategories();
  }, [fetchFeaturedProducts, fetchAllCategories]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      <SearchProduct />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category._id} />
          ))}
        </div>
          {!isLoading && products.length > 0 && (
            <FeaturedProducts featuredProducts={products} />
          )}
      </div>
    </div>
  );
}

export default HomePage;
