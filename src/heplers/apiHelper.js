import axios from "axios";
import { tryGetRefreshToken } from "../actions";
import { SERVER_URL } from "../constants";
import authService from "../utils/authUtils"
let subscribers = []
let isAlreadyFetchingAccessToken = false
const instance = (token) => {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials:false
  });

  axiosInstance.interceptors.request.use(
    async req => {
      let headers = {};
      req.headers.Authorization = `Bearer ${token}`;
      
      return req;
    }
  )
  axiosInstance.defaults.headers.common['customerId'] = authService.getCustomerId()
  // axiosInstance.defaults.headers.common['user'] = JSON.stringify(authService.getUser())
  axiosInstance.defaults.headers.common['Accept'] =  "*/*"
  axiosInstance.interceptors.response.use(
    (response) => {
      return new Promise((resolve, reject) => resolve(response))
    },
    (error) => {

      return new Promise((resolve, reject) => {
        console.log("Error => ",error)
        if (!error.response) {

          let err = {};
          err.response = {
            data: "Network Error",
          };
          return reject(err);

        }
        if (error.response.status === 401) {
          let err = {};
          err.response = {
            data: "Session Expired. Please login again.",
            status: 401
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