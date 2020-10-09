import * as types from "../actionTypes/users";

const initialState = {
  loading: false,
  registerError: "",
  loginError: "",
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.SET_ERROR:
      return {
        ...state,
        registerError: action.payload,
      };

    case types.LOGIN_ERROR:
      return {
        ...state,
        registerError: "",
        loginError: action.payload,
      };
    case types.SET_USER:
      return {
        user: action.payload,
        registerError: "",
        loginError: "",
      };

    default:
      return state;
  }
}
