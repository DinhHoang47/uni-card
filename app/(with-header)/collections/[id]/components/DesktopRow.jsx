import styles from "./styles.module.css";
import { useState } from "react";
import Image from "next/image";

import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { TextareaAutosize } from "@mui/base";

export default function DesktopRow({ setTermModalOpen }) {
  const [editting, setEditting] = useState(false);
  const handleEdit = () => {
    setEditting(true);
    // setTermModalOpen(true);
  };
  const handleUpdate = () => {
    setEditting(false);
  };
  const handleDelete = () => {};

  return (
    <li className={`${styles.row}`}>
      <ul
        className={`${styles.rowItems} ${editting ? styles.edittingRow : ""}`}
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
        <li datafield="meaning2" className={`${styles.rowItem}`}>
          Meaning
        </li>
        <li className={`${styles.rowItem}`}>Kanji</li>
        <li className={`${styles.rowItem}`}>Example</li>
        <li datafield="image" className={`${styles.rowItem}`}>
          <Image
            alt="card-image"
            width={40}
            height={40}
            src={"/assets/images/samurai_cartoon.jpg"}
          />
        </li>
        <li className={`${styles.rowItem}`}>
          {!editting && (
            <>
              <button onClick={handleEdit}>
                <PencilIcon className="h-4 w-4 text-blue-500" />
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
