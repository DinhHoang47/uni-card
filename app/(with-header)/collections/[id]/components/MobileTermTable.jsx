import MobileRow from "./MobileRow";

export default function MobileTermTable({
  cardList,
  displayExample,
  displayImg,
  displayDef2,
  setTermModalOpen,
}) {
  return (
    <div className="">
      <div className="mt-4">
        <ul className="space-y-4">
          {cardList.map((card, index) => (
            <MobileRow
              key={`mobile-row-${index}`}
              cardData={card}
              displayExample={displayExample}
              displayImg={displayImg}
              displayDef2={displayDef2}
              setTermModalOpen={setTermModalOpen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
