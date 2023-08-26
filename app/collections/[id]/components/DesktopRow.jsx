import styles from "./styles.module.css";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DesktopRow({ setEditCardId, setIsModalOpen }) {
  const handleEdit = () => {
    setIsModalOpen(true);
    setEditCardId(1);
  };
  const handleDelete = () => {};
  return (
    <li className={`${styles.row}`}>
      <ul className={`${styles.rowItems}`}>
        <li className={`${styles.rowItem}`}>1</li>
        <li className={`${styles.rowItem}`}>漢字</li>
        <li className={`${styles.rowItem}`}>Meaning</li>
        <li className={`${styles.rowItem}`}>Kanji</li>
        <li className={`${styles.rowItem}`}>Example</li>
        <li className={`${styles.rowItem}`}>
          <Image
            alt="card-image"
            width={40}
            height={40}
            src={"/assets/images/samurai_cartoon.jpg"}
          />
        </li>
        <li className={`${styles.rowItem}`}>
          <button onClick={handleEdit}>
            <PencilIcon className="h-5 w-5 text-indigo-500" />
          </button>
          <button onClick={handleDelete}>
            <TrashIcon className="h-5 w-5 text-rose-500" />
          </button>
        </li>
      </ul>
    </li>
  );
}
