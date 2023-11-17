import styles from "./styles.module.css";
export default function SelectCardSection({
  currentCardArr,
  currentSlide,
  instanceRef,
  statusArray,
  isDisplayStatus,
}) {
  // Add learning status to card
  const updatedCardArr = currentCardArr.map((card) => {
    let testingStatus = "notTestedYet";
    const foundStatus = statusArray?.find((status) => {
      return status.c === card.id;
    });
    if (foundStatus && foundStatus.r === 1) {
      testingStatus = "passed";
    } else if (foundStatus && foundStatus.r !== 1) {
      testingStatus = "failed";
    }
    return { ...card, status: testingStatus };
  });
  return (
    <ul className="grid grid-cols-5 gap-2">
      {updatedCardArr.map((item, index) => {
        return (
          <li
            key={`selectcardbtn-${index}`}
            onClick={() => {
              instanceRef.current?.moveToIdx(index);
            }}
            className={`bg-white h-9 cursor-pointer rounded flex items-center px-1 border  ${
              currentSlide === index ? `${styles.active}` : "border-slate-400"
            } relative overflow-hidden`}
          >
            <p className="truncate text-xs w-full text-center select-none">
              {item.term}
            </p>
            {isDisplayStatus && <StatusIndicator status={item.status} />}
          </li>
        );
      })}
    </ul>
  );
}

const StatusIndicator = ({ status }) => {
  return (
    <div
      status={status}
      className={`${styles.statusFlag} absolute bottom-0 right-0 rotate-45 translate-x-1/2 translate-y-1/2 w-3 h-3 `}
    ></div>
  );
};
