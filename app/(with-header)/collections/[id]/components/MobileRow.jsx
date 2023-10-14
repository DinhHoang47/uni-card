import Image from "next/image";
import styles from "./styles.module.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function MobileRow({ setTermModalOpen }) {
  const handleEdit = () => {
    setEditCardId();
    setTermModalOpen(true);
  };
  return (
    <li className={`${styles.mobileRow} relative space-y-2 text-center p-4`}>
      {/* Term */}
      <div className="">
        <p className="font-semibold">漢字</p>
      </div>
      {/* Define & Example */}
      <div className="">
        <p className="">
          KANJI fasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
          asdfasdf asdfasdf asdfadsf asdf asdf fasdf asdfa sdfasdf asdf asdf
          asdf asdf
        </p>
        <p className="">Meaning</p>
        <p className="">Example</p>
      </div>
      {/* Image */}
      <div className="flex justify-center items-center">
        <Image
          alt="card-image"
          width={40}
          height={40}
          src={"/assets/images/no-image-holder.jpg"}
        />
      </div>
      {/* Actions */}
      <div className="absolute top-0 right-0 flex items-center space-x-4 pr-4 pt-1">
        <button>
          <PencilIcon
            onClick={handleEdit}
            className="h-5 w-5 text-indigo-500"
          />
        </button>
        <button>
          <TrashIcon className="h-5 w-5 text-rose-500" />
        </button>
      </div>
    </li>
  );
}
