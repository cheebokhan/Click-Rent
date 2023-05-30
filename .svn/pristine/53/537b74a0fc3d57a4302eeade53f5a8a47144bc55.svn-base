import { CLEAR_SUB_MENU, SET_SUB_MENU, SET_USER_DATA } from "../constants/types";

const initState = {
  subMenu: null,
  hideTopMenu:true
};

const subMenuReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SUB_MENU:

      return {
        ...state,
        subMenu: action.payload,
  hideTopMenu:true

      };
      case CLEAR_SUB_MENU:
       return {...state,
        subMenu:null,
  hideTopMenu:false
}
    default:
      return { ...state };
  }
};

export default subMenuReducer;
