"use client";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextareaAutosize } from "@mui/base";

import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config";
import Image from "next/image";

export default function AddTermModal({
  displayDef2,
  displayImg,
  setTermModalOpen,
  isTermModalOpen,
}) {
  // -------------------------------------------Common Modal State--------------------------------------
  // Handle dynamic size for modal start
  const childrenRef = useRef(null);
  const [childHeight, setChildHeight] = useState();
  const [childWidth, setChildWidth] = useState();
  useEffect(() => {
    setChildHeight(childrenRef.current.offsetHeight);
    setChildWidth(childrenRef.current.offsetWidth);
  }, [childHeight, childWidth]);
  // Handle dynamic size for modal end
  const cardDataSchema = {
    term: "",
    define_1: "",
    define_2: "",
    image: "",
    example: "",
  };
  const [cardData, setCardData] = useState(cardDataSchema);

  // Disable scrollbar after render modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTermModalOpen]);
  // -------------------------------------------Common Modal State End--------------------------------------

  const [selectedFile, setSelectedFile] = useState(null);
  // Loading and Error message state
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  return (
    <PortalModalWrapper childrenHeight={childHeight} childrenWidth={childWidth}>
      {/* Main Container */}
      <div ref={childrenRef} className="bg-white relative rounded-md p-6">
        <h3 className="font-semibold text-xl text-center">Add Term</h3>
        {/* Preview*/}
        <div className=" space-y-2 ">
          <h4 className="">Preview</h4>
          <div className="flex px-0 sm:px-2 space-x-2 justify-around">
            {/* Front review */}
            <div className="space-y-1">
              <div
                className={`border-2 ${
                  cardData.term !== "" ? "" : "text-gray-300"
                }  rounded border-slate-400 h-20 sm:h-24 w-32 sm:w-40 flex items-center justify-center`}
              >
                <p className="w-full text-center break-words whitespace-pre-line max-h-full overflow-y-auto text-sm font-semibold">
                  {cardData.term !== "" ? cardData.term : "Term"}
                </p>
              </div>
              <div className="text-center text-sm">Front</div>
            </div>
            {/* Back preview */}
            <div className="space-y-1">
              <div className="relative border-2 rounded border-slate-400 h-20 sm:h-24 w-32 sm:w-40 flex flex-col items-center justify-center">
                {/* Back side background */}
                {/* Show image */}
                {displayImg && !selectedFileUrl && (
                  <div className="w-4 sm:w-10 h-4 sm:h-8 flex items-center justify-center mb-4">
                    <Image
                      alt={`card-image`}
                      style={{ width: "100%", height: "100%" }}
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={"/assets/images/placeholder-image.jpg"}
                    />
                  </div>
                )}
                {/*Show Selected image */}
                {displayImg && selectedFileUrl && (
                  <div className="w-4 sm:w-10 h-4 sm:h-8 flex items-center justify-center mb-4">
                    <Image
                      className="opacity-80"
                      alt={`collection-image`}
                      style={{ width: "100%", height: "100%" }}
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={selectedFileUrl}
                    />
                  </div>
                )}
                {/* Absolute container */}
                <div
                  className={`absolute top-0 left-0 h-full w-full flex flex-col rounded justify-between items-center text-[0.75rem]  py-1 `}
                >
                  {displayDef2 ? (
                    <p
                      className={`${
                        cardData.define_2 !== "" ? "" : "text-gray-300 "
                      }  max-w-full break-words line-clamp-3 `}
                    >
                      {cardData.define_2 !== ""
                        ? cardData.define_2
                        : "Definition 2"}
                    </p>
                  ) : (
                    <div></div>
                  )}

                  <div className="w-full text-center">
                    <p
                      className={`${
                        cardData.define_1 !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-4 text-[0.75rem]  font-semibold`}
                    >
                      {cardData.define_1 !== ""
                        ? cardData.define_1
                        : "Definition"}
                    </p>
                    <p
                      className={`${
                        cardData.example !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-3 text-[0.5rem]`}
                    >
                      {cardData.example !== "" ? cardData.example : "Example"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm">Back</div>
            </div>
          </div>
        </div>
        {/* Data Input Section */}
        <form className="space-y-2">
          {/* Term */}
          <div className="space-y-1 ">
            <label className="">Term</label>
            <TextareaAutosize
              placeholder="Input term"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, term: e.target.value }));
              }}
              maxRows={2}
              maxLength={50}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Definition */}
          <div className="space-y-1 ">
            <label className="">Definition</label>
            <TextareaAutosize
              placeholder="Input definition"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, define_1: e.target.value }));
              }}
              maxLength={225}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Pronounce */}
          {displayDef2 && (
            <div className="space-y-1 ">
              <label className="">Definition 2</label>
              <TextareaAutosize
                placeholder="E.g.Pronounciation"
                onChange={(e) => {
                  setCardData((pre) => ({ ...pre, define_2: e.target.value }));
                }}
                maxRows={2}
                maxLength={225}
                wrap="hard"
                className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
              ></TextareaAutosize>
            </div>
          )}
          {/* Example */}
          <div className="space-y-1 ">
            <label className="">Example</label>
            <TextareaAutosize
              placeholder="Input example"
              onChange={(e) => {
                setCardData((pre) => ({ ...pre, example: e.target.value }));
              }}
              maxLength={225}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Image upload */}
          {displayImg && (
            <div className="space-y-1 flex flex-col ">
              <label className="">Image</label>
              <input
                onChange={(e) => {
                  handleFileChange(
                    e,
                    setSelectedFile,
                    setErrMsg,
                    setSelectedFileUrl
                  );
                }}
                type="file"
                name="image"
                accept="image/*"
                multiple={false}
              />
            </div>
          )}

          {/* Error Message */}
          <div className="">
            <p className="text-red-500 text-sm">{errMsg}</p>
          </div>
          {/* Submit button */}
          <button
            className="!mt-8 w-full h-10 bg-blue-600 text-white font-semibold rounded-md"
            type="submit"
          >
            Add
          </button>
        </form>

        {/* Close btn */}
        <button
          onClick={() => {
            setTermModalOpen(false);
          }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}

const handleFileChange = (
  e,
  setSelectedFile,
  setErrMsg,
  setSelectedFileUrl
) => {
  // Set selected file
  setErrMsg("");
  if (!e.target.files[0]) return;
  const currentFile = e.target.files[0];
  const maxSizeInBytes = MAX_COLLECTION_IMG_SIZE;
  if (currentFile && currentFile.size > maxSizeInBytes) {
    setErrMsg(`Maximum image size is ${MAX_COLLECTION_IMG_SIZE_TEXT}.`);
    e.target.value = null;
  } else {
    setSelectedFile(currentFile);
    // Get and set selected file local url
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFileUrl(e.target.result);
    };
    reader.readAsDataURL(currentFile);
  }
};
