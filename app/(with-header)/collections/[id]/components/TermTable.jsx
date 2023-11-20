import useSWR, { mutate } from "swr";
import DesktopTermTable from "./DesktopTermTable";
import MobileTermTable from "./MobileTermTable";
import styles from "./styles.module.css";

import { InboxIcon } from "@heroicons/react/24/outline";
import { useCard } from "@lib/useCard";
import { privateCardServ } from "@services/Private_CardService";
import { useDispatch } from "react-redux";
import { addMessage } from "@redux/commonMessageSlice";
import { getImageUrl } from "@utils/getImageUrl";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function TermTable({
  displayExample,
  displayDef2,
  displayImg,
  collectionId,
  setTermModalOpen,
  isOwner,
  setIsImportModalOpen,
}) {
  // Fetched data
  const { error, data, loading, mutate } = useCard(collectionId);
  // Handler
  const router = useRouter();
  const showErrorMsg = () => {
    dispatch(addMessage({ text: "Fail to delete.", variation: "warning" }));
  };
  const onDeleteRow = (cardId) => {
    handleDelete(cardId, data, mutate, showErrorMsg);
  };
  const onUpdateRow = (updatedCard) => {
    handleUpdate(updatedCard, mutate, data, showErrorMsg);
  };
  const dispatch = useDispatch();

  if (error) return <ErrorMessage />;
  if (loading) return <LoadingComponent />;
  if (data) {
    const totalCard = data.length;
    return (
      <>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Cards</h4>
          {isOwner && (
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  router.push(`/collections/${collectionId}/export`);
                }}
                className="flex items-center space-x-1 hover:text-blue-600 font-semibold"
              >
                <DocumentArrowUpIcon className="h-5 w-5" />

                <span>Export</span>
              </button>
              <button
                onClick={() => {
                  setIsImportModalOpen(true);
                }}
                className="flex items-center space-x-1 hover:text-blue-600 font-semibold"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                <span>Import</span>
              </button>
            </div>
          )}
        </div>
        {isOwner && <AddTermButton setTermModalOpen={setTermModalOpen} />}

        {/* Show message if no card */}
        {totalCard === 0 && <NoCard />}
        {/* Card table */}
        {totalCard !== 0 && (
          <>
            <div className="hidden sm:block">
              <DesktopTermTable
                isOwner={isOwner}
                onUpdateRow={onUpdateRow}
                onDeleteRow={onDeleteRow}
                cardList={data}
                displayImg={displayImg}
                displayDef2={displayDef2}
                displayExample={displayExample}
                setTermModalOpen={setTermModalOpen}
              />
            </div>
            <div className="block sm:hidden">
              <MobileTermTable
                isOwner={isOwner}
                onUpdateRow={onUpdateRow}
                cardList={data}
                displayImg={displayImg}
                displayExample={displayExample}
                displayDef2={displayDef2}
                setTermModalOpen={setTermModalOpen}
                onDeleteRow={onDeleteRow}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

// Component

const AddTermButton = ({ setTermModalOpen }) => {
  return (
    <div className="">
      <button
        onClick={() => {
          setTermModalOpen(true);
        }}
        className={` w-full h-10 rounded-md font-semibold border-2 border-dashed ${styles.addButton} `}
      >
        <span className="pl-1 relative">
          Add
          <span className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full">
            +
          </span>
        </span>
      </button>
    </div>
  );
};

const ErrorMessage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Cards</h4>
      </div>
      <div className="">Can not find cards. Try later.</div>
    </>
  );
};

const LoadingComponent = () => {
  return (
    <>
      <div className="text-center">Loading...</div>
    </>
  );
};

const NoCard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <InboxIcon className="h-6 w-6 text-gray-500" />
      <p className="text-gray-400">No cards</p>
    </div>
  );
};

// Functions

const handleDelete = async (cardId, currentCardList, mutate, showErrorMsg) => {
  const filteredCardList = currentCardList.filter((item) => item.id !== cardId);
  const options = {
    optimisticData: filteredCardList,
    rollbackOnError(error) {
      return error.name !== "AbortError";
    },
    revalidate: false,
  };
  mutate(deleteFn(cardId, currentCardList, showErrorMsg), options);
};

const deleteFn = async (cardId, currentCardList, showErrorMsg) => {
  const deletedCardId = await privateCardServ
    .deleteCard(cardId)
    .then((res) => res.data)
    .catch((err) => {
      showErrorMsg();
    });
  const updatedCardList = currentCardList.filter(
    (item) => item.id !== deletedCardId
  );
  return updatedCardList;
};

const handleUpdate = async (
  inputedCardData,
  mutateCardList,
  currentCardList,
  showErrorMsg
) => {
  // Mutate local cardlist
  const filteredCardList = currentCardList.map((item) => {
    if (item.id !== inputedCardData.id) {
      return item;
    } else {
      // Temporarily update image_url to selectedImageUrl if file selected
      let tempImageUrl;
      if (inputedCardData.selectedFileUrl) {
        tempImageUrl = inputedCardData.selectedFileUrl;
      } else {
        tempImageUrl = item.image_url;
      }
      const newCardData = {
        id: inputedCardData.id,
        term: inputedCardData.term,
        definition_1: inputedCardData.definition1,
        definition_2: inputedCardData.definition2,
        example: inputedCardData.example,
        image_url: tempImageUrl,
      };
      return newCardData;
    }
  });
  const options = {
    optimisticData: filteredCardList,
    rollbackOnError(error) {
      return error.name !== "AbortError";
    },
    revalidate: false,
  };
  mutateCardList(
    async (currentCached) => {
      return updateFn(inputedCardData, currentCardList, showErrorMsg);
    },

    options
  );
};

const updateFn = async (inputData, currentCardList, showErrorMsg) => {
  const preset = "card_image";
  const updatedImageUrl = await getImageUrl(
    inputData.imageUrl,
    inputData.selectedFile,
    preset
  );
  const dataToSend = {
    term: inputData.term,
    definition_1: inputData.definition1,
    definition_2: inputData.definition2,
    example: inputData.example,
    image_url: updatedImageUrl,
  };
  const fetchedData = await privateCardServ
    .updateCard(inputData.id, dataToSend)
    .then((res) => res.data);
  const fetchedCardList = currentCardList.map((item) => {
    if (item.id !== fetchedData.id) {
      return item;
    } else {
      return fetchedData;
    }
  });
  return fetchedCardList;
};
