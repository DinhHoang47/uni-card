import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/" });

export const signUp = (userData) => {
  return API.post(`register`, userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const SignIn = (credential) => {
  return API.post(`auth`, credential, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const getCollection = (id) => {
  return API.get(`collections/${id}`);
};
