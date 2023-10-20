"use client";
import { useEffect, useRef, useState } from "react";

import SettingModal from "./components/SettingModal";
import Header from "./components/Header";
import { CSSTransition } from "react-transition-group";
import FlipCardMode from "./components/FlipCard/FlipCardMode";
import { useCard } from "@lib/useCard";

export default function CollectionLearn({ params }) {
  // Fetched data
  const { id: collectionId } = params;
  // Local State
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const learningHangerRef = useRef(null);
  // Handler
  const { mutate: mutateCardData } = useCard(collectionId);
  const handleTest = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    mutateCardData();
  }, [collectionId]);
  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Header */}
      <Header
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        id={collectionId}
        handleTest={handleTest}
      />
      <FlipCardMode collectionId={collectionId} />
      <div ref={learningHangerRef} id="learningHanger" className=""></div>
      {/* Setting Modal */}
      <CSSTransition
        nodeRef={learningHangerRef}
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <SettingModal
          hanger={"learningHanger"}
          setIsOpen={setIsOpen}
          id={collectionId}
        />
      </CSSTransition>
    </div>
  );
}
