"use client";

import Image from "next/image";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Auth() {
  const mode = {
    signIn: 0,
    signUp: 1,
  };
  const [authMode, setAuthMode] = useState(mode.signIn);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-8 md:px-14 py-8  bg-white  rounded-lg border border-gray-300">
      <div className="w-60 flex flex-col space-y-4">
        <div className="flex items-center justify-center">
          <p className="logo_text font-vina text-xl text-center">UniCard</p>
        </div>
        <div className="flex justify-center items-center space-x-4 font-semibold h-10 text-gray-400">
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
        {/* Google Auth */}
        <div className="">
          <button className="h-10 w-full px-4 flex items-center justify-around space-x-2 border border-gray-300 rounded ">
            <span>Continue with Google</span>
            <Image
              width={32}
              height={32}
              alt="google-icon"
              src={"/assets/icons/google.svg"}
            />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-gray-400 font-semibold">- or email -</p>
        </div>
        {authMode === mode.signIn ? (
          // Sign In Form
          <div className="">
            <form className="space-y-4" action="">
              <input
                type="email"
                className="w-full h-10 px-2 border border-gray-300 rounded"
                placeholder="Email"
                name="email"
                aria-label="Email Address"
              />
              <div className="w-full h-10 border border-gray-300 rounded relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full px-2"
                  placeholder="Password"
                  name="password"
                  aria-label="Password"
                />
                <div
                  onClick={() => {
                    setShowPassword((pre) => !pre);
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </div>
              <button className="w-full h-10 px-2 bg-blue-600 rounded text-white">
                Sign In
              </button>
              <div className="flex justify-end">
                <span className="text-gray-400 text-sm">
                  Not have an account ?{" "}
                  <button
                    onClick={() => {
                      setAuthMode(mode.signUp);
                    }}
                    className="text-blue-700"
                  >
                    Sign Up
                  </button>
                </span>
              </div>
            </form>
          </div>
        ) : (
          // Sign Up Form
          <div className="">
            <form className="space-y-3" action="">
              <input
                type="text"
                className="w-full h-10 px-2 border border-gray-300 rounded"
                placeholder="User Name"
                name="username"
                aria-label="User Name"
              />
              <input
                type="email"
                className="w-full h-10 px-2 border border-gray-300 rounded"
                placeholder="Email"
                name="email"
                aria-label="Email Address"
              />
              <input
                type={"password"}
                className="w-full h-10 px-2 border border-gray-300 rounded"
                placeholder="Password"
                name="password"
                aria-label="Password"
              />
              <input
                type={"password"}
                className="w-full h-10 px-2 border border-gray-300 rounded"
                placeholder="Repeat Password"
                name="repeat-password"
                aria-label="Repeat Password"
              />
              <button className="w-full h-10 px-2 bg-blue-600 rounded text-white">
                Sign Up
              </button>
              <div className="flex justify-end">
                <span className="text-gray-400 text-sm">
                  Already have an account ?{" "}
                  <button
                    onClick={() => {
                      setAuthMode(mode.signIn);
                    }}
                    className="text-blue-700"
                  >
                    Sign In
                  </button>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
