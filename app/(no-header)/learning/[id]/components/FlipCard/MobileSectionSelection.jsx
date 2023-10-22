"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Mobile_SelectedSectionButton from "./Mobile_SelectedSectionButton";
import Mobile_SectionSelectionList from "./Mobile_SectionSelectionList";

export default function MobileSectionSelection({
  buttonArr,
  currentSection,
  setCurrentSection,
}) {
  // Local state
  const [openMenu, setOpenMenu] = useState();
  return (
    <div className=" relative flex justify-between items-center pt-2">
      {/* Title */}
      <p className="font-semibold select-none">Select section to learn</p>
      {/* Dropdown to select */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu((pre) => !pre);
        }}
        className={`w-32 h-12 relative pl-1 pr-4 py-1 border border-gray-400 rounded ${
          openMenu ? "border-b-0 rounded-b-none" : ""
        }`}
      >
        {!openMenu && (
          <Mobile_SelectedSectionButton currentSection={currentSection} />
        )}

        {openMenu && (
          <Mobile_SectionSelectionList
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            buttonArr={buttonArr}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        )}
        <ChevronDownIcon
          className={`${
            openMenu ? "" : "-rotate-90"
          } h-4 w-4 stroke-2 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-[1px]`}
        />
      </div>
    </div>
  );
}
