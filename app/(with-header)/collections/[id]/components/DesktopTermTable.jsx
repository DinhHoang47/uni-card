import styles from "./styles.module.css";

import DesktopRow from "./DesktopRow";
import { useRef } from "react";

export default function DesktopTermTable({
  displayDef2,
  displayImg,
  setTermModalOpen,
  setEditCardId,
}) {
  let totalCol = 5 + (displayDef2 ? 1 : 0) + (displayImg ? 1 : 0);
  let tableHeaderGridTemp;
  // Dynamic table styles
  switch (totalCol) {
    case 7:
      tableHeaderGridTemp = styles.tableHeadGridFull;
      break;
    case 6:
      tableHeaderGridTemp = styles.tableHeadGridCol6;
      break;
    case 5:
      tableHeaderGridTemp = styles.tableHeadGridCol5;
      break;
    default:
      tableHeaderGridTemp = styles.tableHeadGridUnset;
      break;
  }
  return (
    <div className="">
      <div className="">
        <button
          onClick={() => {
            setTermModalOpen(true);
          }}
          className={`w-full h-10 rounded-md font-semibold border-2 border-dashed ${styles.addButton} `}
        >
          + Add
        </button>
      </div>
      <div className="mt-2">
        <ul
          className={` rounded-t-md w-full ${styles.tableHeader} ${tableHeaderGridTemp}`}
        >
          <li>
            <p className="text-center w-full">No</p>
          </li>
          <li>Term</li>
          <li>Definition</li>
          {displayDef2 && (
            <li className="">
              <p className="line-clamp-1">Definition 2</p>
            </li>
          )}
          <li>Example</li>
          {displayImg && (
            <li>
              <p className="text-center w-full">Image</p>
            </li>
          )}
          <li></li>
        </ul>
      </div>

      <div className="mt-2">
        <ul className={`${styles.rows}`}>
          <DesktopRow
            displayImg={displayImg}
            displayDef2={displayDef2}
            setTermModalOpen={setTermModalOpen}
          />
        </ul>
      </div>
    </div>
  );
}
