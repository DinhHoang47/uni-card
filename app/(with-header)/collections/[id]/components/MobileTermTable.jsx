import MobileRow from "./MobileRow";
import styles from "./styles.module.css";

export default function MobileTermTable({ setIsModalOpen, setEditCardId }) {
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

      <div className="mt-4">
        <ul className="space-y-4">
          <MobileRow
            setIsModalOpen={setIsModalOpen}
            setEditCardId={setEditCardId}
          />
        </ul>
      </div>
    </div>
  );
}
