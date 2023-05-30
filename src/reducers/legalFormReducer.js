import { Get_AllCompanyGroups_URL } from "../constants/apiUrls";
import {
  GET_AllLegalForm,
  LegalForm__LOADING,
  GET_AllLegalForm_ERROR
} from "../constants/types";

const initState = {
  legalFormloading: false,
  errors: null,
  legalForms: [],
  legalForm: [],
  legalFormError: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    // case GET_Company:
    //   return {
    //     ...state,
    //     company: action.payload,
    //     companyError: null,
    //   };
    // case Company_ERROR:
    //   return {
    //     ...state,
    //     company: null,
    //     companyError: action.payload,
    //   };
    // case Company_ERROR:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case GET_AllCompanies_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     errors: action.payload,
    //     legalForms: [],
    //   };
    case GET_AllLegalForm:
      return {
        ...state,
        loading: false,
        errors: null,
        legalForms: action.payload,
      };
      case LegalForm__LOADING:
      return {
        ...state,
        loading: true,
      };
      case GET_AllLegalForm_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        legalForms: [],
      };
    // case EDIT_ACTIVITY:
    //   return {
    //     ...state,
    //     type: action.payload,
    //   };

    default:
      return {
        ...state,
      };
  }
};
