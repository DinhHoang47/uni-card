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
    <div className="h-40 rounded-lg cursor-pointer ">
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
      <p className="w-full text-xl break-words text-center font-medium">
        {term}
      </p>
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
        <div className="absolute top-0 right-0 w-10 h-10 mr-2 mt-2 flex items-center justify-center mb-4">
          <Image
            fill
            sizes={"80px"}
            alt={`card-image`}
            style={{ objectFit: "contain" }}
            src={imageUrl}
          />
        </div>
      )}
      {/* Absolute container */}
      <div
        onClick={() => {
          setIsFlipped((pre) => !pre);
        }}
        className={`absolute top-0 left-0 h-full w-full flex flex-col rounded ${
          (!imageUrl || !displayImg) && (!displayDef2 || !definition2)
            ? "justify-center"
            : "justify-around"
        } items-center text-[0.75rem]  p-2 `}
      >
        {definition2 && displayDef2 ? (
          // break-words
          <p
            className={`${definition2 !== "" ? "" : "text-gray-300 "} ${
              displayImg && imageUrl ? "" : ""
            } text-lg break-words line-clamp-3 bg-transparent-white-07 text-center`}
          >
            {definition2 !== "" ? definition2 : "Definition 2"}
          </p>
        ) : (
          <>{displayImg && imageUrl && <div></div>}</>
        )}

        <div className="w-full text-center space-y-2">
          <p
            className={`max-w-full break-words line-clamp-4 text-lg bg-transparent-white-07`}
          >
            {definition1}
          </p>
          {example && displayExample ? (
            <p
              className={`${
                example !== "" ? "" : "text-gray-300"
              } max-w-full break-words line-clamp-3 text-xs bg-transparent-white-07`}
            >
              {example !== "" ? example : "Example"}
            </p>
          ) : (
            <>{imageUrl && <div className="mb-3"></div>}</>
          )}
        </div>
      </div>
    </div>
  );
};
