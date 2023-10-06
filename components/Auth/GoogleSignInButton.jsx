"use client";
import { useEffect } from "react";
import * as api from "../../app/api/index.js";
import { mutate, useSWRConfig } from "swr";
import { useDispatch } from "react-redux";
import { close as closeAuthModal } from "../../redux/authModalSlice.js";

async function handleCredentialResponse(response, mutate, dispatch) {
  const result = await api.googleSignIn(response);
  mutate("user");
  dispatch(closeAuthModal());
  console.log(result);
}

export default function GoogleSignInButton() {
  //Render singIn Button
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (res) => {
        handleCredentialResponse(res, mutate, dispatch);
      },
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn"),
      { theme: "outline", size: "large" } // customization attributes
    );
  }, []);
  return (
    <div
      className=" flex items-center justify-center"
      id="googleSignInBtn"
    ></div>
  );
}
