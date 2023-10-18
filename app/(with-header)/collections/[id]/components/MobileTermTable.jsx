import MobileRow from "./MobileRow";

export default function MobileTermTable({
  onDeleteRow,
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
          {cardList.map((card) => (
            <MobileRow
              key={`mobile-card-${card.id}`}
              cardData={card}
              displayExample={displayExample}
              displayImg={displayImg}
              displayDef2={displayDef2}
              setTermModalOpen={setTermModalOpen}
              onDeleteRow={onDeleteRow}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
