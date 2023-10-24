"use client";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styles from "../../styles.module.css";
import Image from "next/image";

export default function CardLearn({ data, displayOptions }) {
  // Local state
  const [isFlipped, setIsFlipped] = useState(false);
  // const haveDefine2 = true;
  return (
    <div className="h-40 rounded-lg cursor-pointer ">
      <ReactCardFlip
        flipDirection="vertical"
        isFlipped={isFlipped}
        containerStyle={{ height: "100%", borderRadius: "8px" }}
      >
        {/* Front */}
        <FrontSide data={data} setIsFlipped={setIsFlipped} />
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

const FrontSide = ({ data, setIsFlipped }) => {
  const { term } = data;
  return (
    <div
      onClick={() => {
        setIsFlipped((pre) => !pre);
      }}
      className={`w-full bg-white relative rounded-lg h-full  flex items-center justify-center p-2 border border-slate-400 `}
    >
      <p className="w-full text-xl break-words text-center font-semibold">
        {term}
      </p>
      {/* Testing status tag */}
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
      className={`bg-white relative border rounded-lg border-slate-400 flex flex-col items-center justify-center w-full h-full`}
    >
      {/* Back side background */}
      {/* Show image */}
      {imageUrl && displayImg && (
        <div className="relative w-14 h-14 flex items-center justify-center mb-4">
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
            : "justify-between"
        } items-center text-[0.75rem]  p-2 `}
      >
        {definition2 && displayDef2 ? (
          // break-words
          <p
            className={`${
              definition2 !== "" ? "" : "text-gray-300 "
            }  max-w-full break-words line-clamp-3 bg-transparent-white-07 text-center`}
          >
            {definition2 !== "" ? definition2 : "Definition 2"}
          </p>
        ) : (
          <>{displayImg && imageUrl && <div></div>}</>
        )}

        <div className="w-full text-center">
          <p
            className={`max-w-full break-words line-clamp-4 ${`text-base`}  bg-transparent-white-07 font-semibold`}
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

const BackSide1 = () => {
  return (
    <div
      onClick={() => {
        setIsFlipped((pre) => !pre);
      }}
      className="relative overflow-hidden w-full h-full rounded bg-white p-2 border border-slate-400"
    >
      {/* Back side background */}
      <div
        style={{
          backgroundImage: `url(${``})`,
          backgroundSize: `160px 160px`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`,
        }}
        className={`h-full opacity-70 flex items-center`}
      ></div>
      {/* Absolute container */}
      <div
        className={`absolute top-0 left-0 h-full w-full flex flex-col ${
          haveDefine2 ? "justify-between" : "justify-center"
        } rounded p-2`}
      >
        {haveDefine2 ? (
          <div className=" text-gray-700 bg-white bg-opacity-90">
            <p className="text-center">{data.definition_2}</p>
          </div>
        ) : (
          <></>
        )}

        <div
          className={`text-gray-950  bg-white bg-opacity-70 space-y-1 ${
            haveDefine2 ? "pb-4" : ""
          } `}
        >
          <p className="text-center">{data.definition_1}</p>
          <p className="text-center text-sm">{data.example}</p>
        </div>
      </div>
    </div>
  );
};
