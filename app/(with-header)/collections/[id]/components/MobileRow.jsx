import Image from "next/image";
import styles from "./styles.module.css";
import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/20/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/20/solid";

import { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import Spinner from "@public/assets/icons/MySpinner";
import TextToSpeech from "@components/TextToSpeech/TextToSpeech";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function MobileRow({
  cardData,
  displayImg,
  displayDef2,
  displayExample,
  onDeleteRow,
  onUpdateRow,
  isOwner,
  languageRef,
}) {
  // Local state
  const [editted, setEditted] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [editting, setEditting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  // Input value
  const [term, setTerm] = useState(cardData.term);
  const [definition1, setDefition1] = useState(cardData.definition_1);
  const [definition2, setDefition2] = useState(cardData.definition_2);
  const [example, setExample] = useState(cardData.example);
  // Handler
  const handleEdit = () => {
    setEditting(true);
  };
  const handleUpdate = async (cardId) => {
    if (editted) {
      await onUpdateRow({
        id: cardId,
        term,
        definition1,
        definition2,
        example,
        selectedFileUrl,
        imageUrl: cardData.image_url,
        selectedFile: selectedFile,
      });
    }
    setSelectedFile(null);
    setSelectedFileUrl(null);
    setErrMsg("");
    setEditting(false);
  };
  const handleDelete = (id) => {
    onDeleteRow(id);
  };

  const cancelEditting = () => {
    setSelectedFile(null);
    setSelectedFileUrl(null);
    setEditting(false);
  };
  //Set editting if info changed
  useEffect(() => {
    if (
      term !== cardData.term ||
      definition1 !== cardData.definition_1 ||
      definition2 !== cardData.definition_2 ||
      example !== cardData.example ||
      selectedFileUrl !== null
    ) {
      setEditted(true);
    } else {
      setEditted(false);
    }
  }, [term, definition1, definition2, example, selectedFileUrl]);
  return (
    <li
      className={`${styles.mobileRow} ${
        editting ? styles.mobileRowEditting : ""
      } relative space-y-2 p-4`}
    >
      {/* Layout: image, right content */}
      <div className="flex">
        {/* Image */}
        <div className="mr-2">
          {/* Image */}
          {displayImg &&
            (cardData.image_url || selectedFileUrl || editting) && (
              <div className={`relative flex items-center`}>
                <div className={`relative w-32 h-32`}>
                  {selectedFileUrl && editting && (
                    <Image
                      priority={false}
                      fill
                      sizes="128px"
                      alt="card-image"
                      className="object-contain"
                      src={selectedFileUrl}
                    />
                  )}
                  {cardData.image_url && !selectedFileUrl && (
                    <Image
                      priority={false}
                      fill
                      sizes="128px"
                      alt="card-image"
                      className="object-contain"
                      src={cardData.image_url}
                    />
                  )}
                  {!cardData.image_url && !selectedFileUrl && (
                    <Image
                      priority={false}
                      fill
                      sizes="128px"
                      alt="card-image"
                      className="object-contain"
                      src={"/assets/images/uni-placeholder-image.png"}
                    />
                  )}
                  {loadingImage && (
                    <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Spinner className="animate-spin h-5 w-5 text-blue-700" />
                    </label>
                  )}
                </div>
                {editting && (
                  <>
                    <input
                      hidden
                      id={cardData.id}
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
                      multiple={false}
                      className="ml-4"
                      accept="image/*"
                      type="file"
                    />
                    <label
                      className="obsolute cursor-pointer"
                      htmlFor={cardData.id}
                    >
                      <DocumentArrowUpIcon className="h-6 w-6 text-blue-600" />
                    </label>
                  </>
                )}
              </div>
            )}
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Term */}
          <div className="flex items-center justify-between">
            {editting && (
              <>
                <TextareaAutosize
                  maxLength={225}
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  className={styles.autoSizeTextArea}
                />
              </>
            )}
            {!editting && (
              <>
                <div className="flex flex-wrap justify-between w-full mr-2">
                  <span className="font-semibold text-2xl flex-auto min-w-0">
                    {cardData.term}
                  </span>
                  <span>{cardData.definition_2}</span>
                </div>
                {languageRef && (
                  <div className="">
                    <TextToSpeech text={cardData.term} lang={languageRef}>
                      <SpeakerWaveIcon className="h-5 w-5 text-gray-500 hover:text-blue-500 cursor-pointer" />
                    </TextToSpeech>
                  </div>
                )}
              </>
            )}
          </div>
          {/* Definition & Example */}
          <div
            className={`flex-1 space-y-1 ${
              editting &&
              (!displayImg || (!cardData.image_url && !selectedFileUrl))
                ? "pb-5"
                : ""
            } `}
          >
            {/* Definition */}
            <div className="flex">
              {editting && (
                <>
                  <TextareaAutosize
                    maxLength={225}
                    value={definition1}
                    onChange={(e) => {
                      setDefition1(e.target.value);
                    }}
                    className={styles.autoSizeTextArea}
                  />
                </>
              )}
              {!editting && (
                <>
                  <span className="text-blue-600 text-xl">
                    {cardData.definition_1}
                  </span>
                </>
              )}
            </div>
            {/* Definition 2*/}
            {displayDef2 && (
              <div className="flex">
                {editting && (
                  <>
                    <TextareaAutosize
                      maxLength={225}
                      onChange={(e) => {
                        setDefition2(e.target.value);
                      }}
                      value={definition2}
                      className={styles.autoSizeTextArea}
                    />
                  </>
                )}
              </div>
            )}
            {/* Example*/}
            {displayExample && (
              <div className="flex">
                {editting && (
                  <>
                    <TextareaAutosize
                      maxLength={225}
                      value={example}
                      onChange={(e) => {
                        setExample(e.target.value);
                      }}
                      className={styles.autoSizeTextArea}
                    />
                  </>
                )}
                {!editting && (
                  <>
                    <span>{cardData.example}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {errMsg && (
        <div className="">
          <p className="text-red-500 text-sm">{errMsg}</p>
        </div>
      )}

      {/* Actions */}
      {isOwner && (
        <div className="absolute top-full right-0 !mt-0 -translate-y-8  flex items-center space-x-4 mr-6">
          {!editting && (
            <>
              <button>
                <PencilIcon
                  onClick={handleEdit}
                  className="h-5 w-5 text-blue-500"
                />
              </button>
            </>
          )}
          {editting && (
            <>
              <button
                onClick={() => {
                  handleDelete(cardData.id);
                }}
              >
                <TrashIcon className="h-5 w-5 text-red-400" />
              </button>
              <button
                disabled={loadingImage}
                title="Save"
                className="flex items-center"
                onClick={() => {
                  handleUpdate(cardData.id);
                }}
              >
                <CheckCircleIcon className="h-6 w-6 text-blue-500" />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}
