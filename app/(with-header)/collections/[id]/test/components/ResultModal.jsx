"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ResultList from "./ResultList";
import styles from "./styles.module.css";

export default function ResultModal({ isOpen, setIsOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
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
        <div className="p-4 rounded relative cursor-pointer bg-white space-y-6">
          <div className="">
            <p className="text-center font-semibold text-lg">
              Congratulation !
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              width={60}
              height={60}
              alt="result-image"
              src={"/assets/images/congratulations.png"}
            />
          </div>
          <div className="">
            <p className="text-center font-semibold text-2xl">8/10</p>
          </div>
          <div className={`max-h-48 overflow-y-auto ${styles.resultList}`}>
            <ResultList />
          </div>
          <div className="  grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-blue-500 h-10 text-white px-4 rounded-md"
            >
              Retest
            </button>
            <button className="bg-teal-400 h-10 text-white px-4 rounded-md">
              Next Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
