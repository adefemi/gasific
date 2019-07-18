import { userReducer } from "./userReducers";

const mainReducer = ({ user }, action) => ({
  user: userReducer(user, action)
});

export default mainReducer;
