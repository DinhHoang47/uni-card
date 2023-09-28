"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";
import ResultList from "./ResultList";

export default function SettingModal({ isOpen, setIsOpen, slug }) {
  // Handle dynamic size for modal start
  const childrenRef = useRef(null);
  const [childHeight, setChildHeight] = useState();
  const [childWidth, setChildWidth] = useState();

  useEffect(() => {
    setChildHeight(childrenRef.current.offsetHeight);
    setChildWidth(childrenRef.current.offsetWidth);
  }, [childHeight, childWidth]);
  // Handle dynamic size for modal end
  // Setting
  const speedLevel = {
    slow: 15,
    moderate: 10,
    fast: 5,
  };

  const router = useRouter();
  const [mode, setMode] = useState("choice");
  const [show, setShow] = useState("back");
  const [speed, setSpeed] = useState(speedLevel.moderate);

  // Disable scrollbar after render modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <PortalModalWrapper
      childrenHeight={childHeight}
      childrenWidth={childWidth}
      mountTarget="testing-header"
    >
      {/* Main container */}
      <div
        ref={childrenRef}
        className="p-4 rounded relative cursor-pointer bg-white space-y-6"
      >
        <div className="">
          <p className="text-center font-semibold text-lg">Congratulation !</p>
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
    </PortalModalWrapper>
  );
}
