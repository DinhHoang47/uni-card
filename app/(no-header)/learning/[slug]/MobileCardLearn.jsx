"use client";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function MobileCardLearn() {
  const [isFlipped, setIsFlipped] = useState(false);
  const haveDefine2 = true;
  const haveImage = false;
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
          className="rounded-lg h-full bg-white flex items-center justify-center p-10 border border-slate-400"
        >
          <div className="text-4xl">漢字</div>
          <div className="absolute bottom-0 right-0 -translate-x-1 ">
            <p className="text-xs text-gray-400">Flip</p>
          </div>
        </div>
        {/* Back */}
        <div
          onClick={() => {
            setIsFlipped((pre) => !pre);
          }}
          className="relative w-full h-full rounded bg-white p-2 border border-slate-400"
        >
          {/* Back side background */}
          {haveImage ? (
            <div
              style={{
                backgroundImage: `url(${`/assets/images/samurai_cartoon.jpg`})`,
                backgroundSize: `160px 160px`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `center`,
              }}
              className={`h-full opacity-70 flex items-center`}
            ></div>
          ) : (
            <></>
          )}

          {/* Absolute container */}
          <div
            className={`absolute top-0 left-0 h-full w-full flex flex-col rounded p-2 ${
              haveImage ? "justify-between" : ""
            }`}
          >
            {haveDefine2 ? (
              <div className=" text-gray-700 bg-white bg-opacity-90">
                <p className="text-center text-xl">KANJI</p>
              </div>
            ) : (
              <></>
            )}
            <div
              className={`text-gray-950  bg-white bg-opacity-70 space-y-1 ${
                haveDefine2 ? "pb-4" : ""
              } ${!haveImage ? "flex flex-col h-full justify-center" : ""} `}
            >
              <p className="text-center text-2xl font-semibold">Define</p>
              <p className="text-center text-sm">Example</p>
            </div>
          </div>
          {/* Status */}
          <div className="absolute bottom-0 right-0 -translate-x-1 ">
            <p className="text-xs text-gray-400">Flip</p>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
