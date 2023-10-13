import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { privateCollectionServ } from "@services/Private_CollectionService";
import { useRouter } from "next/navigation";
import { addMessage } from "@redux/commonMessageSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

const handleDelete = async (collectionId, dispatch, router, globalMutate) => {
  const confirmed = window.confirm(
    "❌ Are you sure to delete this collection !"
  );
  if (confirmed) {
    await privateCollectionServ
      .deleteCollection(collectionId)
      .then((res) => {
        dispatch(addMessage({ text: "Deleted", variation: "success" }));

        // Fecth new user collection using global mutete
        globalMutate((key) => key[0].startsWith("/user/id/posts"), undefined, {
          revalidate: true,
        });
        setTimeout(() => {
          router.push("/mypage");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err.response?.data?.message || "Failed to delete.";
        dispatch(addMessage({ text: errMsg, variation: "warning" }));
      });
  }
};

export default function SettingTooltip({
  setIsOpenPopup,
  setIsEditModalOpen,
  collectionData,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();
  useEffect(() => {
    const closeThisPopup = () => {
      setIsOpenPopup(false);
    };
    window.addEventListener("click", closeThisPopup, false);
    return () => window.removeEventListener("click", closeThisPopup);
  }, []);
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute bg-white px-2 py-2 rounded top-3/4 border"
      >
        <ul className="space-y-1">
          <li
            onClick={() => {
              setIsOpenPopup(false);
              setIsEditModalOpen(true);
            }}
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
          >
            <span>Edit</span>
            <PencilSquareIcon className="h-5 w-5 " />
          </li>
          <li
            onClick={() => {
              setIsOpenPopup(false);
              handleDelete(collectionData.id, dispatch, router, globalMutate);
            }}
            className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
          >
            <span>Delete</span>
            <TrashIcon className="h-5 w-5 " />
          </li>
        </ul>
      </div>
    </>
  );
}
