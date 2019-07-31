export const baseUrl = process.env.REACT_APP_BASE_URL;

export const authUrl = (type = "") => baseUrl + `auth/${type}`;
export const passwordUrl = (type = "") => baseUrl + `password/${type}`;
export const hardwareUrl = (type = "") => baseUrl + `hardware${type}`;
export const baseURL = (type = "") => baseUrl + type;
export const getPlanUrl = baseUrl + `plans`;
