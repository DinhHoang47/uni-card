"use client";
import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactCardFlip from "react-card-flip";

export default function CardPreview({ cardData, isOpen, setOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  console.log(cardData);
  const [isFlipped, setIsFlipped] = useState(false);
  const haveImageBg =
    cardData?.image !== undefined &&
    cardData?.image !== null &&
    cardData?.image !== "";

  const haveDefine1 =
    cardData?.define1 !== undefined &&
    cardData?.define1 !== null &&
    cardData?.define1 !== "";

  const haveDefine2 =
    cardData?.define2 !== undefined &&
    cardData?.define2 !== null &&
    cardData?.define2 !== "";

  return (
    <div className={isOpen ? `` : "invisible"}>
      <div
        className={`${
          isOpen ? "opacity-50" : "opacity-0"
        } absolute top-0 left-0 w-screen bg-slate-500 h-screen flex items-center justify-center transition-opacity duration-200 ease-in `}
      ></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in`}
      >
        <div className="w-80 h-52 rounded relative cursor-pointer">
          <ReactCardFlip
            containerStyle={{ height: "100%", borderRadius: "4px" }}
            isFlipped={isFlipped}
          >
            <div
              onClick={() => {
                setIsFlipped((pre) => !pre);
              }}
              className="relative w-full h-full rounded flex items-center justify-center p-10 bg-white border border-slate-400"
            >
              {/* Font side container */}
              <div className="font-semibold text-4xl">{cardData?.term}</div>
              <div className="absolute bottom-0 right-0 -translate-x-1 ">
                <p className="text-xs text-gray-400">Flip</p>
              </div>
            </div>

            {/* Back Side */}

            <div
              onClick={() => {
                setIsFlipped((pre) => !pre);
              }}
              className="relative w-full h-full rounded bg-white p-2 border border-slate-400"
            >
              {/* Back side background */}
              <div
                style={{
                  backgroundImage: `url(${haveImageBg ? cardData.image : ``})`,
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
                    <p className="text-center text-xl">{cardData?.define2}</p>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className={`text-gray-950  bg-white bg-opacity-70 space-y-1 ${
                    haveDefine2 ? "pb-4" : ""
                  } `}
                >
                  <p className="text-center text-2xl font-semibold">
                    {cardData?.define1}
                  </p>
                  <p className="text-center text-sm">{cardData?.examples}</p>
                </div>
              </div>
              {/* Note */}
              <div className="absolute bottom-0 right-0 -translate-x-1 ">
                <p className="text-xs text-gray-400">Flip</p>
              </div>
            </div>
          </ReactCardFlip>
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 w-8 h-8 border-2 border-gray-500 flex items-center justify-center translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
