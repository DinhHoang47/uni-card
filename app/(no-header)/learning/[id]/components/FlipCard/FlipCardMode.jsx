import React, { useRef, useState } from "react";
import DesktopSectionSelection from "../DesktopSectionSelection";
import MobileSectionSelection from "../MobileSectionSelection";
import SectionSelection from "./SectionSelection";
import DisplaySetting from "./DisplaySetting";
import PlayGround from "./PlayGround";

export default function FlipCardMode() {
  const [openSelect, setOpenSelect] = useState(true);
  const selectSectionRef = useRef();
  const [openMenu, setOpenMenu] = useState(); //mobile section selection menu
  return (
    <>
      <SectionSelection
        selectSectionRef={selectSectionRef}
        openSelect={openSelect}
        setOpenSelect={setOpenSelect}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <DisplaySetting openSelect={openSelect} />
      <PlayGround setOpenSelect={setOpenSelect} />
    </>
  );
}
