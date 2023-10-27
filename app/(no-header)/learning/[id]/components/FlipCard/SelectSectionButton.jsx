import styles from "../styles.module.css";

export default function SelectSectionButton({
  data,
  setCurrentSection,
  currentSection,
  currentCardArr,
  testingStatus,
  cardArr,
}) {
  // Local state
  let selected = false;
  if (currentSection?.startNumber === data?.startNumber) {
    selected = true;
  }
  const thisButtonCardArr = cardArr.slice(
    data?.startNumber - 1,
    data?.endNumber
  );
  return (
    <li
      onClick={() => {
        setCurrentSection({
          startNumber: data?.startNumber,
          endNumber: data?.endNumber,
        });
      }}
      onTransitionEnd={(e) => {
        e.stopPropagation();
      }}
      className={`h-10 w-full border ${
        selected ? "bg-blue-600 text-white" : ""
      } relative border-blue-500  rounded hover:bg-blue-500  hover:text-white flex flex-col justify-end cursor-pointer transition-all duration-300`}
    >
      <span className="text-sm font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {data?.startNumber}
        <span className="text-xs">~</span>
        {data?.endNumber}
      </span>
      <StatusIndicator
        currentCardArr={thisButtonCardArr}
        testingStatus={testingStatus}
      />
    </li>
  );
}

const StatusIndicator = ({ currentCardArr, testingStatus }) => {
  let notTestedNums = 0;
  let passedTestNums = 0;
  let failedTestNums = 0;
  currentCardArr.forEach((card) => {
    const foundResult = testingStatus?.find((item) => {
      return item.cardId === card.id;
    });
    if (foundResult) {
      if (foundResult.passed === true) {
        passedTestNums++;
      } else {
        failedTestNums++;
      }
    } else {
      notTestedNums++;
    }
  });
  const statusArr = Array(passedTestNums)
    .fill("passed")
    .concat(Array(failedTestNums).fill("failed"))
    .concat(Array(notTestedNums).fill("notTested"));
  return (
    <ul className={`${styles.testingStatusList} w-full h-2 flex`}>
      {currentCardArr.map((item, index) => {
        const status = statusArr[index];
        return <li key={item.id} status={status}></li>;
      })}
    </ul>
  );
};
