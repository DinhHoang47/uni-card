"use client";
import React, { useEffect, useRef, useState } from "react";
import SectionSelection from "./SectionSelection";
import DisplaySetting from "./DisplaySetting";
import PlayGround from "./PlayGround";
import { useCard } from "@lib/useCard";
import { useCollection } from "@lib/useCollection";
import { useLearningStatus } from "@lib/useLearningStatus";
export default function FlipCardMode({
  collectionId,
  currentSection,
  setCurrentSection,
  testingStatus,
  setIsOpenLearningConfig,
}) {
  // Fetched data
  const { data: cardList } = useCard(collectionId);
  const { data: collectionData, isLoading: collectionIsLoading } =
    useCollection(collectionId);
  const { data: learningStatus } = useLearningStatus(collectionId);
  // Local state
  const [openSelect, setOpenSelect] = useState(true);
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
      startNumber: button1?.startNumber || 1,
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
  // Update page size fetched from cloud
  useEffect(() => {
    if (learningStatus?.flip_mode_page_size) {
      setCardPerPage(learningStatus.flip_mode_page_size);
    }
  }, [learningStatus]);
  if (cardList?.length === 0) return <div className="">No cards to study</div>;
  if (cardList?.length !== 0) {
    return (
      <>
        <SectionSelection
          key={buttonArr[0]?.startNumber}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          collectionId={collectionId}
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
          buttonArr={buttonArr}
          testingStatus={testingStatus}
          currentCardArr={currentCardArr}
          cardArr={cardList}
        />
        <DisplaySetting
          cardPerPage={cardPerPage}
          setCardPerPage={setCardPerPage}
          initOptions={initOptions}
          setDisplayOptions={setDisplayOptions}
          openSelect={openSelect}
          setIsOpenLearningConfig={setIsOpenLearningConfig}
        />
        <PlayGround
          key={buttonArr[0].startNumber}
          collectionId={collectionId}
          displayOptions={displayOptions}
          currentCardArr={currentCardArr}
          setOpenSelect={setOpenSelect}
        />
      </>
    );
  }
}

const getCurrentCardArr = (cardArr, currentSection) => {
  const startIndex = currentSection.startNumber - 1;
  const endIndex = currentSection.endNumber;

  if (endIndex !== -1 && cardArr) {
    return cardArr.slice(startIndex, endIndex);
  }
  return [];
};

const getButtonArray = (totalCard = 0, pageSize = 10) => {
  const totalPage = Math.ceil(totalCard / pageSize);
  const buttonArray = [];
  let endNumber = 0;
  let startNumber = 0;
  let end = 0;
  for (let index = 0; index < totalPage; index++) {
    startNumber = index * pageSize + 1;
    end = startNumber + pageSize - 1;
    if (end <= totalCard) {
      endNumber = end;
    } else {
      endNumber = totalCard;
    }
    buttonArray.push({ startNumber, endNumber });
  }
  return buttonArray;
};
