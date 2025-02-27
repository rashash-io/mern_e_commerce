import { motion } from "framer-motion";
import { CategoriesListItem } from "../../components";
import { useCategoryStore } from "../../stores";

export const CategoriesList = () => {
  const { deleteCategory, categories, loading, toggleEnabled } =
    useCategoryStore();

  const handleEditCategory = (categoryId) => {
    console.log(categoryId);
  };
  const handleToggleEnable = (categoryId) => {
    console.log(categoryId);
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl   "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
    
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Shown
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Edit
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {/* ----- MAPPING EACH CATEGORY IN TABLE ----- */}
          {categories?.map((category) => (
            <CategoriesListItem key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default CategoriesList;
