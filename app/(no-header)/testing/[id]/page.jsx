"use client";
import { useEffect, useState } from "react";
import DesktopTestingGround from "./desktop/DesktopTestingGround";
import { useSearchParams } from "next/navigation";
import TestingGround_Choice from "./mobile/TestingGround_Choice";
import TestingGround_Writing from "./mobile/TestingGround_Writing";
import ResultModal from "./components/ResultModal";
import Header from "./components/Header";
import { CSSTransition } from "react-transition-group";
import { isNumber } from "@mui/x-data-grid/internals";
import { useCard } from "@lib/useCard";
import { shuffleArray } from "@utils/arraySuffer";

export default function CollectionTest({ params }) {
  // Fetched data
  const { id: collectionId } = params;
  const { data: cardData } = useCard(collectionId);
  // Local state
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const testingMode = searchParams.get("mode");
  const showMode = searchParams.get("show");
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState({
    start: null,
    end: null,
  });
  const [quizArr, setQuizArr] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  // Handler

  const handleSubmit = () => {
    setIsOpen(true);
  };
  // Side effect
  useEffect(() => {
    // Get and set current section, current card
    if (section) {
      const parts = section.split(":");
      if (isNaN(parts[0]) || isNaN(parts[1])) {
        return;
      }
      setCurrentSection({ start: parts[0] * 1, end: parts[1] * 1 });
    }
  }, []);
  useEffect(() => {
    // if()
    // Generate quiz array
    if (cardData && currentSection.start && currentSection.end) {
      console.log(currentSection);
      const currentArr = getCurrentCardArr(cardData, currentSection);
      const quizArr = generateQuiz(currentArr);
      setQuizArr(quizArr);
    }
  }, [currentSection, cardData]);
  useEffect(() => {
    console.log(quizArr);
  }, [quizArr]);
  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Header */}
      <Header
        section={section}
        collectionId={collectionId}
        handleSubmit={handleSubmit}
      />
      {/* Section */}
      <div className="w-full">
        {/* Desktop Tesing-ground */}
        <DesktopTestingGround testingMode={testingMode} showMode={showMode} />
        {/* Mobile Testing-ground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Checking testing mode pass through URL params */}
          {testingMode === "writing" ? (
            <TestingGround_Writing showMode={showMode} />
          ) : (
            <TestingGround_Choice showMode={showMode} />
          )}
        </div>
      </div>
      {/* Setting Modal */}
      <CSSTransition
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <ResultModal isOpen={isOpen} setIsOpen={setIsOpen} id={params.id} />
      </CSSTransition>
    </div>
  );
}

const getCurrentCardArr = (cardArr, currentSection) => {
  const startIndex = currentSection.start - 1;
  const endIndex = currentSection.end;
  return cardArr.slice(startIndex, endIndex);
};

const generateQuiz = (cardArr) => {
  // Define total answer number
  const optionNum = 4;
  let quizArr = [];
  // Get all the anwser options from the card's definition or term
  const allOptionArr = cardArr.map((item) => item.definition_1);
  quizArr = cardArr.map((item, index) => {
    // Get anwser options without current the correct one
    const allChoiceArr = allOptionArr
      .slice(0, index)
      .concat(allOptionArr.slice(index + 1));
    // Remove all undifine choices
    const removedInvalidChoiceArr = allChoiceArr.filter(
      (item) => item !== undefined && item !== ""
    );
    // If valid choices array length smaller then optionNum - 1 then push random anwser to it
    if (removedInvalidChoiceArr.length + 1 < optionNum) {
      const oweItems = optionNum - 1 - removedInvalidChoiceArr.length;
      for (let i = 0; i < oweItems; i++) {
        removedInvalidChoiceArr.push(new Date());
      }
    }
    const validChoiceArr = [...removedInvalidChoiceArr, item.definition_1];
    const shuffledArr = shuffleArray(validChoiceArr);
    return {
      quiz: item.term,
      answer: item.definition_1,
      choices: shuffledArr,
    };
  });
  return quizArr;
};
