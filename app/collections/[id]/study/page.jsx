"use client";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import SelectSectionButton from "@components/SelectSectionButton";
import CardStudy from "@components/CardStudy";
import { useKeenSlider } from "keen-slider/react";
import MobileCardStudy from "@components/MobileCardStudy";
import MobilePlayground from "@components/MobilePlayground";

export default function CollectionStudy() {
  const [openSelect, setOpenSelect] = useState(true);
  const SelectSectionRef = useRef();

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
      <div className="w-full space-y-2 sm:space-y-4">
        {/* Title */}
        <div className="flex space-x-2 cursor-pointer">
          <p
            onClick={() => {
              setOpenSelect((pre) => !pre);
            }}
            className="font-semibold select-none"
          >
            Select section to study
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
        {/* Section selection */}
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
      {/* Section */}
      <div className={`w-full space-y-4 ${openSelect ? "" : "!mt-0"}`}>
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
            <button className="w-28 px-4 bg-teal-500 text-white h-9 rounded-md">
              Test
            </button>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full">
        {/* Desktop playground */}
        <div className=" hidden sm:grid grid-cols-3 lg:grid-cols-4 gap-6 lg:px-5 xl:px-20">
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
          <CardStudy />
        </div>
        {/* Mobile Playground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Card */}
          <MobilePlayground />
          {/* Select Card Button */}
        </div>
      </div>
    </div>
  );
}
