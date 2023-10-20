import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SelectSectionButton from "./SelectSectionButton";

export default function DesktopSectionSelection({
  openSelect,
  setOpenSelect,
  SelectSectionRef,
}) {
  return (
    <>
      <div className="flex space-x-2 cursor-pointer">
        <p
          onClick={() => {
            setOpenSelect((pre) => !pre);
          }}
          className="font-semibold select-none"
        >
          Select section to learn
        </p>
        <button
          onClick={() => {
            setOpenSelect((pre) => !pre);
          }}
        >
          <ChevronDownIcon
            className={`h-5 w-5  ${
              openSelect ? "" : "-rotate-90"
            } transition-transform `}
          />
        </button>
      </div>
      <div
        onTransitionEnd={(e) => {
          if (!openSelect) {
            e.target.classList.add("h-0");
          } else {
            e.target.classList.remove("h-0");
          }
        }}
        ref={SelectSectionRef}
        className={`${
          openSelect ? "max-h-96" : "max-h-0"
        } overflow-hidden transition-all origin-top`}
      >
        <ul
          className={`grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12 xl:grid-cols-12 gap-2`}
        >
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton selected />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
          <SelectSectionButton />
        </ul>
      </div>
    </>
  );
}
