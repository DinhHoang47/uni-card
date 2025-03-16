"use client";
import Image from "next/image";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function MobileCardLearn({ data, displayOptions }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="h-[270px] mx-2 rounded-lg cursor-pointer">
      <ReactCardFlip
        flipDirection="horizontal"
        isFlipped={isFlipped}
        containerStyle={{ height: "100%", borderRadius: "8px" }}
      >
        {/* Front */}
        <div
          onClick={() => {
            setIsFlipped((pre) => !pre);
          }}
          className="rounded-lg h-full w-full bg-white flex items-center justify-center p-10 border border-slate-400"
        >
          <div className="text-4xl font-bold">{data.term}</div>
          <div className="absolute bottom-0 right-0 -translate-x-1 ">
            <p className="text-xs text-gray-400">Flip</p>
          </div>
        </div>
        {/* Back */}
        <BackSide
          data={data}
          setIsFlipped={setIsFlipped}
          displayOptions={displayOptions}
        />
      </ReactCardFlip>
    </div>
  );
}

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
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-full w-32 h-32 flex items-center justify-center">
          <Image
            fill
            sizes={"128px"}
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
        className={`absolute top-0 left-0 h-full w-full`}
      >
        {displayDef2 && (
          <p className="absolute top-0 left-0 right-0 py-1 text-center">
            {definition2}
          </p>
        )}
        <p className="absolute top-[60%] left-0 right-0 pt-2 text-center text-blue-600 font-semibold text-2xl">
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
