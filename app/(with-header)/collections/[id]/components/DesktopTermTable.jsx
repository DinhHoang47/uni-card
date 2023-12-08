import { useRef } from "react";

import DesktopRow from "./DesktopRow";

import styles from "./styles.module.css";

export default function DesktopTermTable({
  cardList,
  displayDef2,
  displayImg,
  displayExample,
  setTermModalOpen,
  onDeleteRow,
  onUpdateRow,
  isOwner,
  languageRef,
}) {
  // Fetched data
  // Local variable
  let totalCol =
    3 +
    (displayDef2 ? 1 : 0) +
    (displayImg ? 1 : 0) +
    (displayExample ? 1 : 0) +
    (isOwner ? 1 : 0);
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
    case 4:
      tableHeaderGridTemp = styles.tableHeadGridCol4;
      break;
    case 3:
      tableHeaderGridTemp = styles.tableHeadGridCol3;
      break;
    default:
      tableHeaderGridTemp = styles.tableHeadGridUnset;
      break;
  }

  return (
    <>
      <div className="mt-2">
        <ul
          className={` rounded-t-md w-full ${styles.tableHeader} ${tableHeaderGridTemp} text-gray-400`}
        >
          <li>
            <p className="text-center w-full">No</p>
          </li>
          <li>Term</li>
          <li>Definition</li>
          {displayDef2 && (
            <li className="">
              <p className="line-clamp-1">Pronunciation</p>
            </li>
          )}
          {displayExample && <li>Example</li>}
          {displayImg && (
            <li>
              <p className="text-center w-full">Image</p>
            </li>
          )}
          {isOwner && (
            <li>
              <p className="text-center w-full">Actions</p>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-2">
        <ul className={`${styles.rows}`}>
          {cardList.map((card, index) => (
            <DesktopRow
              isOwner={isOwner}
              rowIndex={index}
              key={`card-${card.id}`}
              cardData={card}
              displayImg={displayImg}
              displayExample={displayExample}
              displayDef2={displayDef2}
              setTermModalOpen={setTermModalOpen}
              onDeleteRow={onDeleteRow}
              onUpdateRow={onUpdateRow}
              languageRef={languageRef}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
