import useUser from "@lib/useUser";
import * as api from "../../app/api/index.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@redux/commonMessageSlice.js";

async function handleCredentialResponse(response, mutateUser, dispatch) {
  try {
    await api.googleSignIn(response);
    mutateUser();
  } catch (error) {
    let errMsg =
      error.response?.data?.message || "Sign-in with Google failed. Try later.";
    dispatch(addMessage({ text: errMsg, variation: "warning" }));
    console.log(error);
  }
}

export default function GoogleOneTap() {
  const { user, mutateUser } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (res) => {
        handleCredentialResponse(res, mutateUser, dispatch);
      },
    });
    if (user && !user.isLoggedIn) {
      google.accounts.id.prompt();
    }
  }, [user]);
  return <></>;
}
