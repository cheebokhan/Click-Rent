import { SET_USER_DATA } from "../constants/types";
import authUtils from "../utils/authUtils";
import jwtDecode from "jwt-decode";

const initState = {
  user: null,
};


if(authUtils.getUserToken()){
  const userData = jwtDecode(authUtils.getUserToken());
  initState.user=userData.Email  
}



const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      
      return {
        ...state,
        user: action.payload,
      };
      case 'LOGOUT':
        initState.user=null;  
      state=initState;
    default:
      return { ...state };
  }
};

export default userReducer;
