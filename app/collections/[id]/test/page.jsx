"use client";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import MobileTestingGround from "@app/collections/[id]/test/MobileTestingGround";
import DesktopTestingGround from "./DesktopTestingGround";
import { useRouter } from "next/navigation";

export default function CollectionTest({ params }) {
  const [openSelect, setOpenSelect] = useState(true);
  const SelectSectionRef = useRef();
  const [openMenu, setOpenMenu] = useState();
  const router = useRouter();

  return (
    <div className="w-full mt-2 sm:mt-4 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Section */}
      <div className="w-full space-y-2 sm:space-y-4">
        {/* Title */}
        <div className="">
          <button
            onClick={() => {
              router.push(`/collections/${params.id}/study`);
            }}
            className="flex items-center"
          >
            <ChevronLeftIcon className="h-4 w-4 text-sm" />
            <span className="">Back to study</span>
          </button>
        </div>
        <div className="">
          <h3 className="font-semibold text-xl">Collection title</h3>
        </div>
      </div>
      {/* Section */}
      <div className={`w-full space-y-4 ${openSelect ? "" : "sm:!mt-0"}`}>
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
            <button className="w-28 px-4 bg-teal-500 text-white h-10 rounded-md font-semibold">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full">
        {/* Desktop Tesing-ground */}
        <DesktopTestingGround />
        {/* Mobile Testing-ground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          <MobileTestingGround />
        </div>
      </div>
    </div>
  );
}
