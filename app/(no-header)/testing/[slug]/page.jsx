"use client";
import { useState } from "react";
import DesktopTestingGround from "./desktop/DesktopTestingGround";
import { useSearchParams } from "next/navigation";
import TestingGround_Choice from "./mobile/TestingGround_Choice";
import TestingGround_Writing from "./mobile/TestingGround_Writing";
import ResultModal from "./components/ResultModal";
import Header from "./components/Header";
import { CSSTransition } from "react-transition-group";

export default function CollectionTest({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const testingMode = searchParams.get("mode");
  const showMode = searchParams.get("show");

  const handleSubmit = () => {
    console.log("handle submit");
    setIsOpen(true);
  };

  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Header */}
      <Header slug={params.slug} handleSubmit={handleSubmit} />
      {/* Section */}
      <div className="w-full">
        {/* Desktop Tesing-ground */}
        <DesktopTestingGround testingMode={testingMode} showMode={showMode} />
        {/* Mobile Testing-ground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Checking testing mode pass through URL params */}
          {testingMode === "writing" ? (
            <TestingGround_Writing showMode={showMode} />
          ) : (
            <TestingGround_Choice showMode={showMode} />
          )}
        </div>
      </div>
      {/* Setting Modal */}
      <CSSTransition
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <ResultModal isOpen={isOpen} setIsOpen={setIsOpen} slug={params.slug} />
      </CSSTransition>
    </div>
  );
}
