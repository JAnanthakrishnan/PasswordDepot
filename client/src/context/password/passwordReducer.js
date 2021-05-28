import {
  ADD_PASSWORD,
  DELETE_PASSWORD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PASSWORD,
  FILTER_PASSWORDS,
  CLEAR_FILTER,
  PASSWORD_ERROR,
  GET_PASSWORDS,
  CLEAR_PASSWORDS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_PASSWORD:
      return {
        ...state,
        passwords: [action.payload, ...state.passwords],
        loading: false,
      };
    case GET_PASSWORDS:
      return {
        ...state,
        passwords: action.payload,
        loading: false,
      };
    case PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PASSWORD:
      return {
        ...state,
        passwords: state.passwords.filter(
          (password) => password._id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        passwords: state.passwords.map((password) =>
          password._id === action.payload._id ? action.payload : password
        ),
        loading: false,
      };
    case CLEAR_PASSWORDS:
      return {
        ...state,
        passwords: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_PASSWORDS:
      return {
        ...state,
        filtered: state.passwords.filter((password) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            password.siteUrl.match(regex) ||
            password.username.match(regex) ||
            password.team.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
