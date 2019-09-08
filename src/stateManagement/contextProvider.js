import React, { useReducer, createContext } from "react";
import mainReducer from "./reducers";

export const initialReduxState = {
  user: {},
  hardware: {},
  subscriptions: null
};
export const MainContext = createContext(initialReduxState);

export const ContextProvider = props => {
  const [state, dispatch] = useReducer(mainReducer, initialReduxState);
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MainContext.Provider>
  );
};
