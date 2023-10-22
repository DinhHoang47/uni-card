import React, { useState } from "react";
import { useCard } from "@lib/useCard";
import DesktopSectionSelection from "./DesktopSectionSelection";
import MobileSectionSelection from "./MobileSectionSelection";

export default function SectionSelection({
  setOpenSelect,
  openSelect,
  collectionId,
  setCurrentSection,
  currentSection,
  buttonArr,
}) {
  return (
    <>
      <div className="hidden sm:block w-full">
        <DesktopSectionSelection
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          buttonArr={buttonArr}
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
        />
      </div>
      {/* Mobile Selection */}
      <div className="block sm:hidden w-full space-y-2 sm:space-y-4">
        <MobileSectionSelection
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          buttonArr={buttonArr}
        />
      </div>
    </>
  );
}

const NoCard = () => {
  return <div className="">No section to select</div>;
};

const getbuttonArray = (totalCard, cardPerPage = 10) => {
  const totalPage = Math.ceil(totalCard / cardPerPage);
  const buttonArray = [];
  for (let index = 0; index < totalPage; index++) {
    const startNumber = index * cardPerPage + (index === 0 ? 1 : 0);
    const end = startNumber + cardPerPage - (index === 0 ? 1 : 0);
    let endNumber;
    if (end <= totalCard) {
      endNumber = end;
    } else {
      endNumber = totalCard;
    }
    buttonArray.push({ startNumber, endNumber });
  }
  return buttonArray;
};
