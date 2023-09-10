"use client";
import { useEffect, useRef, useState } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import SelectSectionButton from "@components/SelectSectionButton";
import CardLearn from "./CardLearn";
import MobilePlayground from "./MobilePlayground";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import SettingModal from "./components/SettingModal";

export default function CollectionLearn({ params }) {
  const [openSelect, setOpenSelect] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const SelectSectionRef = useRef();
  const [openMenu, setOpenMenu] = useState();
  const router = useRouter();

  const handleTest = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full mt-2 sm:mt-4 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Section */}
      <div className="w-full space-y-2 sm:space-y-4">
        {/* Title */}
        <div className="">
          <button className="flex items-center">
            <ChevronLeftIcon className="h-4 w-4 text-sm" />
            <span className="">Back</span>
          </button>
        </div>
        <div className="">
          <h3 className="font-semibold text-xl">Collection title</h3>
        </div>
      </div>
      {/* Section */}
      {/* Desktop Selection */}
      <div className="hidden sm:block w-full space-y-2 sm:space-y-4">
        {/* Title */}
        <div className="flex space-x-2 cursor-pointer">
          <p
            onClick={() => {
              setOpenSelect((pre) => !pre);
            }}
            className="font-semibold select-none"
          >
            Select section to learn
          </p>
          <button
            onClick={() => {
              setOpenSelect((pre) => !pre);
            }}
          >
            <ChevronDownIcon
              className={`h-5 w-5 text-blue-500 ${
                openSelect ? "" : "-rotate-90"
              } transition-transform `}
            />
          </button>
        </div>
        {/*Section Selection */}
        <div
          onTransitionEnd={(e) => {
            if (!openSelect) {
              e.target.classList.add("h-0");
            } else {
              e.target.classList.remove("h-0");
            }
          }}
          ref={SelectSectionRef}
          className={`${
            openSelect ? "max-h-96" : "max-h-0"
          } overflow-hidden transition-all origin-top`}
        >
          <ul
            className={`grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 gap-2`}
          >
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton selected />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
            <SelectSectionButton />
          </ul>
        </div>
      </div>
      {/* Mobile Selection */}
      <div className="relative block sm:hidden w-full space-y-2 sm:space-y-4">
        <div className="flex justify-between items-center">
          {/* Title */}
          <p className="font-semibold select-none">
            Select section to learn mobile
          </p>
          {/* Dropdown to select */}
          <button
            onClick={() => {
              setOpenMenu((pre) => !pre);
            }}
            className={`border-2 border-blue-500 w-32 h-10 items-center justify-center flex space-x-2 rounded-t-md ${
              openMenu ? "border-b-0" : "rounded-b-md"
            }`}
          >
            <div className=" font-semibold font-satoshi">1 ~ 10</div>
            <ChevronDownIcon className="h-5 w-5 stroke-2" />
          </button>
          <ul
            className={`absolute z-10 right-0 top-0 translate-y-10 w-32 overflow-hidden ${
              openMenu ? "max-h-44 border-b-2" : "max-h-0"
            } transition-all divide-y-2 px-2 divide-gray-300 border-x-2  rounded-b-md border-blue-500 bg-white overflow-y-scroll`}
          >
            <li className="text-center font-satoshi font-semibold flex justify-center py-2 space-x-2 cursor-pointer">
              111 ~ 222
              <div className="h-5 w-5"></div>
            </li>
            <li className="text-center font-satoshi font-semibold flex justify-center py-2 space-x-2 cursor-pointer">
              111 ~ 222
              <div className="h-5 w-5"></div>
            </li>
            <li className="text-center font-satoshi font-semibold flex justify-center py-2 space-x-2 cursor-pointer">
              111 ~ 222
              <div className="h-5 w-5"></div>
            </li>
            <li className="text-center font-satoshi font-semibold flex justify-center py-2 space-x-2 cursor-pointer">
              111 ~ 222
              <div className="h-5 w-5"></div>
            </li>
            <li className="text-center font-satoshi font-semibold flex justify-center py-2 space-x-2 cursor-pointer">
              111 ~ 222
              <div className="h-5 w-5"></div>
            </li>
          </ul>
        </div>
      </div>
      {/* Section */}
      <div className={`w-full space-y-4 ${openSelect ? "" : "sm:!mt-0"}`}>
        {/* Setting & button */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 justify-between items-center">
          {/* Setting */}
          <div className="flex items-center space-x-3 font-semibold ">
            <span>Display:</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="kanji-setting">Kanji</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="kanji-setting"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="meaning-setting">Meaning</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="meaning-setting"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="example-setting">Example</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="example-setting"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => {
                handleTest();
              }}
              className="w-28 bg-teal-500 text-white h-10 rounded-md font-semibold"
            >
              Test
            </button>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full">
        {/* Desktop playground */}
        <div className=" hidden sm:grid grid-cols-3 lg:grid-cols-4 gap-6 lg:px-5 xl:px-20">
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
          <CardLearn />
        </div>
        {/* Mobile Playground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Card */}
          <MobilePlayground />
          {/* Select Card Button */}
        </div>
      </div>
      {isOpen &&
        createPortal(
          <SettingModal
            collectionId={params.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />,
          document.getElementById("primary-nav")
        )}
    </div>
  );
}
