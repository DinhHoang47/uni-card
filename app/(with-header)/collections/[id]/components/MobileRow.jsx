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

import { useState } from "react";
import { TextareaAutosize } from "@mui/base";

export default function MobileRow({
  cardData: data,
  displayDef2,
  displayImg,
  displayExample,
  onDeleteRow,
}) {
  // Input state
  const initialData = {
    term: data.term,
    definition1: data.definition_1,
    definition2: data.definition_2,
    example: data.example,
    imageUrl: data.image_url,
  };
  const [cardData, setCardData] = useState(initialData);
  // State
  const [editting, setEditting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const handleEdit = () => {
    setEditting(true);
  };
  const handleUpdate = () => {
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
  return (
    <li
      className={`${styles.mobileRow} ${
        editting && styles.mobileRowEditting
      } relative space-y-2 p-4`}
    >
      {/* Term */}
      <div className="flex">
        {editting && (
          <>
            <span className="mr-1 text-gray-300 w-14">Term:</span>
            <TextareaAutosize
              maxLength={225}
              defaultValue={data.term}
              className={styles.autoSizeTextArea}
            />
          </>
        )}
        {!editting && (
          <>
            <span className="mr-1 text-gray-300 w-14">Term:</span>
            <span className="font-semibold">{data.term}</span>
          </>
        )}
      </div>
      {/* Definition & Example */}
      <div
        className={`space-y-1 ${
          !displayImg || (!data.image_url && !selectedFileUrl) ? "pb-5" : ""
        } `}
      >
        {/* Definition */}
        <div className="flex">
          {editting && (
            <>
              <span className="mr-1 text-gray-300 w-14">Def:</span>
              <TextareaAutosize
                maxLength={225}
                defaultValue={data.definition1}
                className={styles.autoSizeTextArea}
              />
            </>
          )}
          {!editting && (
            <>
              <span className="mr-1 text-gray-300 w-14">Def:</span>
              <span>{data.definition1}</span>
            </>
          )}
        </div>
        {/* Definition 2*/}
        {displayDef2 && (
          <div className="flex justify-between">
            {editting && (
              <>
                <span className="mr-1 text-gray-300 w-14">Def 2:</span>
                <TextareaAutosize
                  maxLength={225}
                  defaultValue={data.definition2}
                  className={styles.autoSizeTextArea}
                />
              </>
            )}
            {!editting && (
              <>
                <span className="mr-1 text-gray-300 w-14">Def 2:</span>
                <span>{data.definition2}</span>
              </>
            )}
          </div>
        )}
        {/* Example*/}
        {displayExample && (
          <div className="flex justify-between">
            {editting && (
              <>
                <span className="mr-1 text-gray-300 w-14">Ex:</span>
                <TextareaAutosize
                  maxLength={225}
                  defaultValue={data.example}
                  className={styles.autoSizeTextArea}
                />
              </>
            )}
            {!editting && (
              <>
                <span className="mr-1 text-gray-300 w-14">Ex:</span>
                <span>{data.example}</span>
              </>
            )}
          </div>
        )}
      </div>
      {/* Error message */}
      {errMsg && (
        <div className="">
          <p className="text-red-500 text-sm">{errMsg}</p>
        </div>
      )}

      {/* Image */}
      {displayImg && (data.image_url || selectedFileUrl || editting) && (
        <div className={`relative flex items-center`}>
          <span className="mr-1 text-gray-300 w-14">Img:</span>
          <div className={`relative w-14 h-14`}>
            {selectedFileUrl && (
              <Image
                priority={false}
                fill
                sizes="56px"
                alt="card-image"
                className="object-contain"
                src={selectedFileUrl}
              />
            )}
            {data.image_url && !selectedFileUrl && (
              <Image
                priority={false}
                fill
                sizes="56px"
                alt="card-image"
                className="object-contain"
                src={data.image_url}
              />
            )}
            {!data.image_url && !selectedFileUrl && (
              <Image
                priority={false}
                fill
                sizes="56px"
                alt="card-image"
                className="object-contain"
                src={"/assets/images/uni-placeholder-image.png"}
              />
            )}
          </div>
          {editting && (
            <>
              <input
                hidden
                id={data.id}
                onChange={(e) => {
                  handleFileChange(
                    e,
                    setErrMsg,
                    setSelectedFile,
                    setSelectedFileUrl
                  );
                }}
                multiple={false}
                className="ml-4"
                accept="image/*"
                type="file"
              />
              <label className="obsolute cursor-pointer" htmlFor={data.id}>
                <DocumentArrowUpIcon className="h-6 w-6 text-blue-600" />
              </label>
            </>
          )}
        </div>
      )}
      {/* Actions */}
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
                handleDelete(data.id);
              }}
            >
              <TrashIcon className="h-5 w-5 text-red-400" />
            </button>
            <button
              title="Save"
              className="flex items-center"
              onClick={handleUpdate}
            >
              <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            </button>
          </>
        )}
      </div>
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
