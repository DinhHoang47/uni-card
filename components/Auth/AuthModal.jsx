"use client";

import PortalModalWrapper from "@components/PortalModalWrapper";
import { useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { useDispatch } from "react-redux";

import { close } from "../../redux/authModalSlice";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import GoogleSignInButton from "./GoogleSignInButton";
import Link from "next/link";

export default function AuthModal({ hanger }) {
  const dispatch = useDispatch();
  const mode = {
    signIn: 0,
    signUp: 1,
  };
  const [authMode, setAuthMode] = useState(mode.signIn);

  return (
    <PortalModalWrapper mountTarget={hanger}>
      <div className=" relative px-8 md:px-14 py-8  bg-white  rounded-lg border border-gray-300 min-w-max">
        <div className="w-60 flex flex-col space-y-4 mx-auto">
          <div className="flex items-center justify-center">
            <p className="logo_text font-vina text-xl text-center">UniCard</p>
          </div>
          <div className="flex justify-center items-center space-x-4 font-semibold h-10">
            Sign In
          </div>
          {/* Google Auth */}
          <GoogleSignInButton />
          <NavigateToAuthButton />
        </div>
        {/* Close btn */}
        <button
          onClick={(e) => {
            dispatch(close());
          }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}

const SwithBetweenSignInSignUp = () => {
  return (
    <div className="">
      <button
        onClick={() => {
          setAuthMode(mode.signIn);
        }}
        className={`${
          authMode === mode.signIn
            ? `before:contents-[""] before:w-full text-gray-700`
            : ""
        } h-full relative  before:h-0.5 before:bg-blue before:absolute before:top-full before:-translate-y-full before:bg-blue-300 hover:text-gray-700 transition-all`}
      >
        Sign In
      </button>
      <button
        onClick={() => {
          setAuthMode(mode.signUp);
        }}
        className={`${
          authMode === mode.signUp
            ? `before:contents-[""] before:w-full text-gray-700`
            : ""
        } h-full relative before:h-0.5 before:bg-blue before:absolute before:top-full before:-translate-y-full before:bg-blue-300 hover:text-gray-700 transition-all duration-200`}
      >
        Sign Up
      </button>
    </div>
  );
};

const NavigateToAuthButton = () => {
  return (
    <Link
      href={"/auth"}
      className="border border-gray-200 h-10 flex items-center justify-center rounded text-sm"
    >
      Sign in with email 🗝️
    </Link>
  );
};

const SignInWithEmailSection = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <p className="text-gray-400 font-semibold">- or email -</p>
      </div>
      {authMode === mode.signIn ? (
        // Sign In Form
        <SignInForm mode={mode} setAuthMode={setAuthMode} />
      ) : (
        // Sign Up Form
        <SignUpForm mode={mode} setAuthMode={setAuthMode} />
      )}
    </div>
  );
};
