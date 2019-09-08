import { userReducer, subscriptionReducer } from "./userReducers";
import { hardwareReducer } from "./hardwareReducer";

const mainReducer = ({ user, hardware, subscriptions }, action) => ({
  user: userReducer(user, action),
  hardware: hardwareReducer(hardware, action),
  subscriptions: subscriptionReducer(subscriptions, action)
});

export default mainReducer;
