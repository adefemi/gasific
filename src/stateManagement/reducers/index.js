import {
  userReducer,
  subscriptionReducer,
  activeUserReducer
} from "./userReducers";
import { hardwareReducer } from "./hardwareReducer";

const mainReducer = (
  { user, hardware, subscriptions, activeUser },
  action
) => ({
  user: userReducer(user, action),
  hardware: hardwareReducer(hardware, action),
  subscriptions: subscriptionReducer(subscriptions, action),
  activeUser: activeUserReducer(activeUser, action)
});

export default mainReducer;
