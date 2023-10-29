import { StatusIndicator } from "./ButtonStatusIndicator";

export default function Mobile_SelectedSectionButton({
  currentSection,
  cardArr,
  testingStatus,
}) {
  const thisButtonCardArr = cardArr?.slice(
    currentSection?.startNumber - 1,
    currentSection?.endNumber
  );
  return (
    <div
      onTransitionEnd={(e) => {
        e.stopPropagation();
      }}
      className={`h-10 flex-1 border relative border-blue-500  rounded flex flex-col justify-end cursor-pointer transition-all duration-300 overflow-hidden`}
    >
      <p className="text-sm font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {currentSection?.startNumber}~{currentSection?.endNumber}
      </p>
      <StatusIndicator
        testingStatus={testingStatus}
        currentCardArr={thisButtonCardArr}
      />
    </div>
  );
}
