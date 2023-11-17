"use client";
import Image from "next/image";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function MobileCardLearn({ data, displayOptions }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="h-60 mx-2 rounded-lg cursor-pointer">
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
          <div className="text-2xl">{data.term}</div>
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
        <div className="absolute top-0 right-0 w-12 h-12 mr-8 mt-8 flex items-center justify-center mb-4">
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
        } items-center px-4 ${
          (displayDef2 || definition2) &&
          (displayExample || example) &&
          (!imageUrl || !displayImg)
            ? "py-8"
            : "py-4"
        } `}
      >
        {definition2 && displayDef2 ? (
          // break-words
          <p
            className={`${
              definition2 !== "" ? "" : "text-gray-300 "
            }  max-w-full break-words line-clamp-3 bg-transparent-white-07 text-center text-lg`}
          >
            {definition2}
          </p>
        ) : (
          <>{displayImg && imageUrl && <div></div>}</>
        )}

        <div className="w-full text-center">
          <p className={`break-words bg-transparent-white-07 text-lg`}>
            {definition1}
          </p>
          {example && displayExample ? (
            <p
              className={`${
                example !== "" ? "" : "text-gray-300"
              } max-w-full break-words line-clamp-3 bg-transparent-white-07 w-full mt-3 italic`}
            >
              {example}
            </p>
          ) : (
            <>{imageUrl && <div className="mb-3"></div>}</>
          )}
        </div>
      </div>
    </div>
  );
};
