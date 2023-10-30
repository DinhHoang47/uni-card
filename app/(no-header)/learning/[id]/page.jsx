"use client";
import { useEffect, useRef, useState } from "react";

import TestConfigModal from "./components/SettingModal";
import Header from "./components/Header";
import { CSSTransition } from "react-transition-group";
import FlipCardMode from "./components/FlipCard/FlipCardMode";
import { useCard } from "@lib/useCard";
import useUser from "@lib/useUser";
import { privateUserServ } from "@services/Private_UserService";
import { useLearningStatus } from "@lib/useLearningStatus";
import LearningSettingModal from "./components/FlipCard/LearningSettingModal";
import XSpinner from "@components/Spinner/XSpinner";

export default function CollectionLearn({ params }) {
  // Fetched data
  const { id: collectionId } = params;
  const { user, userIsLoading } = useUser("/auth");
  const { data: learningStatus, mutate: mutateLearningStatus } =
    useLearningStatus(collectionId);
  // Local State
  const testingStatus = learningStatus?.test_result;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [isOpenLearningConfig, setIsOpenLearningConfig] = useState(false);
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
  if (userIsLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <XSpinner />
      </div>
    );
  }
  if (!user?.isLoggedIn) {
    return <div className="">Logged in required. Redirect ...</div>;
  }
  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-2 px-2 sm:px-8 ">
      {/* Header */}
      <Header
        isOpenPopup={isOpenTooltip}
        setIsOpenPopup={setIsOpenTooltip}
        collectionId={collectionId}
        handleTest={handleTest}
      />
      <FlipCardMode
        testingStatus={testingStatus}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        collectionId={collectionId}
        setIsOpenLearningConfig={setIsOpenLearningConfig}
      />
      <div ref={learningHangerRef} id="learningHanger" className=""></div>
      {/* Test Config Modal */}
      <CSSTransition
        nodeRef={learningHangerRef}
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <TestConfigModal
          currentSection={currentSection}
          hanger={"learningHanger"}
          setIsOpen={setIsOpen}
          id={collectionId}
        />
      </CSSTransition>
      {/* Learning setting modal */}
      <CSSTransition
        nodeRef={learningHangerRef}
        classNames={"modal"}
        in={isOpenLearningConfig}
        timeout={200}
        unmountOnExit
      >
        <LearningSettingModal
          collectionId={collectionId}
          currentSection={currentSection}
          hanger={"learningHanger"}
          setIsOpen={setIsOpenLearningConfig}
          id={collectionId}
          mutateLearningStatus={mutateLearningStatus}
        />
      </CSSTransition>
    </div>
  );
}
