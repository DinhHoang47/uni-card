import React, { useEffect, useRef, useState } from "react";
import SectionSelection from "./SectionSelection";
import DisplaySetting from "./DisplaySetting";
import PlayGround from "./PlayGround";
import { useCard } from "@lib/useCard";
import { useCollection } from "@lib/useCollection";
export default function FlipCardMode({ collectionId }) {
  // Fetched data
  const { data: cardList } = useCard(collectionId);
  const { data: collectionData } = useCollection(collectionId);
  // Local state
  const [openSelect, setOpenSelect] = useState(true);
  const [currentSection, setCurrentSection] = useState({
    startNumber: 1,
    endNumber: null,
  });
  const [currentCardArr, setCurrentCardArr] = useState([]);
  const [buttonArr, setButtonArr] = useState([]);
  const [cardPerPage, setCardPerPage] = useState(10);
  const [displayOptions, setDisplayOptions] = useState({
    displayDef2: null,
    displayImg: null,
    displayExample: null,
  });
  const [initOptions, setInitOptions] = useState({
    displayDef2: null,
    displayExample: null,
    displayImg: null,
  });
  // Set init data for displayOptions
  useEffect(() => {
    setDisplayOptions({
      displayDef2: collectionData?.display_def_2,
      displayExample: collectionData?.display_example,
      displayImg: collectionData?.display_img,
    });
    setInitOptions({
      displayDef2: collectionData?.display_def_2,
      displayExample: collectionData?.display_example,
      displayImg: collectionData?.display_img,
    });
  }, [collectionData]);
  // Set current card list for first render
  useEffect(() => {
    const buttons = getButtonArray(cardList?.length, cardPerPage * 1);
    setButtonArr(buttons);
    const button1 = buttons[0];
    const updatedSection = {
      startNumber: button1?.startNumber,
      endNumber: button1?.endNumber,
    };
    setCurrentSection(updatedSection);
    setCurrentCardArr(getCurrentCardArr(cardList, updatedSection));
  }, [JSON.stringify(cardList), cardPerPage]);
  // Update currentCardArr when current section change
  useEffect(() => {
    setCurrentCardArr(getCurrentCardArr(cardList, currentSection));
  }, [
    JSON.stringify(currentCardArr),
    JSON.stringify(currentSection),
    cardPerPage,
  ]);
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
      <DisplaySetting
        cardPerPage={cardPerPage}
        setCardPerPage={setCardPerPage}
        initOptions={initOptions}
        setDisplayOptions={setDisplayOptions}
        openSelect={openSelect}
      />
      <PlayGround
        displayOptions={displayOptions}
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

const getButtonArray = (totalCard, pageSize = 10) => {
  const totalPage = Math.ceil(totalCard / pageSize);
  const buttonArray = [];
  let endNumber = 0;
  let startNumber = 0;
  let end = 0;
  for (let index = 0; index < totalPage; index++) {
    startNumber = index * pageSize + (index === 0 ? 1 : 0);
    end = startNumber + pageSize - (index === 0 ? 1 : 0);
    if (end <= totalCard) {
      endNumber = end;
    } else {
      endNumber = totalCard;
    }
    buttonArray.push({ startNumber, endNumber });
  }
  return buttonArray;
};
