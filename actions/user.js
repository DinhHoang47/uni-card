import * as api from "../app/api";
import { setUserInfo } from "@redux/authSlice";

export const logIn =
  (credential, setLoading, setErrMsg) => async (dispatch) => {
    try {
      setLoading(true);
      const response = await api.SignIn(credential);
      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      dispatch(setUserInfo({ accessToken, roles }));
      setLoading(false);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 404 ||
        error.response?.status === 401
      ) {
        setErrMsg(error.response?.data.message);
      } else {
        setErrMsg("Sign in failed");
      }
      setLoading(false);
    }
  };
