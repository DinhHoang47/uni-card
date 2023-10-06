"use client";
import { useEffect, useState } from "react";
import * as api from "../../app/api/index.js";
import { mutate, useSWRConfig } from "swr";
import { useDispatch } from "react-redux";
import { close as closeAuthModal } from "../../redux/authModalSlice.js";

async function handleCredentialResponse(
  response,
  mutate,
  dispatch,
  setErrorMsg
) {
  try {
    await api.googleSignIn(response);
    mutate("user");
    dispatch(closeAuthModal());
  } catch (error) {
    console.log(error);
    setErrorMsg(
      error.response?.data?.message || "Error when sign in with Google !"
    );
    console.log(error);
  }
}

export default function GoogleSignInButton() {
  const [errorMsg, setErrorMsg] = useState("");
  //Render singIn Button
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (res) => {
        handleCredentialResponse(res, mutate, dispatch, setErrorMsg);
      },
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn"),
      { theme: "outline", size: "large" } // customization attributes
    );
  }, []);
  return (
    <div className="space-y-2">
      {errorMsg !== "" && (
        <div className="">
          <p className="text-sm pl-1 text-orange-500">{errorMsg}</p>
        </div>
      )}

      <div
        className=" flex items-center justify-center"
        id="googleSignInBtn"
      ></div>
    </div>
  );
}
