import axios from "axios";
import { APP_MANAGER_SERVER_URL } from "../constants";
import authService from "../utils/authUtils"

const instance = (token) => {
  const axiosInstance = axios.create({
    baseURL: APP_MANAGER_SERVER_URL
  });

  axiosInstance.interceptors.request.use(
    async req => {
      let headers = {};
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    }
  )
  axiosInstance.interceptors.response.use(
    (response) => {
      return new Promise((resolve, reject) => resolve(response))
    },
    (error) => {
      
      return new Promise((resolve, reject) => {
        
        if (!error.response) {
          
          let err = {};
          err.response = {
            data: "Network Error",
          };
          return reject(err);

        }
        if (error.response.status === 401) {
          let err = {};
          authService.logout();
          err.response = {
            data: "Session Expired. Please login again.",
            status:401
          };
          return reject(err);
        }
        if (error.response) {
         
          return reject(error);
        }
      });
    }
  );

  return axiosInstance;
};


export default instance