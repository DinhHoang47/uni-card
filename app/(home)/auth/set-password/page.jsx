"use client";
import Image from "next/image";
import unicardLogo from "@public/assets/images/unicard-logo.png";
import { useEffect, useState } from "react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import MySpinner from "@public/assets/icons/MySpinner";
import * as api from "@app/api/index.js";
import { useDispatch } from "react-redux";
import { addMessage } from "@redux/commonMessageSlice.js";

// Moderate: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
const PWD_REGEX = /^.{8,}$/;

export default function page() {
  // Local state
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-4xl mx-5 sm:mx-10 w-full flex h-[580px] h- bg-white border border-slate-200 rounded-lg shadow-lg p-4">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="bg-white w-full py-3 space-y-4">
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
          </div>
          <p>Set new password for your account.</p>
          <PasswordInput token={token} />
        </div>
      </div>
    </div>
  );
}

const PasswordInput = ({ token }) => {
  // Local state
  const dispatch = useDispatch();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [repeatPwd, setRepeatPwd] = useState("");
  const [validRepeatPwd, setValidRepeatPwd] = useState(false);
  const [RepeatPwdFocus, setRepeatPwdFocus] = useState(false);
  //   Handler
  const handleSubmit = async () => {
    // Check if password and repeat password match
    if (pwd !== repeatPwd) {
      setErrMsg("Password not match.");
    }
    // Submit data
    try {
      setLoading(true);
      const result = await api.SetPassword({ token, password: pwd });
      if (result.status === 200) {
        dispatch(
          addMessage({
            text: "Successful. Please login.",
            variation: "success",
          })
        );

        debugger;
        setTimeout(() => {
          router.push("/auth");
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response.");
      } else {
        setErrMsg(error.response.data?.message || "Something went wrong.");
      }
      setLoading(false);
    }
  };
  // Effect
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const matchPwd = pwd === repeatPwd;
    setValidRepeatPwd(matchPwd);
  }, [pwd, repeatPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [pwd, repeatPwd]);
  return (
    <div className="w-80 mx-auto">
      {/* Password */}
      <div className="relative">
        <p
          className={`${
            pwdFocus && !validPwd ? "" : "invisible"
          } mt-2 text-xs text-orange-500 pl-1 h-5`}
        >
          Password should have at least 8 characters long.
        </p>
        <input
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          onFocus={(e) => {
            setPwdFocus(true);
          }}
          onBlur={(e) => {
            setPwdFocus(false);
          }}
          required
          aria-invalid={validPwd ? "false" : "true"}
          id="password"
          type={showPassword ? "text" : "password"}
          className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
          placeholder="Password"
          name="password"
          aria-label="Password"
          autoComplete="one-time-code"
          maxLength={225}
        />
        <div
          onClick={() => {
            setShowPassword((pre) => !pre);
          }}
          className="absolute top-0 right-0 mt-4 p-3"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {/* Repeat Password */}
      <div className="relative">
        <p
          className={`${
            repeatPwd && RepeatPwdFocus && !validRepeatPwd ? "" : "invisible"
          } text-xs text-orange-500 pl-1 h-6 flex items-center`}
        >
          <span>Not match.</span>
        </p>
        <input
          onChange={(e) => {
            setRepeatPwd(e.target.value);
          }}
          onFocus={(e) => {
            setRepeatPwdFocus(true);
          }}
          onBlur={(e) => {
            setRepeatPwdFocus(false);
          }}
          required
          aria-invalid={validRepeatPwd ? "false" : "true"}
          id="repeat-password"
          type="password"
          className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
          placeholder="Repeat Password"
          name="repeat-password"
          aria-label="Repeat Password"
          autoComplete="one-time-code"
          maxLength={225}
        />
      </div>
      {/* Error message */}
      <p className="text-red-500 text-sm mt-2">{errMsg}</p>
      {/* Submit button */}
      <button
        onClick={() => {
          handleSubmit();
        }}
        disabled={loading || !validPwd || !validRepeatPwd}
        className={`bg-blue-600 mt-5 w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white transition ease-in-out duration-150`}
      >
        {loading && (
          <MySpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
        )}
        Set password
      </button>
      <div className="mt-4 flex justify-end">
        <button
          className="text-sm text-right text-blue-500"
          onClick={() => {
            router.push("/auth");
          }}
        >
          ← Back to log in
        </button>
      </div>
    </div>
  );
};
