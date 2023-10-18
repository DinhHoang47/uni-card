import useSWR from "swr";
import DesktopTermTable from "./DesktopTermTable";
import MobileTermTable from "./MobileTermTable";
import styles from "./styles.module.css";

import { InboxIcon } from "@heroicons/react/24/outline";
import { useCard } from "@lib/useCard";

export default function TermTable({
  displayExample,
  displayDef2,
  displayImg,
  collectionId,
  setTermModalOpen,
}) {
  // Fetched data
  const { error, data, loading, mutate } = useCard(collectionId);
  console.log("data: ", data);
  if (error) return <ErrorMessage />;
  if (loading) return <LoadingComponent />;
  if (data) {
    const totalCard = data.length;
    return (
      <>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Terms</h4>
        </div>
        <AddTermButton setTermModalOpen={setTermModalOpen} />
        {/* Show message if no card */}
        {totalCard === 0 && <NoCard />}
        {/* Card table */}
        {totalCard !== 0 && (
          <>
            <div className="hidden sm:block">
              <DesktopTermTable
                cardList={data}
                displayImg={displayImg}
                displayDef2={displayDef2}
                displayExample={displayExample}
                setTermModalOpen={setTermModalOpen}
              />
            </div>
            <div className="block sm:hidden">
              <MobileTermTable
                cardList={data}
                displayImg={displayImg}
                displayExample={displayExample}
                displayDef2={displayDef2}
                setTermModalOpen={setTermModalOpen}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

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
        <h4 className="font-semibold">Terms</h4>
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
