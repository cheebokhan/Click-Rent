import axios from "../heplers/appManagerApiHelper";
import {
  LOGIN_URL,
  GET_USER_PROFILE_URL,
  Post_Logout_URL,
  Post_RefreshToken_URL,
  Post_UpdateUSER_PROFILE_URL,
  Post_UpdateUserPassword_URL,
  Get_CustomerApps_URL,
  Post_VerifyInternalAppLogin_URL,
  Get_LanguageDictionary_URL,
  Post_AddNewText_URL,
} from "../constants/apiUrls";
import { SET_USER_DATA } from "../constants/types";
import authService from "../utils/authUtils";
import { SERVER_URL } from "../constants";
import { validateAuthentication } from ".";

export const userLogin = (payload) => async (dispatch) => {
  try {
    const response = await axios().post(LOGIN_URL, payload);
    dispatch({ type: SET_USER_DATA, payload: response.data.user });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const verifyInternalAppLogin = async (payload, onSuccess, onError) => {
  try {
    const response = await axios().post(
      Post_VerifyInternalAppLogin_URL,
      payload
    );
    //dispatch({ type: SET_USER_DATA, payload: response.data.user });
    if (response.status === 200 || response.status === 201) onSuccess(response);
    else onError(response.data);
    //return response;
  } catch (error) {
    onError(error);
  }
};
export async function getCustomerApps(payload, onSuccess, onError) {
  try {
    const response = await axios().get(Get_CustomerApps_URL, {
      params: payload,
    });
    onSuccess(response.data);
  } catch (error) {
    return onError(error.response);
  }
}

export const tryGetRefreshToken = async (axiosRefreshInstance, payload) =>  {
  
    try {
      const response = await axios().post(`${Post_RefreshToken_URL}`, payload);
     
      return response;
    } catch (error) {
      return error.response;
      //onError(error.response)
    }
  };
export const getUserData = (onSuccess, onError) => async (dispatch) => {
  await validateAuthentication("get", async (token) => {
    
    try {
      const response = await axios(token).get(GET_USER_PROFILE_URL);
      
      onSuccess(response);
    } catch (error) {
   
      return onError(error.response);
    }
  });
};
export const updateUserInfo = (payload, onSuccess, onError) => {
  validateAuthentication("post", async (token) => {
    try {
      const response = await axios(token).post(
        Post_UpdateUSER_PROFILE_URL,
        payload
      );
      onSuccess(response);
    } catch (error) {
      return onError(error.response);
    }
  });
};
export const updateUserPassword =
  (payload, onSuccess, onError) => async (dispatch) => {
    await validateAuthentication("post", async (token) => {
      try {
        const response = await axios(token).post(
          Post_UpdateUserPassword_URL,
          payload
        );
        onSuccess(response);
      } catch (error) {
        return onError(error.response);
      }
    });
  };

export const Logout = (history) => async (dispatch) => {
  try {
    const response = await axios().post(Post_Logout_URL);
    dispatch({ type: "LOGOUT" });
    return response;
  } catch (error) {
    dispatch({ type: "LOGOUT" });
    return error.response;
  }
};

// export const setUserData = (payload) => async (dispatch) => {
//   dispatch({ type: SET_USER_DATA, payload: payload });
// };

export async function getLanguage(onSuccess, onError) {
  try {
    const response = await axios(null).get(Get_LanguageDictionary_URL, {
      params: {},
    });
    
      onSuccess(response);

   
  } catch (error) {
    if (onError) onError(error?.response);
    // console.log("kjalhdasjkldasjd",error)
    // return;
    // if (error?.response?.status === 401 || typeof error?.response?.status ==='undefined') {
    //   window.location.reload();
    // }
  }
}

export async function addLanguage(model, onSuccess, onError) {
  try {
    const response = await axios(null).post(Post_AddNewText_URL, model);
    onSuccess(response);
  } catch (error) {
    if (onError) onError(error.response);
    if (error.response.status === 401) {
      console.log("jhasgkdasadaad add Language",error)
      alert("jhsgkdas")
      window.location.reload();
    }
  }
}
