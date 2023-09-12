"use client";
import { useEffect, useRef, useState } from "react";

import MobilePlayground from "./MobilePlayground";
import { createPortal } from "react-dom";
import SettingModal from "./components/SettingModal";
import Header from "./components/Header";
import DesktopSectionSelection from "./components/DesktopSectionSelection";
import MobileSectionSelection from "./components/MobileSectionSelection";
import Desktop_Playground_FlipCard from "./components/Desktop_Playground_FlipCard";
import { CSSTransition } from "react-transition-group";

export default function CollectionLearn({ params }) {
  const [openSelect, setOpenSelect] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const SelectSectionRef = useRef();
  const [openMenu, setOpenMenu] = useState(); //mobile section selection menu
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleTest = () => {
    console.log(params);
    setIsOpen(true);
  };
  return (
    <div className="w-full mt-14 space-y-2 sm:space-y-4 px-2 sm:px-8 ">
      {/* Header */}
      <Header
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        slug={params.slug}
        handleTest={handleTest}
      />
      {/* Section */}
      {/* Desktop Selection */}
      <div className="hidden sm:block w-full space-y-2 sm:space-y-4">
        <DesktopSectionSelection
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
          SelectSectionRef={SelectSectionRef}
        />
      </div>
      {/* Mobile Selection */}
      <div className="block sm:hidden w-full space-y-2 sm:space-y-4">
        <MobileSectionSelection setOpenMenu={setOpenMenu} openMenu={openMenu} />
      </div>
      {/* Display Setting */}
      <div className={`w-full space-y-4 ${openSelect ? "" : "sm:!mt-0"}`}>
        {/* Setting & button */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 justify-between items-center">
          {/* Setting */}
          <div className="flex items-center space-x-3 font-semibold ">
            <span>Display:</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="kanji-setting">Kanji</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="kanji-setting"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="meaning-setting">Meaning</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="meaning-setting"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="example-setting">Example</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="example-setting"
              />
            </div>
          </div>
          {/* Actions */}
        </div>
      </div>
      {/* Section */}
      <div
        onClick={() => {
          setOpenSelect(false);
        }}
        className="w-full"
      >
        {/* Desktop playground */}
        <Desktop_Playground_FlipCard />
        {/* Mobile Playground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Card */}
          <MobilePlayground />
          {/* Select Card Button */}
        </div>
      </div>
      {/* Setting Modal */}
      <CSSTransition
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <SettingModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </CSSTransition>
    </div>
  );
}
