"use client";
import { useEffect, useRef, useState } from "react";

import SettingModal from "./components/SettingModal";
import Header from "./components/Header";
import { CSSTransition } from "react-transition-group";
import FlipCardMode from "./components/FlipCard/FlipCardMode";
import { useCard } from "@lib/useCard";
import useUser from "@lib/useUser";
import { privateUserServ } from "@services/Private_UserService";
import { useLearningStatus } from "@lib/useLearningStatus";

export default function CollectionLearn({ params }) {
  // Fetched data
  const { id: collectionId } = params;
  const { user } = useUser("/collections");
  const { data: learningStatus } = useLearningStatus(collectionId);
  // Local State
  const testingStatus = learningStatus?.test_result;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const learningHangerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState({
    startNumber: 1,
    endNumber: null,
  });
  // Handler
  const { mutate: mutateCardData } = useCard(collectionId);
  const handleTest = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    mutateCardData();
  }, [collectionId]);
  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-2 px-2 sm:px-8 ">
      {/* Header */}
      <Header
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        collectionId={collectionId}
        handleTest={handleTest}
      />
      <FlipCardMode
        testingStatus={testingStatus}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        collectionId={collectionId}
      />
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
          currentSection={currentSection}
          hanger={"learningHanger"}
          setIsOpen={setIsOpen}
          id={collectionId}
        />
      </CSSTransition>
    </div>
  );
}
