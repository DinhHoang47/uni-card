import MobilePlayground from "./MobilePlayground";
import Desktop_Playground_FlipCard from "./Desktop_Playground_FlipCard";

export default function PlayGround({
  setOpenSelect,
  currentCardArr,
  displayOptions,
}) {
  return (
    <>
      <div
        onClick={() => {
          setOpenSelect(false);
        }}
        className="w-full"
      >
        {/* Desktop playground */}
        <Desktop_Playground_FlipCard
          displayOptions={displayOptions}
          currentCardArr={currentCardArr}
          setOpenSelect={setOpenSelect}
        />
        {/* Mobile Playground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          <MobilePlayground
            displayOptions={displayOptions}
            currentCardArr={currentCardArr}
          />
        </div>
      </div>
    </>
  );
}
