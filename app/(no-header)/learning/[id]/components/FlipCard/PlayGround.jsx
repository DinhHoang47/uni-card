import MobilePlayground from "./MobilePlayground";
import Desktop_Playground_FlipCard from "./Desktop_Playground_FlipCard";
import { useLearningStatus } from "@lib/useLearningStatus";
import { useEffect, useState } from "react";

export default function PlayGround({
  setOpenSelect,
  currentCardArr,
  displayOptions,
  collectionId,
}) {
  // Fetched data
  const { data: learningStatus } = useLearningStatus(collectionId);
  // Local state
  const isDisplayStatus = learningStatus?.is_display_status;
  const statusArray = learningStatus?.test_result;

  return (
    <>
      <div
        onClick={() => {
          setOpenSelect(false);
        }}
        className="w-full"
      >
        {/* Desktop playground */}
        <Desktop_Playground_FlipCard
          displayOptions={displayOptions}
          currentCardArr={currentCardArr}
          isDisplayStatus={isDisplayStatus}
          statusArray={statusArray}
        />
        {/* Mobile Playground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          <MobilePlayground
            displayOptions={displayOptions}
            currentCardArr={currentCardArr}
            isDisplayStatus={isDisplayStatus}
            statusArray={statusArray}
          />
        </div>
      </div>
    </>
  );
}
