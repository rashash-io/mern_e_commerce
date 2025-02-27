import { toast } from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  setCategories: (categories) => set({ categories }),

  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/categories", categoryData);
    

      set((prevState) => ({
        categries: [...prevState.categories, res.data],
        loading: false,
      }));
      if (res.status == 201) {
        toast.success("Category has been addded successfully");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      toast.error("ERROR: ==> createCategory in useCategoryStore");
      set({ loading: false });
    }
  },
  fetchAllCategories: async () => {
    set({ loading: true });
    useCategoryStore.setState([{ categories: "AMRRMRM" }]);
    try {
      const resp = await axios.get("/categories");
      
      set({
        categories: resp?.data?.categories,
        loading: false,
        replace: true,
      });
    } catch (error) {
      set({ error: "Failed to fetch categories", loading: false });
      toast.error(error.response?.data.error || "Failed to fetch categories");
    }
  },
  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await axios.delete(`categories/${categoryId}`);
      set((prevcategories) => ({
        categories: prevcategories.filter(
          (category) => category._id !== categoryId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data.error || "Failed to delete product");
    }
  },
  toggleEnabled: async (categoryId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/categories/${categoryId}`);
      set((prevCategories) => ({
        products: prevCategories.categories.map((category) =>
          category._id === categoryId
            ? { ...category, enabled: response.data.enabled }
            : category
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
}));
