import Image from "next/image";
import styles from "./styles.module.css";
import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { TextareaAutosize } from "@mui/base";

export default function MobileRow({ displayDef2, displayImg }) {
  // State
  const [editting, setEditting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  // Handler
  const handleEdit = () => {
    setEditting(true);
  };
  const handleUpdate = () => {
    setEditting(false);
  };
  const handleDelete = () => {
    setEditting(false);
  };

  let imageUrl = null;
  // let imageUrl =
  //   "https://res.cloudinary.com/unicard/image/upload/v1697429744/collections/brain_3.png";
  console.log(errMsg);
  console.log("rerender");
  return (
    <li
      className={`${styles.mobileRow} ${
        editting && styles.mobileRowEditting
      } relative space-y-2 p-4`}
    >
      {/* Term */}
      <div className="flex justify-between">
        {editting && (
          <>
            <span className="mr-1 text-gray-300 w-14">Term:</span>
            <TextareaAutosize
              maxLength={225}
              defaultValue={"lorem10"}
              className={styles.autoSizeTextArea}
            />
          </>
        )}
        {!editting && (
          <>
            <span className="mr-1 text-gray-300 w-14">Term:</span>
            <span className="font-semibold">Human abcdef</span>
          </>
        )}
      </div>
      {/* Definition & Example */}
      <div className="space-y-1">
        {/* Definition */}
        <div className="flex justify-between">
          {editting && (
            <>
              <span className="mr-1 text-gray-300 w-14">Def:</span>
              <TextareaAutosize
                maxLength={225}
                defaultValue={"lorem10"}
                className={styles.autoSizeTextArea}
              />
            </>
          )}
          {!editting && (
            <>
              <span className="mr-1 text-gray-300 w-14">Def:</span>
              <span>Danh từ chỉ người</span>
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
                  defaultValue={"lorem10"}
                  className={styles.autoSizeTextArea}
                />
              </>
            )}
            {!editting && (
              <>
                <span className="mr-1 text-gray-300 w-14">Def 2:</span>
                <span>lorem10</span>
              </>
            )}
          </div>
        )}
        {/* Example*/}
        <div className="flex justify-between">
          {editting && (
            <>
              <span className="mr-1 text-gray-300 w-14">Ex:</span>
              <TextareaAutosize
                maxLength={225}
                defaultValue={"lorem10"}
                className={styles.autoSizeTextArea}
              />
            </>
          )}
          {!editting && (
            <>
              <span className="mr-1 text-gray-300 w-14">Ex:</span>
              <span>humman là</span>
            </>
          )}
        </div>
      </div>
      {/* Error message */}
      {errMsg && (
        <div className="">
          <p className="text-red-500 text-sm">{errMsg}</p>
        </div>
      )}

      {/* Image */}
      {displayImg && (
        <div className="flex items-center">
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
            {imageUrl && !selectedFileUrl && (
              <Image
                priority={false}
                fill
                sizes="56px"
                alt="card-image"
                className="object-contain"
                src={imageUrl}
              />
            )}
          </div>
          {editting && (
            <input
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
          )}
        </div>
      )}

      {/* Padding for edit button if no image display */}
      {!displayImg && <div className="h-5"></div>}
      {/* Actions */}
      <div className="absolute top-full right-0 !mt-0 -translate-y-10  flex items-center space-x-4 mr-6 pt-1">
        {!editting && (
          <button>
            <PencilIcon
              onClick={handleEdit}
              className="h-5 w-5 text-blue-600"
            />
          </button>
        )}
        {editting && (
          <>
            <button onClick={handleDelete}>
              <TrashIcon className="h-5 w-5 text-red-400" />
            </button>
            <button onClick={handleUpdate}>
              <CloudArrowUpIcon className="h-5 w-5 text-blue-600" />
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
