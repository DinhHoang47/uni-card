import styles from "./styles.module.css";

import DesktopRow from "./DesktopRow";
import { useRef } from "react";

export default function DesktopTermTable({ setTermModalOpen, setEditCardId }) {
  const meaning2Ref = useRef();
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
        <ul className={` rounded-t-md w-full ${styles.tableHeader} `}>
          <li>No</li>
          <li>Term</li>
          <li>Meaning 1</li>
          <li ref={meaning2Ref}>Meaning 2</li>
          <li>Example</li>
          <li>Image</li>
          <li></li>
        </ul>
      </div>

      <div className="mt-2">
        <ul className={`${styles.rows}`}>
          <DesktopRow setTermModalOpen={setTermModalOpen} />
          <DesktopRow setTermModalOpen={setTermModalOpen} />
        </ul>
      </div>
    </div>
  );
}
