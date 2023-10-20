import React, { useRef, useState } from "react";
import SectionSelection from "./SectionSelection";
import DisplaySetting from "./DisplaySetting";
import PlayGround from "./PlayGround";
import { useCard } from "@lib/useCard";

export default function FlipCardMode({ collectionId }) {
  const [openSelect, setOpenSelect] = useState(true);
  const [currentSection, setCurrentSection] = useState({
    startNumber: null,
    endNumber: null,
  });
  const { data: cardList } = useCard(collectionId);

  console.log("currentSection: ", currentSection);
  return (
    <>
      <SectionSelection
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        collectionId={collectionId}
        openSelect={openSelect}
        setOpenSelect={setOpenSelect}
      />
      <DisplaySetting openSelect={openSelect} />
      <PlayGround setOpenSelect={setOpenSelect} />
    </>
  );
}
