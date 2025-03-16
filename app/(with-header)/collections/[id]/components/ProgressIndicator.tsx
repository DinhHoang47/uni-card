// ProgressComponent.tsx
import { useLearningStatus } from "@lib/useLearningStatus";
import styles from "./styles.module.css";

import { useState, useEffect } from "react";
import { useCard } from "@lib/useCard";

interface Progress {
  passed: number;
  totalTerms: number;
}

const ProgressComponent = ({ collectionId }: { collectionId: string }) => {
  // Fetched data
  const { data: learningStatus, mutate } = useLearningStatus(collectionId);
  const { data: cards, mutate: mutateCard } = useCard(collectionId);
  const TestResult = learningStatus?.test_result;
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState({ passed: 0, totalTerms: 0 });

  // Check if current user is learning this collection
  useEffect(() => {
    // If user not current learning this hide status
    if (learningStatus != undefined) {
      setShowProgress(true);
    }
  }, [learningStatus, cards]);

  useEffect(() => {
    // Get {passed,totalTerms} from the calculator
    const calculatedProgress = handleCalculate(cards, learningStatus);
    // Set the progress value
    setProgress({
      passed: calculatedProgress.passed,
      totalTerms: calculatedProgress.totalTerms,
    });
  }, [cards, learningStatus]);

  if (showProgress) {
    return (
      <div className={`${styles.progressBarContainer} space-y-1 `}>
        <div className="inline-block">
          <p className="font-semibold">Progress status</p>
        </div>
        {progress.totalTerms === 0 ? (
          <Placeholder progress={progress} />
        ) : (
          <ProgressBar progress={progress} />
        )}
      </div>
    );
  }
};

export default ProgressComponent;

const handleCalculate = (cards: Array<any>, learningStatus: any) => {
  let passed = 0;
  let total = 0;
  if (cards && learningStatus) {
    // Get id array of all cards
    const idArr = cards.map((item) => item.id);
    total = idArr.length;
    // Get test result array
    const resultArr = learningStatus.test_result;
    // Loop throw all result array and find if that result still existing in current terms id (card)
    // c abbrievation for card id, r for result
    resultArr.forEach((item: { c: string; r: number }) => {
      // If the result id existing in current terms id list then check if user passed (r=1) or failed (r=0)
      if (idArr.includes(item.c)) {
        if (item.r === 1) {
          passed++;
        }
      }
    });
  }
  return { passed, totalTerms: total };
};

const Placeholder = ({ progress }: { progress: Progress }) => {
  return (
    <div className="text-slate-500">
      <p>Add words to starts learning</p>
      <p>and your progress here 🚀</p>
    </div>
  );
};

const ProgressBar = ({ progress }: { progress: Progress }) => {
  return (
    <>
      <div className={styles.progressBar}>
        <div
          style={{
            width: `${(progress.passed / progress.totalTerms) * 100}%`,
          }}
          className={styles.progressIndicator}
        ></div>
      </div>
      <div className="inline-block">
        <p>
          Need to review{" "}
          <span>{`${progress.totalTerms - progress.passed}/${
            progress.totalTerms
          }`}</span>
        </p>
      </div>
    </>
  );
};
