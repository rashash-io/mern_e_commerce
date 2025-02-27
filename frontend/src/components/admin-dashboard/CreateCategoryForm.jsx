import { useState } from "react";
import { useCategoryStore } from "../../stores";
import {motion} from 'framer-motion'
import { CheckCheck, Loader, Upload,PlusCircle, LoaderCircle } from "lucide-react";

export const CreateCategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    enabled: false,
    image: "",
  });
  const { createCategory, loading , fetchAllCategories} = useCategoryStore();

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
      fetchAllCategories()
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
        className="bg-gray-800 shadow-lg rounded-lg p-8  max-w-xl "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {" "}
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
          {/* ---------- ENABLE TOGGLE---------- */}
          <div className="flex flex-row">

          <label className="toggle text-base-content">
            <input
              type="checkbox"
              onChange={(e) => setNewCategory({...newCategory, enabled: e.target.checked})}
              checked={newCategory.enabled}
            />
            <svg
              aria-label="disabled"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <svg
              aria-label="enabled"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="4"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </g>
            </svg>
          </label>
          <button className="ml-2 text-sky-400 hover:text-sky-300">
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : newCategory.enabled ? (
              "  SHOWN"
            ) : (
              "  HIDDEN"
            )}
          </button>
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
