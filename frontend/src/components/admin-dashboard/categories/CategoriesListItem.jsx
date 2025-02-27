import { Edit, LoaderCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useCategoryStore } from "../../../stores";
import { shrinkName } from "../../../utils";

export const CategoriesListItem = ({ category }) => {
  const { toggleEnabled, loading, deleteCategory } = useCategoryStore();
  const [enabledActive, setEnabledActive] = useState(category.enabled);

  const handleEditCategory = (categoryId) => {
    console.log(categoryId);
  };
  const handleToggle = (categoryId) => {
    toggleEnabled(categoryId);
    setEnabledActive(!enabledActive);
  };
  return (
    <tr key={category._id} className="hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={category.image}
              alt={category.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">
              {shrinkName(category.name, 20)}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4  whitespace-nowrap text-sm font-medium">
        {/* ---------- ENABLE TOGGLE---------- */}

         <label className="toggle text-base-content">
          <input
            type="checkbox"
            onChange={() => handleToggle(category._id)}
            checked={enabledActive}
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
          ) : enabledActive ? (
            "  SHOWN"
          ) : (
            "  HIDDEN"
          )}
        </button>
        {/* ---------- EDIT CATEGORY ---------- */}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => handleEditCategory(category._id)}
          className="text-sky-400 hover:text-sky-300"
        >
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            open modal
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <Edit className="h-5 w-5" />
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => deleteCategory(category._id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default CategoriesListItem;

export const ToggleWithIcons = ({toggleFunction, category}) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <label className="toggle text-base-content">
        <input
          type="checkbox"
          onChange={() =>{ 
            setActive(!active); 
            toggleFunction();
          }}
          checked={active}
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
        {active ? "ENABLED" : "DISABLED"}
      </button>
    </>
  );
};

