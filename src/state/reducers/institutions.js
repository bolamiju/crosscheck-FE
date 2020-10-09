import * as types from "../actionTypes/users";

const initialState = {
  institutions: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
      };

    default:
      return state;
  }
}
