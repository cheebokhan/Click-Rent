import { Get_AllCompanyGroups_URL } from "../constants/apiUrls";
import {
  GET_Company,
  Company_ERROR,
  GET_AllCompanies,
  GET_AllCompanies_ERROR,
  EDIT_Company,
  GET_AllCompanyGroups,
  GET_AllCompanyGroups_ERROR,
  CompanyGroups__LOADING,
  GET_AllGeneralPartners
} from "../constants/types";

const initState = {
  companyGrouploading: false,
  loading: false,
  errors: null,
  companies: [],
  generalPartners: [],
  companyGroups: [],
  company: [],
  companyError: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_Company:
      return {
        ...state,
        company: action.payload,
        companyError: null,
      };
    case Company_ERROR:
      return {
        ...state,
        company: null,
        companyError: action.payload,
      };
    case Company_ERROR:
      return {
        ...state,
        loading: true,
      };
    case GET_AllCompanies_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        companies: {},
      };
    case GET_AllCompanies:
      return {
        ...state,
        loading: false,
        errors: null,
        companies: action.payload,
      };

      case GET_AllGeneralPartners:
      return {
        ...state,
        loading: false,
        errors: null,
        generalPartners: action.payload,
      };
      case CompanyGroups__LOADING:
      return {
        ...state,
        loading: true,
      };
      case GET_AllCompanyGroups:
        return {
          ...state,
          companyGrouploading: false,
          errors: null,
          companyGroups: action.payload,
        };
        case GET_AllCompanyGroups_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        companyGroups: {},
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
