import { useState } from "react";
import { useCategoryStore } from "../../stores";
import {motion} from 'framer-motion'
import { CheckCheck, Loader, Upload,PlusCircle } from "lucide-react";

export const CreateCategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    enabled: false,
    image: "",
  });
  const { createCategory, loading } = useCategoryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await createCategory(newCategory);
      console.log(res);
      setNewCategory({
        name: "",
        image: "",
        enabled: false,
      });
    } catch (error) {
      console.log("Error Creating Category at handleSubmit createCategory");
      console.log("Error ==>", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //getting the file the user selected
    if (file) {
      const reader = new FileReader(); //Creating a file reader
      reader.onloadend = () => {
        //basically updating state
        setNewCategory({ ...newCategory, image: reader.result });
      };
      reader.readAsDataURL(file); //base64 format
    }
  };

    return (
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
          Create New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>


        

          
          {/* Image Upload */}
          {/* Converting image to base64 */}
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {newCategory.image && (
              <span className="ml-3 text-sm text-emerald-600 flex">
                <CheckCheck className="mr-2 h-5 w-5" />
                Image uploaded
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
        shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Category
              </>
            )}
          </button>
        </form>
      </motion.div>
    );
};
export default CreateCategoryForm;
