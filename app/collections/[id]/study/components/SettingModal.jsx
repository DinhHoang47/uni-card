"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function SettingModal({ isOpen, setIsOpen }) {
  const router = useRouter();

  // Disable scrollbar after render modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleTest = () => {
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? `` : "invisible"}>
      <div
        className={`${
          isOpen ? "opacity-50" : "opacity-0"
        } absolute top-0 left-0 w-screen bg-slate-500 h-screen flex items-center justify-center transition-opacity duration-200 ease-in `}
      ></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in`}
      >
        {/* Main container */}
        <div className="p-6 rounded relative cursor-pointer bg-white space-y-4">
          <div className="">
            <p className="font-semibold text-lg text-center">
              Select Test Mode
            </p>
          </div>
          {/* Option 1 */}
          <div className="">
            <div className="">
              <p>Testing front or back</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Front Option */}
              <label
                htmlFor="showModeRadio-One"
                className={`${styles.container} flex flex-col items-center justify-center space-y-2`}
              >
                <input
                  defaultChecked
                  className="h-0 w-0 opacity-0"
                  id="showModeRadio-One"
                  type="radio"
                  name="showMode"
                />
                <div className="w-32 h-16 border border-black justify-center items-center flex rounded">
                  漢字
                </div>
                <div
                  className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
                ></div>
              </label>
              {/* Back Option */}
              <label
                htmlFor="showModeRadio-Two"
                className={`${styles.container} flex flex-col items-center justify-center space-y-2`}
              >
                <input
                  className="h-0 w-0 opacity-0"
                  id="showModeRadio-Two"
                  type="radio"
                  name="showMode"
                />
                <div className="w-32 h-16 border border-black justify-around items-center flex flex-col rounded text-xs">
                  <span>KANJI</span>
                  <span>Meaning</span>
                </div>
                <div
                  className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
                ></div>
              </label>
            </div>
          </div>
          {/* Option 2 */}
          <div className="">
            <div className="">
              <p>Mode</p>
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="inputModeRadio-One"
                className={`${styles.container} flex flex-col items-center justify-center space-y-2`}
              >
                <input
                  defaultChecked
                  className="h-0 w-0 opacity-0"
                  id="inputModeRadio-One"
                  type="radio"
                  name="inputMode"
                />
                <div className="w-32 h-16  justify-center items-center flex flex-col">
                  <Image
                    alt="text-box-image"
                    width={36}
                    height={36}
                    src={"/assets/images/text-box.png"}
                  />
                  <p className="text-xs">Writing</p>
                </div>
                <div
                  className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
                ></div>
              </label>
              <label
                htmlFor="inputModeRadio-Two"
                className={`${styles.container} flex flex-col items-center justify-center space-y-2`}
              >
                <input
                  className="h-0 w-0 opacity-0"
                  id="inputModeRadio-Two"
                  type="radio"
                  name="inputMode"
                />
                <div className="w-32 h-16  justify-center items-center flex flex-col">
                  <Image
                    alt="writing-image"
                    width={36}
                    height={36}
                    src={"/assets/images/test.png"}
                  />
                  <p className="text-xs">Multiple Choices</p>
                </div>
                <div
                  className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
                ></div>
              </label>
            </div>
          </div>
          <div className="">
            <button className="h-10 bg-blue-500 w-full text-white font-semibold rounded-md">
              Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
