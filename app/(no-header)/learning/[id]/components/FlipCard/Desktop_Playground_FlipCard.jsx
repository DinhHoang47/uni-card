import { useLearningStatus } from "@lib/useLearningStatus";
import CardLearn from "./CardLearn";
import { useEffect, useState } from "react";

export default function Desktop_Playground_FlipCard({
  currentCardArr,
  displayOptions,
  statusArray,
  isDisplayStatus,
}) {
  return (
    <div className=" hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-5 lg:px-5 xl:px-20">
      {currentCardArr.map((item) => (
        <CardLearn
          displayOptions={displayOptions}
          data={item}
          key={item.id}
          statusArray={statusArray}
          isDisplayStatus={isDisplayStatus}
        />
      ))}
    </div>
  );
}
