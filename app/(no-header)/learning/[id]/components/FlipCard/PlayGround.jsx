import MobilePlayground from "../../MobilePlayground";
import Desktop_Playground_FlipCard from "./Desktop_Playground_FlipCard";

export default function PlayGround({ setOpenSelect, currentCardArr }) {
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
          currentCardArr={currentCardArr}
          setOpenSelect={setOpenSelect}
        />
        {/* Mobile Playground  */}
        <div className="flex sm:hidden mt-4 overflow-hidden">
          {/* Card */}
          <MobilePlayground currentCardArr={currentCardArr} />
          {/* Select Card Button */}
        </div>
      </div>
    </>
  );
}
