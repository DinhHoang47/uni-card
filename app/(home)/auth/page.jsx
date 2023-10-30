"use client";

import GoogleSignInButton from "@components/Auth/GoogleSignInButton";
import { useEffect, useState } from "react";
import unicardLogo from "@public/assets/images/unicard-logo.png";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "@public/assets/images/auth-page-animation.json";
import useUser from "@lib/useUser";
import XSpinner from "@components/Spinner/XSpinner";

export default function Auth() {
  const [displayButton, setDisplayButton] = useState(false);
  const { user, userIsLoading } = useUser("/mypage", true);
  useEffect(() => {
    setDisplayButton(true);
  }, []);
  if (userIsLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <XSpinner />
      </div>
    );
  }
  if (user?.isLoggedIn) {
    return <div className="">Logged in. Redirect</div>;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-4xl mx-10 w-full flex h-[540px] bg-white border border-slate-200 rounded-lg shadow-lg p-2">
        <div className="hidden sm:flex items-center justify-center flex-1 ">
          <Player autoplay loop style={{ width: "400px" }} src={animation} />
        </div>
        <div className="w-full flex mt-14 justify-center  sm:w-80">
          <div className="bg-white w-full py-10 space-y-5">
            <div className="flex flex-col items-center justify-center">
              <Image
                style={{ width: "60px" }}
                alt="Unicard logo"
                src={unicardLogo}
              />
              <p className="logo_text font-vina text-2xl text-center">
                UniCard
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-center text-2xl">Welcome</p>
              <p className="text-center">Please login to start</p>
            </div>
            {displayButton && <GoogleSignInButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
