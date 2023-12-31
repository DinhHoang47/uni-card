"use client";
import { useEffect, useRef, useState } from "react";
import TestingGround from "./desktop/DesktopTestingGround";
import { useSearchParams } from "next/navigation";
import ResultModal from "./components/ResultModal";
import Header from "./components/Header";
import { CSSTransition } from "react-transition-group";
import { useCard } from "@lib/useCard";
import { shuffleArray } from "@utils/arraySuffer";
import { generate } from "random-words";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

export default function CollectionTest({ params }) {
  const searchParams = useSearchParams();
  // Validate setting in query string
  const validSetting = {
    input: ["typing", "multiple-choice"],
    testing: ["term", "definition"],
  };
  const testingMode = searchParams.get("testing");
  const inputMode = searchParams.get("input");
  const checkValidParams = () => {
    const validTestingMode = validSetting.testing.includes(testingMode);
    const validInputMode = validSetting.input.includes(inputMode);
    if (!validInputMode || !validTestingMode) {
      return false;
    } else {
      return true;
    }
  };
  const valid = checkValidParams();
  if (!valid) return <div className="text-center">Page not found</div>;
  // Fetched data
  const { id: collectionId } = params;
  const { data: cardData } = useCard(collectionId);
  // Local state
  const resultModalHanger = useRef(null);
  const section = searchParams.get("section");
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState({
    start: null,
    end: null,
  });
  const [quizArr, setQuizArr] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [answerArr, setAnswerArr] = useState([]);
  const [resultArr, setResultArr] = useState([]);
  // Handler

  const handleRetest = () => {
    // Init answer arra
    const emptyAnswerArr = quizArr.map((item) => ({
      id: item.id,
      answer: null,
      answerIndex: null,
    }));
    setAnswerArr(emptyAnswerArr);
    setCurrentQuiz(quizArr[0].id);
    setResultArr([]);
    setIsOpen(false);
  };

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
    // Generate quiz array
    if (cardData && currentSection.start && currentSection.end) {
      // Set quiz array
      const currentArr = getCurrentCardArr(cardData, currentSection);
      const quizArr = generateQuiz(currentArr, testingMode);
      setCurrentQuiz(quizArr[0].id);
      setQuizArr(quizArr);
      // Init answer array
      const emptyAnswerArr = quizArr.map((item) => ({
        id: item.id,
        answer: null,
        answerIndex: null,
      }));
      setAnswerArr(emptyAnswerArr);
    }
  }, [currentSection, cardData]);
  if (cardData?.length === 0) return <NoCard />;
  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      <Header
        section={section}
        collectionId={collectionId}
        handleSubmit={handleSubmit}
      />
      <TestingGround
        quizArr={quizArr}
        currentQuiz={currentQuiz}
        setCurrentQuiz={setCurrentQuiz}
        answerArr={answerArr}
        setAnswerArr={setAnswerArr}
        testingMode={testingMode}
        inputMode={inputMode}
        setResultArr={setResultArr}
        setOpenResultModal={setIsOpen}
        collectionId={collectionId}
      />
      <CSSTransition
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
        nodeRef={resultModalHanger}
      >
        <ResultModal
          handleRetest={handleRetest}
          hanger={"resultModalHanger"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={params.id}
          resultArr={resultArr}
          collectionId={collectionId}
        />
      </CSSTransition>
      <div ref={resultModalHanger} id={"resultModalHanger"} className=""></div>
    </div>
  );
}

const NoCard = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 space-y-2 ">
      <p>No cards to test</p>

      <Link
        className="flex items-center space-x-2 hover:text-blue-600"
        href={"/mypage"}
      >
        <ArrowLeftIcon className="h-4 w-4 " />
        <span>My page </span>
      </Link>
    </div>
  );
};

const getCurrentCardArr = (cardArr, currentSection) => {
  const startIndex = currentSection.start - 1;
  const endIndex = currentSection.end;
  return cardArr.slice(startIndex, endIndex);
};

const generateQuiz = (cardArr, testingMode) => {
  // Define total answer number
  const optionNum = 4;
  let quizArr = [];
  // Get all the anwser options from the card's definition or term
  const allOptionArr = cardArr.map((item, index) => {
    if (testingMode === "term") {
      return item.definition_1;
    } else if (testingMode === "definition") {
      return item.term;
    }
  });
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
        removedInvalidChoiceArr.push(generate());
      }
    }
    // Select random answer from removedInvalidChoiceArr
    const randomValidChoice = getRandomAnswerArr(
      removedInvalidChoiceArr,
      optionNum - 1
    );
    // push the correct answer to answer array
    let correctAns;
    if (testingMode === "term") {
      correctAns = item.definition_1;
    } else if (testingMode === "definition") {
      correctAns = item.term;
    }
    const validChoiceArr = [...randomValidChoice, correctAns];
    const shuffledArr = shuffleArray(validChoiceArr);
    // Set quiz
    let quiz;
    if (testingMode === "term") {
      quiz = item.term;
    } else if (testingMode === "definition") {
      quiz = item.definition_1;
    }
    return {
      id: index + 1,
      quiz: quiz,
      answer: correctAns,
      choices: shuffledArr,
      cardId: item.id,
    };
  });
  // Shuffle quiz array
  const shuffledQuiz = shuffleArray(quizArr);
  return shuffledQuiz;
};

const getRandomAnswerArr = (arr, numItems) => {
  if (numItems > arr.length) {
    return [];
  }
  const randomItems = [];
  const usedIndices = [];
  for (let i = 0; i < numItems; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * arr.length);
    } while (usedIndices.includes(randomIndex));
    usedIndices.push(randomIndex);
    randomItems.push(arr[randomIndex]);
  }
  return randomItems;
};
