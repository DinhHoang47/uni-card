import styles from "../styles.module.css";

export const StatusIndicator = ({ currentCardArr, testingStatus }) => {
  let notTestedNums = 0;
  let passedTestNums = 0;
  let failedTestNums = 0;
  currentCardArr?.forEach((card) => {
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
      {currentCardArr?.map((item, index) => {
        const status = statusArr[index];
        return <li key={item.id} status={status}></li>;
      })}
    </ul>
  );
};
