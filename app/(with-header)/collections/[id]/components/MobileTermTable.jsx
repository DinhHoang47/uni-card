import MobileRow from "./MobileRow";
import styles from "./styles.module.css";

export default function MobileTermTable({ setTermModalOpen }) {
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

      <div className="mt-4">
        <ul className="space-y-4">
          <MobileRow setTermModalOpen={setTermModalOpen} />
        </ul>
      </div>
    </div>
  );
}
