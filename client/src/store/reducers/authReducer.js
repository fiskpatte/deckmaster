import {
  AUTH_SET_IS_AUTHENTICATED,
  AUTH_SET_JWT_EXPIRATION_DATE
} from "./../../shared/constants";

const initialState = {
  isAuthenticated: false,
  jwtExpirationDate: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case AUTH_SET_JWT_EXPIRATION_DATE:
      return {
        ...state,
        jwtExpirationDate: action.payload,
        isAuthenticated: action.payload ? action.payload > new Date() : false
      };

    default:
      return state;
  }
};
