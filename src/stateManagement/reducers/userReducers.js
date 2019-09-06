import { SET_USER_DATA } from "./reducerActions";

export const userReducer = (state, action) => {
  if (action.type === SET_USER_DATA) {
    return action.payload;
  }
  return state || {};
};
