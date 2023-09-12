"use client";
import { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Mobile_SectionSelectionList from "./Mobile_SectionSelectionList";
import Mobile_SelectedSectionButton from "./Mobile_SelectedSectionButton";

export default function MobileSectionSelection({ setOpenMenu, openMenu }) {
  return (
    <div className=" relative flex justify-between items-center pt-2">
      {/* Title */}
      <p className="font-semibold select-none">Select section to learn</p>
      {/* Dropdown to select */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu((pre) => !pre);
        }}
        className={`relative  pr-5 pl-2 w-36 h-12 items-center justify-center flex rounded-t-md ${
          openMenu
            ? "border-b-0 border-2 border-blue-500"
            : "rounded-b-md transition-all"
        }`}
      >
        <Mobile_SelectedSectionButton />
        <ChevronDownIcon
          className={`${
            openMenu ? "" : "-rotate-90"
          } h-4 w-4 stroke-2 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-[1px]`}
        />
      </button>
      {openMenu && (
        <Mobile_SectionSelectionList
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      )}
    </div>
  );
}
