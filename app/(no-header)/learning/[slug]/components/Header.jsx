"use client";
import BackTooltip from "@components/BackTooltip";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import LearningModeTooltip from "./LearningModeTooltip";

export default function Header({ slug, handleTest }) {
  const [isOpenPopup1, setIsOpenPopup1] = useState();
  const [isOpenPopup2, setIsOpenPopup2] = useState();
  return (
    <div
      id="learning-header"
      className="fixed flex items-center justify-between top-0 left-0 right-0 h-14 z-10 px-2 sm:px-8 bg-white border-b border-b-outline-primary space-x-2"
    >
      {/* Title */}
      <div className="flex space-x-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenPopup1((pre) => !pre);
          }}
        >
          <ArrowLeftOnRectangleIcon
            className={`h-8 w-8  ${isOpenPopup1 ? "text-blue-500" : ""} `}
          />
        </button>
        {isOpenPopup1 && (
          <BackTooltip slug={slug} setIsOpenPopup={setIsOpenPopup1} />
        )}
        <div className="flex items-center">
          <span className="font-semibold line-clamp-1">
            Collection title here Lorem ipsum dolor sit amet.
          </span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex space-x-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenPopup2((pre) => !pre);
          }}
          className=" flex items-center pl-4 pr-2 bg-blue-600 text-white h-9 rounded-md"
        >
          <span className="hidden sm:inline-block">Mode</span>
          <span className="inline-block sm:hidden">
            <Cog6ToothIcon className=" h-5 w-5" />
          </span>
          <span>
            <ChevronDownIcon
              className={`${
                isOpenPopup2 ? "" : "-rotate-90"
              } h-4 w-4 text-white transition-all `}
            />
          </span>
        </button>
        {isOpenPopup2 && (
          <LearningModeTooltip setIsOpenPopup={setIsOpenPopup2} />
        )}
        <button
          onClick={() => {
            handleTest();
          }}
          className="px-5 bg-teal-500 text-white h-9 rounded-md"
        >
          Test
        </button>
      </div>
    </div>
  );
}