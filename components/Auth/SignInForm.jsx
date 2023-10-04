"use client";
import { useEffect, useState } from "react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Spinner from "@public/assets/icons/spinner";
import * as api from "../../app/api/index.js";
import useUser from "@lib/useUser.js";
import { close } from "../../redux/authModalSlice";
import { useDispatch } from "react-redux";

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

export default function SignInForm({ mode, setAuthMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // State for input element

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // Use User

  const { mutateUser } = useUser();
  const dispatch = useDispatch();

  // Check email validation

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // Clear err msg when user change input value

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  // Handle sign in

  const handleSignIn = async (e) => {
    e.preventDefault();
    const credential = { email, password: pwd };
    // --- Start new code for useUSer
    try {
      setLoading(true);
      const { data: user } = await api.SignIn(credential);
      mutateUser(user);
      setLoading(false);
      dispatch(close());
    } catch (error) {
      setLoading(false);
      if (!error.response) {
        setErrMsg("No server response.");
      } else {
        setErrMsg(error?.response.data.message || "Something went wrong!");
      }
    }
    // --- End
  };

  return (
    <div className="">
      <div className="mb-2">
        <p className="mt-2 text-sm text-orange-500 pl-1">{errMsg}</p>
      </div>
      <form onSubmit={handleSignIn} className="space-y-4" action="">
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
            type="email"
            className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
            placeholder="Email"
            name="email"
            aria-label="Email Address"
            required
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

        <div className="w-full h-10 border border-gray-300 rounded relative">
          <input
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            className="w-full h-10 px-2 border border-gray-300 rounded focus:outline-blue-400"
            placeholder="Password"
            name="password"
            aria-label="Password"
            required
            autoComplete="on"
          />
          <div
            onClick={() => {
              setShowPassword((pre) => !pre);
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        {/* Button */}
        <button
          disabled={loading || !validEmail ? true : false}
          className={`${
            !validEmail || !email || !pwd
              ? "bg-blue-300  border border-gray-300"
              : "bg-blue-600  "
          } w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white transition ease-in-out duration-150`}
        >
          {loading && (
            <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          )}
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
  );
}
