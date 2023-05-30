import { Add_BreadCrumb,Replace_And_Add_BreadCrumb,Clear_All_BreadCrumb } from "../constants/types";
import authUtils from "../utils/authUtils";
import jwtDecode from "jwt-decode";

const initState = {
  breadcrumbs: [],
};


if(authUtils.getUserToken()){
  const userData = jwtDecode(authUtils.getUserToken());
  initState.user=userData.Email  
}



const userReducer = (state = initState, action) => {
  switch (action.type) {
    case Add_BreadCrumb:
      state.breadcrumbs.push(action.payload)
      return {
        ...state
      };
    case Replace_And_Add_BreadCrumb:
      state.breadcrumbs.pop();
      state.breadcrumbs.push(action.payload)
      return {
        ...state,
      };
    case Clear_All_BreadCrumb:
      state.breadcrumbs = []
      return {
        ...state,
        
      };
    default:
      return { ...state };
  }
};

export default userReducer;
