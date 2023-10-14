import React from "react";
import DesktopTermTable from "./DesktopTermTable";
import MobileTermTable from "./MobileTermTable";

export default function TermTable({ collectionId, setTermModalOpen }) {
  console.log("collectionId: ", collectionId);
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Terms</h4>
      </div>
      <div className="hidden sm:block">
        <DesktopTermTable setTermModalOpen={setTermModalOpen} />
      </div>
      <div className="block sm:hidden">
        <MobileTermTable setTermModalOpen={setTermModalOpen} />
      </div>
    </>
  );
}
