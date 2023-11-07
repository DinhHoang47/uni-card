import axios from "axios";

const API = axios.create({ baseURL: "https://api-unicard.onrender.com/" });

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
  return API.get(url, {
    headers: {},
    withCredentials: true,
  });
};

export const googleSignIn = (credential) => {
  return API.post("auth/googleSignIn", credential, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
