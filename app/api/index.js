import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/" });

export const signUp = (userData) => {
  return API.post(`register`, userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const SignIn = (credential) => {
  return API.post(`login`, credential, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const LogOut = () => {
  return API.post(
    "logout",
    {},
    {
      withCredentials: true,
    }
  );
};

export const getCollection = (id) => {
  return API.get(`collections/${id}`);
};

export const getUser = (url) => {
  return API.get(url);
};
