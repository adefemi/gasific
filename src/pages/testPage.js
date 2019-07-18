import React, { useContext } from "react";
import { MainContext } from "../stateManagement/contextProvider";
import { SET_USER_DATA } from "../stateManagement/reducers/reducerActions";

const Test = props => {
  const {
    state: { user },
    dispatch
  } = useContext(MainContext);

  const onClickControl = () => {
    dispatch({
      type: SET_USER_DATA,
      payload: user ? (user.userData += 1) : 1
    });
  };

  return (
    <div>
      count: {user ? user.userData : 0}
      <br />
      <br />
      <button onClick={onClickControl}>Add number</button>
    </div>
  );
};

export default Test;
