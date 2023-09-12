import { useEffect } from "react";
import SelectSectionButton from "./SelectSectionButton";
import styles from "./styles.module.css";

export default function Mobile_SectionSelectionList({ openMenu, setOpenMenu }) {
  useEffect(() => {
    const closeMobileSectionMenu = () => {
      setOpenMenu(false);
      console.log("close modal");
    };
    console.log("menu rendered");
    window.addEventListener("click", closeMobileSectionMenu);
    return () => window.removeEventListener("click", closeMobileSectionMenu);
  }, []);
  return (
    <ul
      className={`${
        styles.mobileSectionList
      } absolute z-10 right-0 top-full w-36 overflow-hidden ${
        openMenu ? "max-h-40 border-b-2" : "max-h-0"
      } transition-all pl-2 border-x-2  rounded-b-md border-blue-500 bg-blue-50 overflow-y-scroll`}
    >
      <SelectSectionButton />
      <SelectSectionButton />
      <SelectSectionButton />
      <SelectSectionButton />
      <SelectSectionButton />
    </ul>
  );
}
