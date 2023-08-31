import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/" });

export const signUp = (userData) => {
  return API.post(`users/signup`, userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const SignIn = (credential) => {
  return API.post(`users/signin`, credential, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const getCollection = (id) => {
  return API.get(`collections/${id}`);
};
