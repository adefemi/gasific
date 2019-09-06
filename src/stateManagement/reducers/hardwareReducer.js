import { SET_HARDWARE_DATA } from "./reducerActions";

export const hardwareReducer = (state, action) => {
  if (action.type === SET_HARDWARE_DATA) {
    return action.payload;
  }
  return state;
};
