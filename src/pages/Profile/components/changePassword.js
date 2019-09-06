import { FormGroup } from "../../../components/common/formGroup";
import { Button, Input, Notification } from "../../../components/common";
import React, { useContext, useState } from "react";
import { axiosFunc, errorHandler } from "../../../components/utils/helper";
import { MainContext } from "../../../stateManagement/contextProvider";
import { passwordUrl } from "../../../components/utils/api";

const ChangePassword = props => {
  const [passwordData, setPasswordData] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    state: { user }
  } = useContext(MainContext);

  const onChange = e => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    if (passwordData.new_password !== passwordData.cpassword) {
      Notification.bubble({
        type: "error",
        content: "Passwords do not match!"
      });
      setLoading(false);
      return;
    }

    const data = {
      email: user.email,
      password: passwordData.password,
      new_password: passwordData.new_password
    };

    axiosFunc("post", passwordUrl("change"), data, "yes", (status, data) => {
      setLoading(false);
      if (status) {
        Notification.bubble({
          type: "success",
          content: "Password changed successfully..."
        });
      } else {
        Notification.bubble({
          type: "error",
          content: errorHandler(data)
        });
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="max-width-600">
        <FormGroup title="Old Password">
          <Input
            type="password"
            value={passwordData.password || ""}
            name="password"
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup title="New Password">
          <Input
            type="password"
            name="new_password"
            value={passwordData.new_password || ""}
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input
            type="password"
            value={passwordData.cpassword || ""}
            name="cpassword"
            onChange={onChange}
            required
          />
        </FormGroup>

        <br />
        <Button type="submit" loading={loading} disabled={loading}>
          Update
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
