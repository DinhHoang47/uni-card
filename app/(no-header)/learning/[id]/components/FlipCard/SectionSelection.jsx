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
}) {
  const { data: collectionData } = useCard(collectionId);
  const buttonsArr = getButtonsArray(collectionData?.length);
  if (collectionData?.length === 0) return <NoCard />;
  return (
    <>
      <div className="hidden sm:block w-full">
        <DesktopSectionSelection
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          buttonsArr={buttonsArr}
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
        />
      </div>
      {/* Mobile Selection */}
      <div className="block sm:hidden w-full space-y-2 sm:space-y-4">
        <MobileSectionSelection buttonsArr={buttonsArr} />
      </div>
    </>
  );
}

const NoCard = () => {
  return <div className="">No section to select</div>;
};

const getButtonsArray = (totalCard, cardPerPage = 10) => {
  const totalPage = Math.ceil(totalCard / cardPerPage);
  const buttonsArray = [];
  for (let index = 0; index < totalPage; index++) {
    const startNumber = index * cardPerPage + (index === 0 ? 1 : 0);
    const end = startNumber + cardPerPage - (index === 0 ? 1 : 0);
    let endNumber;
    if (end <= totalCard) {
      endNumber = end;
    } else {
      endNumber = totalCard;
    }
    buttonsArray.push({ startNumber, endNumber });
  }
  return buttonsArray;
};
