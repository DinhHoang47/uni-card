"use client";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Image from "next/image";
import styles from "./styles.module.css";

export default function CardLearn({
  data,
  displayOptions,
  statusArray,
  isDisplayStatus,
}) {
  // Local state
  // const [currentStatus, setCurrentStatus] = useState("notTestedYet");
  const [isFlipped, setIsFlipped] = useState(false);
  let currentStatus = "notTestedYet";
  // Handler
  const updateStatus = () => {
    const foundStatus = statusArray?.find((item) => {
      return item.c === data.id;
    });
    if (foundStatus && foundStatus.r === 1) {
      currentStatus = "passed";
    } else if (foundStatus && foundStatus.r === 0) {
      currentStatus = "failed";
    }
  };
  updateStatus();
  return (
    <div className="h-[270px] rounded-lg cursor-pointer ">
      <ReactCardFlip
        flipDirection="vertical"
        isFlipped={isFlipped}
        containerStyle={{ height: "100%", borderRadius: "8px" }}
      >
        {/* Front */}
        <FrontSide
          isDisplayStatus={isDisplayStatus}
          currentStatus={currentStatus}
          data={data}
          setIsFlipped={setIsFlipped}
        />
        <BackSide
          displayOptions={displayOptions}
          setIsFlipped={setIsFlipped}
          data={data}
        />
        {/* Back */}
      </ReactCardFlip>
    </div>
  );
}

const FrontSide = ({ data, setIsFlipped, currentStatus, isDisplayStatus }) => {
  const { term } = data;
  return (
    <div
      onClick={() => {
        setIsFlipped((pre) => !pre);
      }}
      className={`w-full bg-white relative rounded-lg h-full  flex items-center justify-center p-2 border-2 border-slate-400 overflow-hidden `}
    >
      <p className="w-full text-lg break-words text-center font-bold">{term}</p>
      {/* Testing status tag */}
      {isDisplayStatus && (
        <div
          status={currentStatus}
          className={`${styles.statusFlag} absolute bottom-0 right-0 rotate-45 translate-x-1/2 translate-y-1/2 w-5 h-5 `}
        ></div>
      )}
    </div>
  );
};

const BackSide = ({ data, setIsFlipped, displayOptions }) => {
  const { displayImg, displayExample, displayDef2 } = displayOptions;
  const {
    definition_1: definition1,
    definition_2: definition2,
    image_url: imageUrl,
    example,
  } = data;
  return (
    <div
      className={`bg-white relative border-2 rounded-lg border-slate-400 flex flex-col items-center justify-center w-full h-full`}
    >
      {/* Back side background */}
      {/* Show image */}
      {imageUrl && displayImg && (
        <div className="absolute top-[60%] right-1/2 translate-x-1/2 -translate-y-full w-32 h-32 flex items-center justify-center">
          <Image
            fill
            sizes={"80px"}
            alt={`card-image`}
            style={{ objectFit: "fill", borderRadius: "8px" }}
            src={imageUrl}
          />
        </div>
      )}
      {/* Absolute container */}
      <div
        onClick={() => {
          setIsFlipped((pre) => !pre);
        }}
        className="absolute top-0 left-0 h-full w-full"
      >
        {displayDef2 && (
          <p className="absolute top-0 left-0 right-0 py-1 text-center">
            {definition2}
          </p>
        )}
        <p className="absolute top-[60%] left-0 right-0 pt-2 text-center text-blue-600 font-semibold">
          {definition1}
        </p>
        {displayExample && (
          <p className="absolute top-[80%] left-0 right-0 text-center">
            {example}
          </p>
        )}
      </div>
    </div>
  );
};
