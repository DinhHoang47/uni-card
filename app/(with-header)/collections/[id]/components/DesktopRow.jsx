import Image from "next/image";
import { useEffect, useState } from "react";

import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config";

import styles from "./styles.module.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/20/solid";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { TextareaAutosize } from "@mui/base";

export default function DesktopRow({
  cardData,
  displayImg,
  displayDef2,
  displayExample,
  onDeleteRow,
  onUpdateRow,
}) {
  // States
  // Fetched data
  // Local data
  const totalCol =
    4 + (displayImg ? 1 : 0) + (displayDef2 ? 1 : 0) + (displayExample ? 1 : 0);
  const [editting, setEditting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [editted, setEditted] = useState(false);
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
      await onUpdateRow(cardId, { data: "Input data" });
    }
    setEditting(false);
  };
  const handleDelete = () => {};
  //Set editting if info changed
  useEffect(() => {
    if (
      term !== cardData.term ||
      definition1 !== cardData.definition_1 ||
      definition2 !== cardData.definition_2 ||
      example !== cardData.example
    ) {
      setEditted(true);
    } else {
      setEditted(false);
    }
  }, [term, definition1, definition2, example, selectedFileUrl]);
  // Dynamic variable
  let rowItemsGridTemp;
  switch (totalCol) {
    case 7:
      rowItemsGridTemp = styles.rowItemsGridFull;
      break;
    case 6:
      rowItemsGridTemp = styles.rowItemsGridCol6;
      break;
    case 5:
      rowItemsGridTemp = styles.rowItemsGridCol5;
      break;
    case 4:
      rowItemsGridTemp = styles.rowItemsGridCol4;
      break;
    default:
      rowItemsGridTemp = styles.rowItemsGridColUnset;
      break;
  }
  return (
    <li className={`${styles.row}`}>
      <ul
        className={`${styles.rowItems} ${rowItemsGridTemp} ${
          editting ? styles.edittingRow : ""
        }`}
      >
        {/* Order */}
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          1
        </li>
        {/* Term */}
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          {editting ? (
            <TextareaAutosize
              maxLength={225}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              className={styles.autoSizeTextArea}
            />
          ) : (
            <p className="break-all">{cardData.term}</p>
          )}
        </li>
        {/* Def 1 */}
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          {editting && (
            <TextareaAutosize
              maxLength={225}
              defaultValue={cardData.definition_1}
              className={styles.autoSizeTextArea}
            />
          )}
          {!editting && <span>{cardData.definition_1}</span>}
        </li>
        {/* Def 2 */}
        {displayDef2 && (
          <li
            className={`${styles.rowItem} ${
              editting ? styles.edittingItem : ""
            }`}
          >
            {editting && (
              <TextareaAutosize
                maxLength={225}
                defaultValue={cardData.definition_2}
                className={styles.autoSizeTextArea}
              />
            )}
            {!editting && <p className="break-all">{cardData.definition_2}</p>}
          </li>
        )}
        {/* Example */}
        {displayExample && (
          <li
            className={`${styles.rowItem} ${
              editting ? styles.edittingItem : ""
            }`}
          >
            {editting && (
              <TextareaAutosize
                maxLength={225}
                defaultValue={cardData.example}
                className={styles.autoSizeTextArea}
              />
            )}
            {!editting && <p className="break-all">{cardData.example}</p>}
          </li>
        )}

        {/* Card Image */}
        {displayImg && (
          <li datafield="image" className={`${styles.rowItem} relative`}>
            {cardData.image_url && (
              <div className="relative w-12 h-12 border border-gray-300 rounded-sm">
                <Image
                  fill
                  sizes="40px"
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={cardData.image_url}
                />
              </div>
            )}
            {!cardData.image_url && !selectedFileUrl && (
              <div className="relative w-12 h-12 border border-gray-300 rounded-sm">
                <Image
                  sizes="40px"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={"/assets/images/uni-placeholder-image.png"}
                />
              </div>
            )}
            {!cardData.image_url && selectedFileUrl && (
              <div className="relative w-12 h-12 border border-gray-300 rounded-sm">
                <Image
                  sizes="40px"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={selectedFileUrl}
                />
              </div>
            )}
            {editting && (
              <>
                <input
                  multiple={false}
                  type="file"
                  accept="image/*"
                  hidden
                  id={cardData.id}
                  onChange={(e) => {
                    handleFileChange(
                      e,
                      setErrMsg,
                      setSelectedFile,
                      setSelectedFileUrl
                    );
                  }}
                />
                <label
                  className="cursor-pointer absolute top-1/2 -translate-y-1/2  left-1/2 translate-x-1/2 p-2"
                  htmlFor={cardData.id}
                >
                  <DocumentArrowUpIcon className="h-6 w-6 text-blue-500" />
                </label>
              </>
            )}
          </li>
        )}
        <li className={`${styles.rowItem}`}>
          {!editting && (
            <>
              <button
                title="Edit"
                className="flex items-center"
                onClick={() => {
                  !cardData.uploading && handleEdit();
                }}
              >
                {cardData.uploading ? (
                  <CloudArrowUpIcon
                    title="Uploading please wait."
                    className="h-5 w-5 text-blue-600 animate-bounce cursor-wait"
                  />
                ) : (
                  <PencilIcon className="h-5 w-5 text-blue-500" />
                )}
              </button>
            </>
          )}
          {editting && (
            <>
              <button
                title="Delete"
                className="flex items-center"
                onClick={() => {
                  onDeleteRow(cardData.id);
                }}
              >
                <TrashIcon className="h-5 w-5 text-red-400" />
              </button>
              <button
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
        </li>
      </ul>
      {/* Error message */}
      {errMsg !== "" && (
        <div className="px-4 flex space-x-2 justify-end">
          <p className="text-end text-red-400">{errMsg}</p>
          <button
            className="text-gray-700 text-sm hover:underline"
            onClick={() => {
              setErrMsg("");
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </li>
  );
}

const handleFileChange = (
  e,
  setErrMsg,
  setSelectedFile,
  setSelectedFileUrl
) => {
  // Set selected file
  setErrMsg("");
  if (!e.target.files[0]) return;
  const currentFile = e.target.files[0];
  const maxSizeInBytes = MAX_COLLECTION_IMG_SIZE;
  if (currentFile && currentFile.size > maxSizeInBytes) {
    setErrMsg(
      `Maximum image size is ${MAX_COLLECTION_IMG_SIZE_TEXT}.Try again`
    );
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
