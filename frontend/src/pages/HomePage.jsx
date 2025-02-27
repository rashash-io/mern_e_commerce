import { useEffect } from "react";
import { CategoryItem, FeaturedProducts } from "../components";
import { useCategoryStore, useProductStore } from "../stores";

export function HomePage() {
  const { fetchFeaturedProducts, products } = useProductStore();
  const { fetchAllCategories, categories,loading } = useCategoryStore();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchAllCategories();
  }, [fetchFeaturedProducts, fetchAllCategories]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-md text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category._id}>
              
              <CategoryItem category={category} key={category._id} />
            </div>
          ))}
        </div>
        {!loading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
