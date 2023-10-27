import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import SelectSectionButton from "./SelectSectionButton";

export default function DesktopSectionSelection({
  openSelect,
  setOpenSelect,
  buttonArr,
  setCurrentSection,
  currentSection,
  testingStatus,
  currentCardArr,
  cardArr,
}) {
  const containerRef = useRef(null);
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
      <CSSTransition
        nodeRef={containerRef}
        classNames="height-change-animate"
        in={openSelect}
        timeout={300}
        unmountOnExit
      >
        <ul
          ref={containerRef}
          className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12 xl:grid-cols-12 gap-2 overflow-hidden mt-2"
        >
          {buttonArr.map((item) => (
            <SelectSectionButton
              currentCardArr={currentCardArr}
              testingStatus={testingStatus}
              setCurrentSection={setCurrentSection}
              currentSection={currentSection}
              data={item}
              key={`button-${item.startNumber}`}
              cardArr={cardArr}
            />
          ))}
        </ul>
      </CSSTransition>
    </>
  );
}
