import { userReducer } from "./userReducers";
import { hardwareReducer } from "./hardwareReducer";

const mainReducer = ({ user, hardware }, action) => ({
  user: userReducer(user, action),
  hardware: hardwareReducer(hardware, action)
});

export default mainReducer;
