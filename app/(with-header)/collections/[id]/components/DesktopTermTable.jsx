import styles from "./styles.module.css";

import DesktopRow from "./DesktopRow";

export default function DesktopTermTable({
  setIsModalOpen,
  editCardId,
  setEditCardId,
}) {
  return (
    <div className="">
      <div className="">
        <button
          onClick={() => {
            setIsModalOpen(true);
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
          <li>Meaning 2</li>
          <li>Example</li>
          <li>Image</li>
          <li>Actions</li>
        </ul>
      </div>

      <div className="mt-2">
        <ul className={`${styles.rows}`}>
          <DesktopRow
            setIsModalOpen={setIsModalOpen}
            setEditCardId={setEditCardId}
          />
          <DesktopRow
            setIsModalOpen={setIsModalOpen}
            setEditCardId={setEditCardId}
          />
        </ul>
      </div>
    </div>
  );
}
