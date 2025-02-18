import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:"https://api.rashash.io",
  withCredentials: true, //allows us to send back cookies to the server
 
})
export default axiosInstance;