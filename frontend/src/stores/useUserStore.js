// Global State
import { toast } from "react-hot-toast";
import { create } from "zustand"; // package for global state management
import axios from "../lib/axios";



export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password != confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match!");
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });

      if (res.status == 201) {
        toast.success(
          `Welcome ${res.data.name}. Your account was created successfully!`
        );
      }
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Oops, an error occured :(");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      console.log(res.status);
    } catch (error) {
      toast.error(error.response.data.message || "Oops, an error occured :(");
      set({ loading: false });
    }
  },

  checkAuth: async ()=>{
    set ({checkingAuth: true})
    try {
      const response = await axios.get("/auth/profile");
      set({user: response.data, checkingAuth:false});
     
      
    
      
    } catch (error) {
      
      set({checkingAuth:false, user:null})
      if (error.status === 401){
        return console.log("User is not authenticated....")
      
      }
      
    }

      
  },

  logout: async ()=>{
    try {
      const response = await axios.post("/auth/logout");
      set({user: null});
      toast.success(response.data.message +" See you soon ;)")
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Oops.. Something went wrong")
      
    }
  },
  refreshToken: async () =>{
    //prevent multiple simultanous refresh attempts
    if (get().checkingAuth) return
    
    set({checkingAuth:true});
    try{
      const response = await axios.post("/auth/refresh-token")
       set({ checkAuth: false });
       return response.data
    }catch(error){
      set({user:null})
      throw error
    }finally{
      set({checkAuth: false})
    }
  }

}));

export default useUserStore;

//axios interceptor for token refresh

let refreshPromise = null;
axios.interceptors.response.use(
  
  (response) => response, // if nothing is wrong, it will move on
  async (error) => { // if we get error we check for autherization error
    console.log("==INTERCEPTED==");
    const orignalRequest = error.config;
    if (error.response?.status === 401 && !orignalRequest._retry){
      console.log("==INTERCEPTED 401==");
      orignalRequest._retry= true;// retrying the request again 
      try{// trying to get access token from refresh token
        //if a refresh in progress, wait for it to complete
        if(refreshPromise){ 
          await refreshPromise
          return axios(orignalRequest)
        } 
        //start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken()
        await refreshPromise;
        refreshPromise = null;
        return axios(orignalRequest);

      }catch(refreshError){
        //If refresh fails redirect to login
        console.log("==INTERCEPTED REFRESH ERROR==");
        useUserStore.getState().logout(); 
        return Promise.reject(refreshError);
      }
    }
    console.log("==INTERCEPTED REJECTING ERROR==>",error);
    return Promise.reject(error);
  }
);
