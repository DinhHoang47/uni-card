import React from "react";
import DesktopTermTable from "./DesktopTermTable";
import MobileTermTable from "./MobileTermTable";

export default function TermTable({
  displayDef2,
  displayImg,
  collectionId,
  setTermModalOpen,
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Terms</h4>
      </div>
      <div className="hidden sm:block">
        <DesktopTermTable
          displayImg={displayImg}
          displayDef2={displayDef2}
          setTermModalOpen={setTermModalOpen}
        />
      </div>
      <div className="block sm:hidden">
        <MobileTermTable
          displayImg={displayImg}
          displayDef2={displayDef2}
          setTermModalOpen={setTermModalOpen}
        />
      </div>
    </>
  );
}
