import React, { useEffect, useRef, useState } from "react";
import SectionSelection from "./SectionSelection";
import DisplaySetting from "./DisplaySetting";
import PlayGround from "./PlayGround";
import { useCard } from "@lib/useCard";
export default function FlipCardMode({ collectionId }) {
  // Fetched data
  const { data: cardList } = useCard(collectionId);
  // Local state
  const [openSelect, setOpenSelect] = useState(true);
  const [currentSection, setCurrentSection] = useState({
    startNumber: 1,
    endNumber: null,
  });
  const [currentCardArr, setCurrentCardArr] = useState([]);
  const [buttonArr, setButtonArr] = useState([]);
  // Set current card list for first render
  useEffect(() => {
    const buttons = getbuttonArray(cardList?.length, 10);
    setButtonArr(buttons);
    const button1 = buttons[0];
    const updatedSection = {
      startNumber: button1?.startNumber,
      endNumber: button1?.endNumber,
    };
    setCurrentSection(updatedSection);
    setCurrentCardArr(getCurrentCardArr(cardList, updatedSection));
  }, [JSON.stringify(cardList)]);
  // Update currentCardArr when current section change
  useEffect(() => {
    setCurrentCardArr(getCurrentCardArr(cardList, currentSection));
  }, [JSON.stringify(currentCardArr), JSON.stringify(currentSection)]);
  return (
    <>
      <SectionSelection
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        collectionId={collectionId}
        openSelect={openSelect}
        setOpenSelect={setOpenSelect}
        buttonArr={buttonArr}
      />
      <DisplaySetting openSelect={openSelect} />
      <PlayGround
        currentCardArr={currentCardArr}
        setOpenSelect={setOpenSelect}
      />
    </>
  );
}

const getCurrentCardArr = (cardArr, currentSection) => {
  const startIndex = currentSection.startNumber - 1;
  const endIndex = currentSection.endNumber;

  if (endIndex !== -1 && cardArr) {
    return cardArr.slice(startIndex, endIndex);
  }
  return [];
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
