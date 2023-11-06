"use client";
import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import * as api from "../../app/api/index.js";
import Spinner from "@public/assets/icons/MySpinner.jsx";
//Username alphanumeric string that may include _ and – having a length of 3 to 16 characters.
const USER_REGEX = /^[a-z0-9_-]{3,16}$/;
// Moderate: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
const PWD_REGEX =
  /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
// Normal email regex
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

export default function SignUpForm({ mode, setAuthMode }) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [repeatPwd, setRepeatPwd] = useState("");
  const [validRepeatPwd, setValidRepeatPwd] = useState(false);
  const [RepeatPwdFocus, setRepeatPwdFocus] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const matchPwd = pwd === repeatPwd;
    setValidRepeatPwd(matchPwd);
  }, [pwd, repeatPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, repeatPwd, email]);

  const handleSignup = async (e) => {
    e.preventDefault();
    // Prevent if someone trick to enable submit button
    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      setLoading(true);
      const userData = { username, email, password: pwd };
      const response = await api.signUp(userData);
      setLoading(false);
      setSuccessMsg("Successful! Sign in to continue.");
      setTimeout(() => {
        setSuccessMsg("");
        setAuthMode(mode.signIn);
      }, 1000);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response.");
      } else if (error.response?.status === 409) {
        setErrMsg(error.response?.data.message);
      } else {
        setErrMsg("Registration Failed");
      }
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="mb-2">
        <p className="mt-2 text-sm text-orange-500 pl-1">{errMsg}</p>
        <p className="mt-2 text-sm text-green-500 pl-1">{successMsg}</p>
      </div>
      <form onSubmit={handleSignup} className="space-y-3" action="">
        {/* Username */}
        <div className="relative">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onFocus={(e) => {
              setUsernameFocus(true);
            }}
            onBlur={(e) => {
              setUsernameFocus(false);
            }}
            autoComplete="one-time-code"
            required
            aria-invalid={validUsername ? "false" : "true"}
            id="username"
            type="text"
            className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
            placeholder="Username"
            name="username"
            aria-label="Username"
          />
          <div
            className={`absolute right-0 top-0 translate-y-[10px] -translate-x-2`}
          >
            <ExclamationCircleIcon
              className={`${
                username && !validUsername ? "" : "hidden"
              } h-5 w-5 text-orange-500`}
            />
          </div>

          <ul
            className={`${
              usernameFocus && username && !validUsername ? "" : "hidden"
            } mt-2 ml-3 text-xs text-orange-500 pl-1 list-disc`}
          >
            {usernameErrMsg ? (
              <li>{usernameErrMsg}</li>
            ) : (
              <>
                <li>Username must be between 3 and 16 characters.</li>
                <li>Allows for underscores (_) and hyphens (-).</li>
              </>
            )}
          </ul>
        </div>
        {/* Email */}
        <div className="relative">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={(e) => {
              setEmailFocus(true);
            }}
            onBlur={(e) => {
              setEmailFocus(false);
            }}
            required
            aria-invalid={validEmail ? "false" : "true"}
            id="email"
            type="text"
            className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
            placeholder="Email"
            name="email"
            aria-label="Email"
            autoComplete="false"
          />
          <div
            className={`absolute right-0 top-0 translate-y-[10px] -translate-x-2`}
          >
            <ExclamationCircleIcon
              className={`${
                email && !validEmail ? "" : "hidden"
              } h-5 w-5 text-orange-500`}
            />
          </div>
          <p
            className={`${
              emailFocus && email && !validEmail ? "" : "hidden"
            } mt-2 text-xs text-orange-500 pl-1`}
          >
            Not valid email format.
          </p>
        </div>
        {/* Password */}
        <div className="relative">
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
            type="password"
            className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
            placeholder="Password"
            name="password"
            aria-label="Password"
            autoComplete="one-time-code"
          />
          <div
            className={`absolute right-0 top-0 translate-y-[10px] -translate-x-2`}
          >
            <ExclamationCircleIcon
              className={`${
                pwd && !validPwd ? "" : "hidden"
              } h-5 w-5 text-orange-500`}
            />
          </div>
          <p
            className={`${
              pwdFocus && !validPwd ? "" : "hidden"
            } mt-2 text-xs text-orange-500 pl-1`}
          >
            Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be
            at least 8 characters long
          </p>
        </div>

        {/* Repeat Password */}
        <div className="relative">
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
          />
          <div
            className={`absolute right-0 top-0 translate-y-[10px] -translate-x-2`}
          >
            <ExclamationCircleIcon
              className={`${
                repeatPwd && !validRepeatPwd ? "" : "hidden"
              } h-5 w-5 text-orange-500`}
            />
          </div>
          <p
            className={`${
              repeatPwd && RepeatPwdFocus && !validRepeatPwd ? "" : "hidden"
            } mt-2 text-xs text-orange-500 pl-1`}
          >
            Not match.
          </p>
        </div>
        {/* Button */}

        <button
          disabled={
            loading || !validEmail || !validPwd || !validRepeatPwd
              ? true
              : false
          }
          className={`${
            !validEmail || !validPwd || !validRepeatPwd
              ? "bg-blue-200  border border-gray-300"
              : "bg-blue-600"
          }  w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white transition ease-in-out duration-150`}
        >
          {loading && (
            <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          )}
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
  );
}
