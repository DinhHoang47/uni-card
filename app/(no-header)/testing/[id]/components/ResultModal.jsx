"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useState } from "react";

export default function ResultModal({
  isOpen,
  setIsOpen,
  hanger,
  resultArr,
  handleRetest,
  collectionId,
}) {
  // Fetched data
  // Local state
  // Handler
  const router = useRouter();
  const handleBackToLearning = () => {
    setIsOpen(false);
    router.push(`/learning/${collectionId}`);
  };
  return (
    <PortalModalWrapper mountTarget={hanger}>
      {/* Main container */}
      <div className="p-4 rounded relative cursor-pointer bg-white space-y-6">
        <Granding resultArr={resultArr} />
        <ResultList resultArr={resultArr} />
        <div className="space-y-2">
          <div className="">
            <button className="h-10 w-full bg-teal-400 text-white rounded-md">
              Next section
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                handleRetest();
              }}
              className="bg-orange-400 h-10 text-white px-4 rounded-md w-1/2"
            >
              Retest
            </button>
            <button
              onClick={handleBackToLearning}
              className="bg-blue-500 h-10 text-white px-4 rounded-md w-1/2"
            >
              Back to learning
            </button>
          </div>
        </div>
      </div>
    </PortalModalWrapper>
  );
}

function ResultList({ resultArr }) {
  const buttonPerRow = 10;
  const rowsNumber = Math.ceil(resultArr.length / buttonPerRow);
  const Rows = [];
  for (let i = 0; i < rowsNumber; i++) {
    const startIndex = i * buttonPerRow;
    const endIndex = (i + 1) * buttonPerRow;
    const renderData = resultArr.slice(startIndex, endIndex);
    const renderLength = renderData.length;
    const Row = (
      <ul
        key={`button-list-${i}`}
        className={`${
          i > 0 ? "mt-2" : ""
        } flex items-center space-x-2 justify-center sm:space-x-3 ${
          renderLength < buttonPerRow ? "" : ""
        }`}
      >
        {renderData.map((item, index) => (
          <li
            key={`card-select-btn-${index + buttonPerRow * i}`}
            className={`h-7 w-7 border-2 flex items-center justify-center rounded border-slate-400 cursor-pointer ${
              item.passed ? styles.correct : styles.fail
            }`}
          >
            {index + 1 + buttonPerRow * i}
          </li>
        ))}
      </ul>
    );
    Rows.push(Row);
  }
  return (
    <div className={`max-h-48 overflow-y-auto ${styles.resultList}`}>
      {Rows}
    </div>
  );
}

const Granding = ({ resultArr }) => {
  // Local state
  const [currentGranding, setCurrentGranding] = useState("");
  const grandingType = {
    GOOD: "GOOD",
    AVERAGE: "AVERAGE",
    BELOWAVERAGE: "BELOWAVERAGE",
  };
  const grandingInfo = {
    GOOD: {
      score: 0.8,
      text: "Well done! Keep up the great work.",
      imageUrl: "/assets/images/goodGrandingIcon.png",
    },
    AVERAGE: {
      score: 0.5,
      text: "Nice effort! Keep improving.",
      imageUrl: "/assets/images/averageGrandingIcon.png",
    },
    BELOWAVERAGE: {
      score: 0,
      text: "Don't give up! Keep trying.",
      imageUrl: "/assets/images/belowAverageGrandingIcon.png",
    },
  };
  const totalQuiz = resultArr.length;
  const passedQuiz = resultArr.reduce((accumulator, item) => {
    if (item.passed) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
  useEffect(() => {
    const score = passedQuiz / totalQuiz;
    if (score > 0.8) {
      setCurrentGranding(grandingType.GOOD);
    } else if (score > 0.5) {
      setCurrentGranding(grandingType.AVERAGE);
    } else {
      setCurrentGranding(grandingType.BELOWAVERAGE);
    }
  }, [JSON.stringify(resultArr)]);
  if (currentGranding) {
    return (
      <>
        {/* Header */}
        <div className="">
          <p className="text-center font-semibold text-lg">
            {grandingInfo[currentGranding].text}
          </p>
        </div>
        {/* Icon */}
        <div className="flex justify-center">
          <Image
            width={60}
            height={60}
            alt="result-image"
            src={grandingInfo[currentGranding].imageUrl}
          />
        </div>
        {/* Score */}
        <div className="">
          <p className="text-center font-semibold text-2xl">{`${passedQuiz}/${totalQuiz}`}</p>
        </div>
      </>
    );
  }
};
