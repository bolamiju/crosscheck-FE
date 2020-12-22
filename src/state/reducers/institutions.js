import * as types from "../actionTypes/users";
import {GET_PAGE_DETAILS} from "../actionTypes/verifications";
const initialState = {
  institutions: [],
  pageInfo:{}
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
        pageInfo:action.payload
      }
    default:
      return state;
  }
}
