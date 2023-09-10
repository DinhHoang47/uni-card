"use client";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import DesktopTestingGround from "./desktop/DesktopTestingGround";
import { useRouter, useSearchParams } from "next/navigation";
import TestingGround_Choice from "./mobile/TestingGround_Choice";
import TestingGround_Writing from "./mobile/TestingGround_Writing";
import { createPortal } from "react-dom";
import ResultModal from "./components/ResultModal";

export default function CollectionTest({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const testingMode = searchParams.get("mode");
  const showMode = searchParams.get("show");

  return (
    <div className="w-full mt-2 sm:mt-4 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Section */}
      <div className="w-full space-y-2 sm:space-y-4">
        {/* Title */}
        <div className="">
          <button
            onClick={() => {
              router.push(`/collections/${params.id}/learn`);
            }}
            className="flex items-center"
          >
            <ChevronLeftIcon className="h-4 w-4 text-sm" />
            <span className="">Back to learn</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl">Collection title</h3>
          <p className="text-lg">
            Section:<span className="ml-2 font-semibold">100~110</span>
          </p>
        </div>
      </div>
      {/* Section */}
      <div className={`w-full space-y-4`}>
        {/* Setting & button */}
        <div className="flex sm:grid sm:gap-2 sm:grid-cols-2 justify-between items-center">
          {/* Timmer */}
          <div className="flex items-center space-x-3 font-semibold ">
            <p className="leading-8">Time remaining:</p>
            <div className="">
              <p className="font-normal font-satoshi text-2xl">4:59</p>
            </div>
          </div>
          {/* Actions */}
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="w-28 px-4 bg-teal-500 text-white h-10 rounded-md font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full">
        {/* Desktop Tesing-ground */}
        <DesktopTestingGround testingMode={testingMode} showMode={showMode} />
        {/* Mobile Testing-ground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Checking testing mode pass through URL params */}
          {testingMode === "writing" ? (
            <TestingGround_Writing showMode={showMode} />
          ) : (
            <TestingGround_Choice showMode={showMode} />
          )}
        </div>
      </div>
      {isOpen &&
        createPortal(
          <ResultModal isOpen={isOpen} setIsOpen={setIsOpen} />,
          document.getElementById("primary-nav")
        )}
    </div>
  );
}
