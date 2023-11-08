import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/`,
});

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

export const googleSignIn = (credential) => {
  return API.post("auth/googleSignIn", credential, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
