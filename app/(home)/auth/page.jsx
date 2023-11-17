"use client";
import * as api from "@app/api/index.js";
import GoogleSignInButton from "@components/Auth/GoogleSignInButton";
import { useEffect, useState } from "react";
import unicardLogo from "@public/assets/images/unicard-logo.png";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "@public/assets/images/auth-page-animation.json";
import useUser from "@lib/useUser";
import XSpinner from "@components/Spinner/XSpinner";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Spinner from "@public/assets/icons/MySpinner.jsx";
import IconSentMail from "@public/assets/icons/IconSentMail";
import Link from "next/link";

export default function Auth() {
  const [displayButton, setDisplayButton] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showModal, setShowModal] = useState("login");
  const { user, userIsLoading, mutateUser } = useUser("/mypage", true);
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
    return (
      <div className="w-full h-screen my-auto flex items-center justify-center">
        <p className="font-semibold">Logged in. Redirect</p>

        <span className="ml-2">
          <ChevronDoubleRightIcon className="h-5 w-5 font-semibold text-blue-600 animate-[bounceLeft_1s_ease-in-out_infinite]" />
        </span>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-4xl mx-5 sm:mx-10 w-full flex h-[540px] h- bg-white border border-slate-200 rounded-lg shadow-lg p-4">
        <div className="hidden sm:flex items-center justify-center flex-1 ">
          <Player autoplay loop style={{ width: "400px" }} src={animation} />
        </div>
        <div className="w-full flex justify-center  sm:w-80">
          <div className="bg-white w-full space-y-4">
            <div className="flex flex-col items-center justify-center">
              <Link
                className="flex items-center justify-center flex-col"
                href={"/"}
              >
                <Image
                  priority
                  style={{ width: "40px" }}
                  alt="Unicard logo"
                  src={unicardLogo}
                />
                <p className="logo_text font-vina text-2xl text-center">
                  UniCard
                </p>
              </Link>
            </div>
            {showModal === "login" && (
              <>
                <div className="space-y-2">
                  <p className="text-center text-xl">Log in</p>
                  {/* <p className="text-center text-sm">Please login to start</p> */}
                </div>
                {displayButton && <GoogleSignInButton />}
                <div className="flex items-center justify-center">
                  <p className="text-gray-400 font-semibold text-sm">
                    - or email -
                  </p>
                </div>
                <LoginWithEmail
                  setShowModal={setShowModal}
                  mutateUser={mutateUser}
                  setRegisteredEmail={setRegisteredEmail}
                />
              </>
            )}
            {showModal === "signupSuccess" && (
              <SignUpSuccessModal emailAddress={registeredEmail} />
            )}
            {showModal === "resetPassword" && (
              <ResetPasswordForm
                setShowModal={setShowModal}
                setRegisteredEmail={setRegisteredEmail}
              />
            )}
            {showModal === "resetPasswordSuccess" && (
              <ResetPasswordSuccessModal
                emailAddress={registeredEmail}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

const LoginWithEmail = ({ mutateUser, setShowModal, setRegisteredEmail }) => {
  const [mode, setMode] = useState("signIn");
  return (
    <div className="">
      {mode === "signIn" && (
        <SignInForm
          setShowModal={setShowModal}
          mutateUser={mutateUser}
          setMode={setMode}
        />
      )}
      {mode === "signUp" && (
        <SignUpForm
          setShowModal={setShowModal}
          setMode={setMode}
          setRegisteredEmail={setRegisteredEmail}
        />
      )}
    </div>
  );
};

const SignUpForm = ({ setMode, setShowModal, setRegisteredEmail }) => {
  // Local state
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // Check the input email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    setErrMsg("");
  }, [email]);
  return (
    <div className="w-[232px] h-[304px] flex flex-col mx-auto">
      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-400" htmlFor="sign-in-email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={(e) => {
              setEmailFocus(true);
            }}
            onBlur={(e) => {
              setEmailFocus(false);
            }}
            placeholder="example@email.com"
            id="sign-in-email"
            className="border border-gray-300 h-10 rounded bg-gray-50 outline-none px-2 text-sm"
            type="email"
          />
          <p
            className={`${
              emailFocus && email && !validEmail ? "" : "hidden"
            } mt-2 text-xs text-orange-500 pl-1`}
          >
            Not valid email format.
          </p>
        </div>
        <div className="pt-2 flex flex-col items-center space-y-4 text-sm">
          <p className={`text-red-500 text-xs line-clamp-3`}>{errMsg}</p>
          <button
            onClick={() => {
              handleSignUp(
                email,
                setLoading,
                setErrMsg,
                setShowModal,
                setRegisteredEmail
              );
            }}
            disabled={loading || !validEmail ? true : false}
            className={`${
              !validEmail || !email
                ? "bg-blue-300  border border-gray-300"
                : "bg-blue-600  "
            } w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white transition ease-in-out duration-150`}
          >
            {loading && (
              <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            )}
            Sign up with email
          </button>
          <button
            onClick={() => {
              setShowModal("resetPassword");
            }}
            className="text-gray-400 text-sm underline text-right w-full"
          >
            Forgot Password ?
          </button>
        </div>
      </div>

      <div className="text-sm flex flex-col items-center space-y-1 pt-4">
        <p className="font-normal">Already have an account?</p>
        <button
          onClick={() => {
            setMode("signIn");
          }}
          className={`underline text-blue-600`}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

const SignInForm = ({ setMode, mutateUser, setShowModal }) => {
  // Local state
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // Effect
  // Check the input email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  // Clear err msg when input changes
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);
  return (
    <div className="w-[232px] h-[304px] flex flex-col mx-auto space-y-2">
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-400" htmlFor="sign-in-email">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onFocus={(e) => {
            setEmailFocus(true);
          }}
          onBlur={(e) => {
            setEmailFocus(false);
          }}
          placeholder="example@email.com"
          id="sign-in-email"
          className="border border-gray-300 h-10 rounded bg-gray-50 outline-none px-2 text-sm"
          type="email"
          required
        />
        <p
          className={`${
            emailFocus && email && !validEmail ? "" : "hidden"
          } mt-2 text-xs text-orange-500 pl-1`}
        >
          Not valid email format.
        </p>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-400" htmlFor="sign-in-password">
          Password
        </label>
        <input
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          value={pwd}
          id="sign-in-password"
          type="password"
          className="border border-gray-300 h-10 rounded bg-gray-50 outline-none px-2 text-sm"
        />
      </div>
      <div className="flex flex-col items-center space-y-4 text-sm">
        <p className={`text-red-500 text-xs line-clamp-3`}>{errMsg}</p>
        <button
          onClick={() => {
            handleLogIn(email, pwd, setErrMsg, mutateUser, setLoading);
          }}
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
          Log in with Email
        </button>
        <button
          onClick={() => {
            setShowModal("resetPassword");
          }}
          className="text-gray-400 text-sm underline text-right w-full"
        >
          Forgot Password ?
        </button>
      </div>
      <div className="text-sm flex flex-col items-center space-y-1 pt-4">
        <button
          onClick={() => {
            setMode("signUp");
          }}
          className="underline text-blue-600"
        >
          Create new account
        </button>
      </div>
    </div>
  );
};

const SignUpSuccessModal = ({ emailAddress }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 px-4">
      <IconSentMail className="fill-blue-600" />
      <p className="text-center">
        Active link have been sent to your email {emailAddress}.
      </p>
      <p className="text-center">Please check your email.</p>
    </div>
  );
};

const ResetPasswordSuccessModal = ({ emailAddress, setShowModal }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 px-4">
      <IconSentMail className="fill-blue-600" />
      <p className="text-center">
        A password reset link have been sent to your email {emailAddress}.
      </p>
      <p className="text-center">Please check your email.</p>
      <button
        className="text-blue-500 mt-auto"
        onClick={() => {
          setShowModal("login");
        }}
      >
        ← Back to log in
      </button>
    </div>
  );
};

const ResetPasswordForm = ({ setShowModal, setRegisteredEmail }) => {
  // Local state
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // Check the input email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    setErrMsg("");
  }, [email]);
  return (
    <div className="w-[232px] h-[304px] flex flex-col mx-auto">
      <div className="space-y-2">
        <p className="text-center">Reset password</p>
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-400" htmlFor="sign-in-email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={(e) => {
              setEmailFocus(true);
            }}
            onBlur={(e) => {
              setEmailFocus(false);
            }}
            placeholder="example@email.com"
            id="sign-in-email"
            className="border border-gray-300 h-10 rounded bg-gray-50 outline-none px-2 text-sm"
            type="email"
          />
          <p
            className={`${
              emailFocus && email && !validEmail ? "" : "hidden"
            } mt-2 text-xs text-orange-500 pl-1`}
          >
            Not valid email format.
          </p>
        </div>
        <div className="pt-2 flex flex-col items-center space-y-4 text-sm">
          <p className={`text-red-500 text-xs line-clamp-3`}>{errMsg}</p>

          <button
            onClick={() => {
              handleResetPassword(
                email,
                setLoading,
                setErrMsg,
                setShowModal,
                setRegisteredEmail
              );
            }}
            disabled={loading || !validEmail ? true : false}
            className={`${
              !validEmail || !email
                ? "bg-blue-300  border border-gray-300"
                : "bg-blue-600  "
            } w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white transition ease-in-out duration-150`}
          >
            {loading && (
              <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            )}
            Reset password
          </button>
        </div>
      </div>
      <div className="text-sm flex flex-col items-center space-y-1 pt-4">
        <button
          onClick={() => {
            setShowModal("login");
          }}
          className={` text-blue-600`}
        >
          ← Back to log in
        </button>
      </div>
    </div>
  );
};

const handleLogIn = async (
  email,
  password,
  setErrMsg,
  mutateUser,
  setLoading
) => {
  const credential = { email, password };
  try {
    setLoading(true);
    const { data: user } = await api.SignIn(credential);
    mutateUser(user);
    setLoading(false);
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

const handleSignUp = async (
  email,
  setLoading,
  setErrMsg,
  setShowModal,
  setRegisteredEmail
) => {
  setErrMsg("");
  try {
    setLoading(true);
    const result = await api.signUp({ email });
    setRegisteredEmail(email);
    if (result.status === 200) {
      setShowModal("signupSuccess");
    }
    setLoading(false);
  } catch (error) {
    console.log("error: ", error);
    setErrMsg(error.response?.data.message || "Something went wrong!");
    setLoading(false);
  }
};

const handleResetPassword = async (
  email,
  setLoading,
  setErrMsg,
  setShowModal,
  setRegisteredEmail
) => {
  setErrMsg("");
  try {
    setLoading(true);
    const result = await api.ResetPassword({ email });
    setRegisteredEmail(email);
    if (result.status === 200) {
      setShowModal("resetPasswordSuccess");
    }
    setLoading(false);
  } catch (error) {
    console.log("error: ", error);
    setErrMsg(error.response?.data.message || "Something went wrong!");
    setLoading(false);
  }
};
