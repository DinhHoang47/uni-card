import styles from "./styles.module.css";
import { useState } from "react";
import Image from "next/image";

import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { TextareaAutosize } from "@mui/base";

export default function DesktopRow({ displayImg, displayDef2 }) {
  const [editting, setEditting] = useState(false);
  const handleEdit = () => {
    setEditting(true);
  };
  const handleUpdate = () => {
    setEditting(false);
  };
  const handleDelete = () => {};

  // Dynamic styles
  // Max 7 col
  const totalCol = 5 + (displayImg ? 1 : 0) + (displayDef2 ? 1 : 0);
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
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          1
        </li>
        <li
          className={`${styles.rowItem} ${editting ? styles.edittingItem : ""}`}
        >
          {editting && (
            <TextareaAutosize
              maxLength={225}
              defaultValue={
                "abcdefasdf asdf asdf asdfa sdfas sdfasdf asdf asdfasd a"
              }
              className={styles.autoSizeTextArea}
            />
          )}
          {!editting && (
            <span>abcdefasdf asdf asdf asdfa sdfas sdfasdf asdf asdfasd a</span>
          )}
        </li>
        <li datafield="definition2" className={`${styles.rowItem}`}>
          Definition
        </li>
        {displayDef2 && <li className={`${styles.rowItem}`}>Kanji</li>}

        <li className={`${styles.rowItem}`}>Example</li>
        {displayImg && (
          <li datafield="image" className={`${styles.rowItem}`}>
            <Image
              alt="card-image"
              width={40}
              height={40}
              src={"/assets/images/samurai_cartoon.jpg"}
            />
          </li>
        )}

        <li className={`${styles.rowItem}`}>
          {!editting && (
            <>
              <button onClick={handleEdit}>
                <PencilIcon className="h-4 w-4 text-blue-600" />
              </button>
            </>
          )}
          {editting && (
            <>
              <button onClick={handleUpdate}>
                <CloudArrowUpIcon className="h-5 w-5 text-blue-600" />
              </button>
              <button onClick={handleDelete}>
                <MinusCircleIcon className="h-5 w-5 text-red-400" />
              </button>
            </>
          )}
        </li>
      </ul>
    </li>
  );
}
