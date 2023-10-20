import { useEffect } from "react";
import SelectSectionButton from "./SelectSectionButton";

export default function Mobile_SectionSelectionList({
  buttonsArr,
  openMenu,
  setOpenMenu,
}) {
  useEffect(() => {
    const closeMobileSectionMenu = () => {
      setOpenMenu(false);
    };
    window.addEventListener("click", closeMobileSectionMenu);
    return () => window.removeEventListener("click", closeMobileSectionMenu);
  }, []);
  return (
    <ul
      className={`absolute top-0 left-0 right-0 z-10  pl-1 pt-1 pr-4 pb-1 space-y-1  outline outline-gray-400 rounded outline-1 bg-blue-100 max-h-56 overflow-y-scroll`}
    >
      {buttonsArr.map((item) => (
        <SelectSectionButton key={item.startNumber} data={item} />
      ))}
    </ul>
  );
}
