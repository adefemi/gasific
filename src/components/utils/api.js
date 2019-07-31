export const baseUrl = process.env.REACT_APP_BASE_URL;

export const authUrl = (type = "") => baseUrl + `auth/${type}`;
export const getPlanUrl = baseUrl + `plans`;