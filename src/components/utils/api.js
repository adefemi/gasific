export const baseUrl = process.env.REACT_APP_BASE_URL;

export const authUrl = (type = "") => baseUrl + `auth/${type}`;
export const getPlanUrl = baseUrl + `plans`;
export const assingHardwareURl = baseUrl + `hardware/assign`;
export const passwordUrl = (type = "") => baseUrl + `password/${type}`;
export const hardwareUrl = (type = "") => baseUrl + `hardware${type}`;
export const transactionUrl = (type = "") => baseUrl + `transactions${type}`;
export const UserUrl = (type = "") => baseUrl + `user${type}`;
export const baseURL = (type = "") => baseUrl + type;
export const PaymentUrl = (type = "") => baseUrl + `pay/${type}`;
export const merchantUrl = (type = "") => baseUrl + `merchant${type}`;
export const subscriptionUrl = (type = "") => baseUrl + `subscription${type}`;
