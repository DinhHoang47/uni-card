import React, { useState } from "react";
import DesktopSectionSelection from "../DesktopSectionSelection";
import MobileSectionSelection from "../MobileSectionSelection";

export default function SectionSelection({
  setOpenSelect,
  openSelect,
  selectSectionRef,
  openMenu,
  setOpenMenu,
}) {
  return (
    <>
      <div className="hidden sm:block w-full space-y-2 sm:space-y-4">
        <DesktopSectionSelection
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
          selectSectionRef={selectSectionRef}
        />
      </div>
      {/* Mobile Selection */}
      <div className="block sm:hidden w-full space-y-2 sm:space-y-4">
        <MobileSectionSelection setOpenMenu={setOpenMenu} openMenu={openMenu} />
      </div>
    </>
  );
}
