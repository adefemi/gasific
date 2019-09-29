import {
  SET_SUBSCRIPTION_DATA,
  SET_USER_DATA,
  SET_ACTIVE_USER
} from "./reducerActions";

export const userReducer = (state, action) => {
  if (action.type === SET_USER_DATA) {
    return action.payload;
  }
  return state;
};

export const subscriptionReducer = (state, action) => {
  if (action.type === SET_SUBSCRIPTION_DATA) {
    return action.payload;
  }
  return state;
};

export const activeUserReducer = (state, action) => {
  if (action.type === SET_ACTIVE_USER) {
    return action.payload;
  }
  return state;
};
