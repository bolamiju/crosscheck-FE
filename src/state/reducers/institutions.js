import * as types from "../actionTypes/users";
import {
  GET_PAGE_DETAILS,
  LOADING,
  NO_INSTITUTES,
} from "../actionTypes/verifications";
const initialState = {
  institutions: [],
  pageInfo: {},
  noInstitutes: false,
  loading: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
      };
    case GET_PAGE_DETAILS:
      return {
        ...state,
        pageInfo: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case NO_INSTITUTES:
      return {
        ...state,
        noInstitutes: action.payload,
      };
    default:
      return state;
  }
}
