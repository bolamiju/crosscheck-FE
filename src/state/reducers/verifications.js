import * as types from "../actionTypes/verifications";

const initialState = {
  verifications: [],
  schCard: false,
  selectedInstitution: {},
  userVerifications: [],
  transcript: [],
  newTranscript: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_VERIFICATIONS:
      return {
        ...state,
        verifications: [...action.payload],
      };
    case types.SELECT_SCHOOL:
      return {
        ...state,
        selectedInstitution: action.payload,
      };
    case types.USER_VERIFICATIONS:
      return {
        ...state,
        userVerifications: action.payload,
      };
    case types.ADD_TRANSCRIPT:
      return {
        ...state,
        transcript: [...action.payload],
      };

    case types.DELETE_VERIFICATION:
      let newArr = [];
      state.verifications.filter((verification) => {
        for (var pair of verification.entries()) {
          if (pair[0] === "id" && pair[1] !== action.payload) {
            newArr.push(verification);
          }
        }
      });
      return {
        verifications: newArr,
      };
    case types.GET_TRANSCRIPT: 
      return {
        ...state,
        newTranscript: [...action.payload],
      }
    default:
      return state;
  }
}
