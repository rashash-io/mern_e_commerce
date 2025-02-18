import {toast} from 'react-hot-toast';
import {create} from "zustand";
import axios from "../lib/axios"

export const useCategoryStore = create((get,set)=>({
  categories: [],
  loading: false,

  setCategories: (categories)=> set({categories}),

  createCategory: async(categoryData) =>{
     set({ loading: true });
     try{
       const res = await axios.post("/categories", categoryData);
       console.log("res useCategoryStore CreateCatfunc ==>", res?.data);

       set((prevState) => ({
         categries: [...prevState.categories, res.data],
         loading: false,
       }));
       if (res.status == 201) {
         toast.success("Product has been addded successfully");
       }
     }
      catch (error) {
      toast.error(error.response.data.error);
      toast.error("ERROR: ==> createCategory in useCategoryStore");
      set({ loading: false });
    }
  },

  fetchAllCategories: async()=>{
    set({loading:true});
    try{
      const response =await  axios.get("/categories")
     
      set({ categories: response.data.categories, loading: false });
    }catch(error){
      set({error: "Failed to fetch categories", loading: false});
      toast.error(error.response.data.error || "Failed to fetch categories")
    }
  },

}))