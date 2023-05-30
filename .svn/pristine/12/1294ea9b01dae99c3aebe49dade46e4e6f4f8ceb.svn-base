import {
  GET_Contacts,
  Contacts_ERROR,
  GET_AllContacts,
  Contacts__LOADING,
  GET_AllContacts_ERROR,
  EDIT_ACTIVITY,
  Get_Contact_BelongsTo
} from "../constants/types";

const initState = {
  loading: false,
  errors: null,
  contacts: [],
  contact: [],
  contactError: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_Contacts:
      return {
        ...state,
        contact: action.payload,
        contactError: null,
      };
    case Contacts_ERROR:
      return {
        ...state,
        contact: null,
        contactError: action.payload,
      };
    case Contacts__LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_AllContacts_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        contacts: {},
      };
    case GET_AllContacts:
      return {
        ...state,
        loading: false,
        errors: null,
        contacts: action.payload,
      };
      case Get_Contact_BelongsTo:
      return {
        ...state,
        loading: false,
        errors: null,
        contacts: action.payload,
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
