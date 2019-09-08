import React, { useEffect, useState } from "react";
import AppIcon from "../../../components/common/icons/Icon";
import {
  Button,
  FormGroup,
  Modal,
  Notification,
  Spinner,
  TextAreaField
} from "../../../components/common";
import { NavLink } from "react-router-dom";
import { axiosFunc, errorHandler } from "../../../components/utils/helper";
import { merchantUrl } from "../../../components/utils/api";
import { Rate } from "antd";

function UserMerchant(props) {
  const [merchants, setMerchant] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewData, setReviewData] = useState({});

  const onSubmitReview = e => {
    e.preventDefault();
    setLoading(true);
    axiosFunc(
      "post",
      merchantUrl("/report"),
      {
        ...reviewData,
        merchant_id: merchants.id
      },
      "yes",
      (status, data) => {
        setLoading(false);
        if (status) {
          Notification.bubble({
            type: "success",
            content: "Review submitted successfully"
          });
          setShowModal(false);
          setReviewData({});
        }
      }
    );
  };

  useEffect(() => {
    axiosFunc("get", merchantUrl(), null, "yes", (status, data) => {
      if (status) {
        let merchantData = data.data.data.merchant;
        let meta = {};
        for (let i = 0; i < merchantData.meta.length; i++) {
          meta[merchantData.meta[i].meta_key] = merchantData.meta[i].meta_value;
        }
        merchantData.meta = meta;
        setMerchant(merchantData);
        setFetching(false);
      } else {
        Notification.bubble({
          type: "error",
          content: errorHandler(data)
        });
      }
    });
  }, []);
  return (
    <div>
      <div className="heading-2">Active Merchant</div>
      <Modal
        onClose={() => setShowModal(false)}
        title="Merchant Review"
        visible={showModal}
      >
        <form onSubmit={onSubmitReview}>
          <FormGroup title="Comment">
            <TextAreaField
              onChange={e =>
                setReviewData({
                  ...reviewData,
                  message: e.target.value
                })
              }
              value={reviewData.message || ""}
              name="message"
              placeholder="write comment"
              required
            />
          </FormGroup>
          <center>
            <div>
              <small>Rate Merchant</small>
            </div>
            <Rate
              onChange={e =>
                setReviewData({
                  ...reviewData,
                  rating: e
                })
              }
            />
          </center>
          <br />
          <Button type="submit" disabled={loading} loading={loading}>
            Submit review
          </Button>
        </form>
      </Modal>
      <br />
      <div className="divider" />
      <br />
      {fetching ? (
        <Spinner color="#999" />
      ) : (
        <>
          <div className="padding-bottom-10 link-btn">
            <AppIcon name="archive" type="feather" /> &nbsp;&nbsp;{" "}
            <span style={{ textTransform: "capitalize" }}>
              {merchants.meta.businessName || "N/A"}
            </span>
          </div>
          <div className="padding-bottom-5">
            <AppIcon name="user" type="feather" /> &nbsp;&nbsp;{" "}
            <span className="link-btn">{merchants.name}</span>{" "}
          </div>
          <div className="padding-bottom-5">
            <AppIcon name="phoneCall" type="feather" /> &nbsp;&nbsp;{" "}
            <span className="link-btn">{merchants.phone}</span>{" "}
          </div>
          <div>
            <AppIcon name="mapPin" type="feather" /> &nbsp;&nbsp;{" "}
            <span className="link-btn">{merchants.meta.address}</span>{" "}
          </div>
        </>
      )}

      <br />
      <br />
      <div className="dflex align-center justify-between">
        <Button
          color="success"
          variant="outlined"
          onClick={() => setShowModal(true)}
        >
          Review Merchant
        </Button>
        <NavLink to="/select-merchant">
          <Button>Change Merchant</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default UserMerchant;
