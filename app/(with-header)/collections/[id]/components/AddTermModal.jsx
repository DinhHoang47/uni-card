"use client";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextareaAutosize } from "@mui/base";
import { v4 as uuid } from "uuid";

import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config";
import Image from "next/image";
import { useCard } from "@lib/useCard";
import { uploadImage } from "@services/CldService";
import { generateUniqueName } from "@utils/generateUniqueName";
import { privateCollectionServ } from "@services/Private_CollectionService";
import { Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMessage } from "@redux/commonMessageSlice.js";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import Spinner from "@public/assets/icons/spinner";

export default function AddTermModal({
  displayExample,
  displayDef2,
  displayImg,
  setTermModalOpen,
  collectionId,
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
  // -------------------------------------------Common Modal State End--------------------------------------
  // Fetched data
  // Local state
  const [coutinueInput, setContinueInput] = useState(false);
  const fileInputRef = useRef(null);
  const [loadingImage, setLoadingImage] = useState(false);
  // Input data
  const [term, setTerm] = useState("");
  const [definition1, setDefinition1] = useState("");
  const [definition2, setDefinition2] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [example, setExample] = useState("");
  // State
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  // Handler
  const dispatch = useDispatch();
  const showInputSuccessMsg = () => {
    dispatch(addMessage({ text: "Term added", variation: "success" }));
  };
  const clearInputData = () => {
    setTerm("");
    setDefinition1("");
    setDefinition2("");
    setImageUrl("");
    setSelectedFile(null);
    setSelectedFileUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const { data: cardList, mutate: mutateCardList } = useCard(collectionId);
  const trimmedTerm = term.trim();

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
                  trimmedTerm !== "" ? "" : "text-gray-300"
                }  rounded border-slate-400 h-20 sm:h-24 w-32 sm:w-40 flex items-center justify-center`}
              >
                <p className="w-full text-center break-words whitespace-pre-line max-h-full overflow-y-auto text-sm font-semibold">
                  {trimmedTerm !== "" ? trimmedTerm : "Term"}
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
                      src={"/assets/images/uni-placeholder-image.png"}
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
                {loadingImage && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner className="w-5 h-5 text-blue-500 animate-spin " />
                  </span>
                )}
                {/* Absolute container */}
                <div
                  className={`absolute top-0 left-0 h-full w-full flex flex-col rounded ${
                    !displayImg ? "justify-center" : "justify-between"
                  } items-center text-[0.75rem]  py-1 `}
                >
                  {displayDef2 ? (
                    <p
                      className={`${
                        definition2 !== "" ? "" : "text-gray-300 "
                      }  max-w-full break-words line-clamp-3 `}
                    >
                      {definition2 !== "" ? definition2 : "Definition 2"}
                    </p>
                  ) : (
                    <div></div>
                  )}

                  <div className="w-full text-center">
                    <p
                      className={`${
                        definition1 !== "" ? "" : "text-gray-300"
                      } max-w-full break-words line-clamp-4 text-[0.75rem]  font-semibold`}
                    >
                      {definition1 !== "" ? definition1 : "Definition"}
                    </p>
                    {displayExample ? (
                      <p
                        className={`${
                          example !== "" ? "" : "text-gray-300"
                        } max-w-full break-words line-clamp-3 text-[0.5rem]`}
                      >
                        {example !== "" ? example : "Example"}
                      </p>
                    ) : (
                      <>{displayImg && <div className="mb-3"></div>}</>
                    )}
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
              value={term}
              placeholder="Input term"
              onChange={(e) => {
                setTerm(e.target.value);
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
              value={definition1}
              placeholder="Input definition"
              onChange={(e) => {
                setDefinition1(e.target.value);
              }}
              maxLength={225}
              wrap="hard"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Definition 2 */}
          {displayDef2 && (
            <div className="space-y-1 ">
              <label className="">Definition 2</label>
              <TextareaAutosize
                onChange={(e) => {
                  setDefinition2(e.target.value);
                }}
                value={definition2}
                maxLength={225}
                placeholder="E.g.Pronounciation"
                maxRows={2}
                wrap="hard"
                className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
              ></TextareaAutosize>
            </div>
          )}
          {/* Example */}
          {displayExample && (
            <div className="space-y-1 ">
              <label className="">Example</label>
              <TextareaAutosize
                placeholder="Input example"
                onChange={(e) => {
                  setExample(e.target.value);
                }}
                value={example}
                maxLength={225}
                wrap="hard"
                className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
              ></TextareaAutosize>
            </div>
          )}

          {/* Image upload */}
          {displayImg && (
            <div className="space-y-1 flex flex-col ">
              <label className="">Image</label>
              <input
                ref={fileInputRef}
                onChange={(e) => {
                  handleSelectedImage({
                    selectedFile: e.target.files[0],
                    inputTarget: e.target.value,
                    setErrMsg,
                    setSelectedFile,
                    setSelectedFileUrl,
                    setLoadingImage,
                  });
                }}
                type="file"
                name="image"
                accept="image/*"
                multiple={false}
              />
            </div>
          )}
          {/* Continue Input Switch */}
          <div className="space-y-1 ">
            <label className="">Continue to input</label>
            <Switch
              checked={coutinueInput}
              onChange={() => {
                setContinueInput((pre) => !pre);
              }}
            />
          </div>
          {/* Error Message */}
          <div className="">
            <p className="text-red-500 text-sm">{errMsg}</p>
          </div>
          {/* Submit button */}
          <button
            disabled={!trimmedTerm || loadingImage}
            onClick={(e) => {
              e.preventDefault();
              handleAddNew(
                {
                  term,
                  definition1,
                  definition2,
                  example,
                  imageUrl,
                },
                mutateCardList,
                cardList,
                selectedFile,
                collectionId,
                selectedFileUrl,
                showInputSuccessMsg,
                setTermModalOpen,
                coutinueInput,
                clearInputData
              );
            }}
            className={`!mt-4 w-full h-10 text-white font-semibold rounded-md ${
              !trimmedTerm || loadingImage ? "bg-blue-400" : "bg-blue-600"
            }`}
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

const handleAddNew = async (
  inputData,
  mutateCardList,
  cardList,
  selectedFile,
  collectionId,
  selectedFileUrl,
  showInputSuccessMsg,
  setTermModalOpen,
  continueInput,
  clearInputData
) => {
  const { term, definition1, definition2, example, imageUrl } = inputData;
  // Trim input data
  const trimmedTerm = term.trim();
  const trimmedDef1 = definition1.trim();
  const trimmedDef2 = definition2.trim();
  const trimmedEx = example.trim();
  // Check if term is valid
  if (trimmedTerm === "") return;
  const optimisticNewCardData = {
    id: uuid(),
    term: trimmedTerm,
    definition_1: trimmedDef1,
    definition_2: trimmedDef2,
    example: trimmedEx,
    image_url: selectedFileUrl,
    uploading: true,
  };
  const newCardData = {
    term: trimmedTerm,
    definition_1: trimmedDef1,
    definition_2: trimmedDef2,
    example: trimmedEx,
  };
  const options = {
    optimisticData: [...cardList, optimisticNewCardData],
    rollbackOnError(error) {
      // If it's timeout abort error, don't rollback
      return error.name !== "AbortError";
    },
    revalidate: false,
  };
  mutateCardList(
    updateFn(cardList, newCardData, selectedFile, collectionId),
    options
  );
  // Close modal if not set continue input
  !continueInput && setTermModalOpen(false);
  showInputSuccessMsg();
  clearInputData();
};

const updateFn = async (
  oldCardList,
  newCardData,
  selectedFile,
  collectionId
) => {
  const { term, definition_1, definition_2, example } = newCardData;
  let imageUrl = null;
  // Upload image
  if (selectedFile) {
    // Generate publicid from term
    const publicId = generateUniqueName(term.slice(0, 10));
    const uploadPreset = "card_image";
    imageUrl = await uploadImage(selectedFile, publicId, uploadPreset)
      .then((res) => res.data.secure_url)
      .catch((err) => {
        // If upload fail set image as default error url
        return "https://res.cloudinary.com/unicard/image/upload/v1697537672/cards/fail-to-upload.png";
      });
  }
  const dataToSend = {
    term: term,
    definition_1: definition_1,
    definition_2: definition_2,
    example: example,
    image_url: imageUrl,
  };

  const fetchedCard = await privateCollectionServ
    .createCard(collectionId, dataToSend)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error();
    });
  return [...oldCardList, fetchedCard];
};
