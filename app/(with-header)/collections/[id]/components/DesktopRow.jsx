import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/20/solid";

import { TextareaAutosize } from "@mui/base";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import Spinner from "@public/assets/icons/MySpinner";

export default function DesktopRow({
  cardData,
  displayImg,
  displayDef2,
  displayExample,
  onDeleteRow,
  onUpdateRow,
  rowIndex,
  isOwner,
}) {
  // States
  // Fetched data
  // Local data
  const totalCol =
    3 +
    (displayImg ? 1 : 0) +
    (displayDef2 ? 1 : 0) +
    (displayExample ? 1 : 0) +
    (isOwner ? 1 : 0);
  const [editting, setEditting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [editted, setEditted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const order = rowIndex + 1;
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
  const handleDelete = () => {};
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
    setErrMsg("");
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
    case 3:
      rowItemsGridTemp = styles.rowItemsGridCol3;
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
          {order}
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
              className={styles.autoSizeTextArea}
              value={definition1}
              onChange={(e) => {
                setDefition1(e.target.value);
              }}
            />
          )}
          {!editting && (
            <p className="break-words w-full">{cardData.definition_1}</p>
          )}
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
                onChange={(e) => {
                  setDefition2(e.target.value);
                }}
                value={definition2 || ""}
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
                className={styles.autoSizeTextArea}
                value={example || ""}
                onChange={(e) => {
                  setExample(e.target.value);
                }}
              />
            )}
            {!editting && <p className="break-all">{cardData.example}</p>}
          </li>
        )}
        {/* Card Image */}
        {displayImg && (
          <li datafield="image" className={`${styles.rowItem} relative`}>
            {!editting && cardData.image_url && (
              <div className="relative w-12 h-12">
                <Image
                  sizes="80px"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={cardData.image_url}
                />
              </div>
            )}
            {!editting && !cardData.image_url && (
              <div className="relative w-12 h-12">
                <Image
                  sizes="40px"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="card-image"
                  src={"/assets/images/uni-placeholder-image.png"}
                />
              </div>
            )}
            {editting && (
              <>
                {selectedFileUrl && (
                  <div className="relative w-12 h-12">
                    <Image
                      sizes="40px"
                      fill
                      style={{ objectFit: "contain" }}
                      alt="card-image"
                      src={selectedFileUrl}
                    />
                  </div>
                )}
                {!selectedFileUrl && cardData.image_url && (
                  <div className="relative w-12 h-12">
                    <Image
                      fill
                      sizes="40px"
                      style={{ objectFit: "contain" }}
                      alt="card-image"
                      src={cardData.image_url}
                    />
                  </div>
                )}
                {!selectedFileUrl && !cardData.image_url && (
                  <div className="relative w-12 h-12">
                    <Image
                      sizes="40px"
                      fill
                      style={{ objectFit: "contain" }}
                      alt="card-image"
                      src={"/assets/images/uni-placeholder-image.png"}
                    />
                  </div>
                )}
              </>
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
                    handleSelectedImage({
                      selectedFile: e.target.files[0],
                      inputTarget: e.target.value,
                      setErrMsg,
                      setSelectedFile,
                      setSelectedFileUrl,
                      setLoadingImage,
                    });
                  }}
                />
                <label
                  className="cursor-pointer absolute top-1/2 -translate-y-1/2  left-1/2 translate-x-1/2 p-2"
                  htmlFor={cardData.id}
                >
                  <DocumentArrowUpIcon className="h-6 w-6 text-blue-500" />
                </label>
                {loadingImage && (
                  <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner className="animate-spin h-6 w-6 text-blue-700" />
                  </label>
                )}
              </>
            )}
          </li>
        )}
        {/* Edit button */}
        {isOwner && (
          <li
            className={`${styles.rowItem} flex items-center justify-center space-x-4`}
          >
            {!editting && (
              <>
                <button
                  title="Edit"
                  className="flex items-center"
                  onClick={() => {
                    !loading && handleEdit();
                  }}
                >
                  {loading ? (
                    <CloudArrowUpIcon
                      title="Uploading please wait."
                      className="h-5 w-5 text-blue-600 animate-bounce cursor-default"
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
                  disabled={loadingImage}
                  title="Delete"
                  className="flex items-center"
                  onClick={() => {
                    onDeleteRow(cardData.id);
                  }}
                >
                  <TrashIcon className="h-5 w-5 text-red-400" />
                </button>
                <button
                  disabled={loadingImage}
                  title="Save"
                  className="flex items-center"
                  onClick={() => {
                    const validTerm = term.trim();
                    if (!validTerm) {
                      setErrMsg("Term is required.");
                    } else {
                      handleUpdate(cardData.id);
                    }
                  }}
                >
                  <CheckCircleIcon
                    className={`h-6 w-6  ${
                      loadingImage || !term ? "text-blue-300" : "text-blue-500"
                    }`}
                  />
                </button>
              </>
            )}
          </li>
        )}
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
