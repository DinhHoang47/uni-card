// ProgressComponent.tsx
import { useLearningStatus } from "@lib/useLearningStatus";
import styles from "./styles.module.css";

import { useState, useEffect } from "react";
import { useCard } from "@lib/useCard";

const ProgressComponent = ({ collectionId }) => {
  // Fetched data
  const { data: learningStatus, mutate } = useLearningStatus(collectionId);
  const { data: cards, mutate: mutateCard } = useCard(collectionId);
  const TestResult = learningStatus?.test_result;
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState({passed:0,totalTerms:0});

  // Check if current user is learning this collection
  useEffect(() => {
    // If user not current learning this hide status 
    if (learningStatus != undefined ) {
      setShowProgress(true);
    }
  }, [learningStatus,cards]);

  useEffect(() => {
    // Get {passed,totalTerms} from the calculator
    const calculatedProgress = handleCalculate(cards, learningStatus);
    // Set the progress value 
    setProgress({passed:calculatedProgress.passed,totalTerms:calculatedProgress.totalTerms})
  }, [cards, learningStatus]);

  if (showProgress) {
    return (
      <div className={`${styles.progressBarContainer} space-y-1 `}>
        <div className="inline-block">
          <p className="font-semibold">Progress status</p>
        </div>
        <div className={styles.progressBar}>
          <div
            style={{ width: `${(progress.passed/progress.totalTerms)*100}%` }}
            className={styles.progressIndicator}
          ></div>
        </div>
        <div className="inline-block">
          <p>
            Need to review <span>{`${progress.totalTerms - progress.passed}/${progress.totalTerms}`}</span>
          </p>
        </div>
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
    total = idArr.length
    console.log('idArr: ', idArr);
    // Get test result array
    const resultArr = learningStatus.test_result
    console.log('resultArr: ', resultArr);
    // Loop throw all result array and find if that result still existing in current terms id (card)
    resultArr.forEach((item)=>{
      // If the result id existing in current terms id list then check if user passed (r=1) or failed (r=0)
      if(idArr.includes(item.c)){
        console.log(item.r);
          if(item.r === 1){
            passed++;
          }
      }
    })
  } 
  return { passed, totalTerms: total };
};
