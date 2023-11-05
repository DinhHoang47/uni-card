import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { privateUserServ } from "@services/Private_UserService";
import { useLearningStatus } from "@lib/useLearningStatus";
export default function TestingGround({
  testingMode,
  answerArr,
  setAnswerArr,
  currentQuiz,
  setCurrentQuiz,
  quizArr,
  inputMode,
  setResultArr,
  setOpenResultModal,
  collectionId,
}) {
  // Fetched data
  const totalQuiz = quizArr.length;
  const { data: learningStatus, mutate: mutateLearningStatus } =
    useLearningStatus(collectionId);
  // Local state
  const [answeredAllQuiz, setAnsweredAllQuiz] = useState(false);
  // Hanlder
  const findNotYetAnswered = () => {
    if (answerArr.length === 0) return true;
    const isNotAnsweredQuiz = answerArr.some((ans) => ans.answerIndex === null);
    return isNotAnsweredQuiz;
  };
  // Effect
  useEffect(() => {
    // Update if user input all anwser state
    const notAllAnswered = findNotYetAnswered();
    if (!notAllAnswered) {
      setAnsweredAllQuiz(true);
    } else {
      setAnsweredAllQuiz(false);
    }
  }, [JSON.stringify(answerArr)]);

  return (
    <div className="max-w-md mx-auto">
      <TestingCard currentQuiz={currentQuiz} quizArr={quizArr} />
      <AnswerInput
        setAnsweredAllQuiz={setAnsweredAllQuiz}
        setAnswerArr={setAnswerArr}
        answerArr={answerArr}
        quizArr={quizArr}
        currentQuizId={currentQuiz}
        inputMode={inputMode}
        testingMode={testingMode}
        setCurrentQuiz={setCurrentQuiz}
        totalQuiz={totalQuiz}
      />
      <div className="mt-4">
        <div className="">
          <div className="flex space-x-2">
            <NotSureButton
              answerArr={answerArr}
              setAnswerArr={setAnswerArr}
              currentQuiz={currentQuiz}
              setCurrentQuiz={setCurrentQuiz}
              totalQuiz={totalQuiz}
            />
            <NextButton
              answerArr={answerArr}
              totalQuiz={totalQuiz}
              setCurrentQuiz={setCurrentQuiz}
              currentQuiz={currentQuiz}
            />
          </div>
          <div className="mt-4">
            <SubmitButton
              setResultArr={setResultArr}
              answeredAllQuiz={answeredAllQuiz}
              quizArr={quizArr}
              answerArr={answerArr}
              setOpenResultModal={setOpenResultModal}
              collectionId={collectionId}
              learningStatus={learningStatus}
              mutateLearningStatus={mutateLearningStatus}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ButtonSection
          setCurrentQuiz={setCurrentQuiz}
          currentQuiz={currentQuiz}
          totalQuiz={totalQuiz}
          answerArr={answerArr}
        />
      </div>
    </div>
  );
}

const TestingCard = ({ currentQuiz, quizArr }) => {
  const currentQuizData = quizArr.find((item) => item.id === currentQuiz);
  return (
    <div className="h-60 rounded-lg cursor-pointer">
      <div className="rounded-lg h-full bg-white flex items-center justify-center p-10 border border-slate-400">
        <div className="text-4xl">{currentQuizData?.quiz}</div>
      </div>
    </div>
  );
};

const AnswerInput = ({
  inputMode,
  quizArr,
  currentQuizId,
  answerArr,
  setAnswerArr,
  setCurrentQuiz,
  totalQuiz,
}) => {
  return (
    <div className="mt-4">
      {inputMode === "multiple-choice" ? (
        <SelectionInput
          setAnswerArr={setAnswerArr}
          answerArr={answerArr}
          quizArr={quizArr}
          currentQuizId={currentQuizId}
          setCurrentQuiz={setCurrentQuiz}
          totalQuiz={totalQuiz}
        />
      ) : (
        <TypingInput
          setAnswerArr={setAnswerArr}
          answerArr={answerArr}
          quizArr={quizArr}
          currentQuizId={currentQuizId}
          setCurrentQuiz={setCurrentQuiz}
          totalQuiz={totalQuiz}
        />
      )}
    </div>
  );
};

const SubmitButton = ({
  answeredAllQuiz,
  quizArr,
  answerArr,
  setResultArr,
  setOpenResultModal,
  collectionId,
  learningStatus,
  mutateLearningStatus,
}) => {
  return (
    <div className="w-full">
      <button
        onClick={() => {
          handleSubmitAns(
            quizArr,
            answerArr,
            setResultArr,
            setOpenResultModal,
            collectionId,
            learningStatus,
            mutateLearningStatus
          );
        }}
        disabled={!answeredAllQuiz}
        className={`w-full h-10 ${
          answeredAllQuiz ? "bg-teal-500" : "bg-teal-200"
        } text-white rounded-md font-semibold`}
      >
        Submit
      </button>
    </div>
  );
};

const SelectionInput = ({
  quizArr,
  currentQuizId,
  answerArr,
  setAnswerArr,
}) => {
  const currentAnswer = answerArr.find((ans) => ans.id === currentQuizId);
  const currentQuiz = quizArr.find((quiz) => quiz.id === currentQuizId);
  const choiceArr = currentQuiz?.choices;
  // Fetched state
  // Local state
  // Handler

  const handleAnswerSelection = (selectedAns, index) => {
    const updatedAnswerArr = answerArr.map((item) => {
      if (item.id === currentQuiz.id) {
        return { ...item, answer: selectedAns, answerIndex: index };
      } else {
        return item;
      }
    });
    setAnswerArr(updatedAnswerArr);
  };
  return (
    <ul className="grid grid-cols-2 gap-2">
      {choiceArr?.map((item, index) => (
        <li
          onClick={(e) => {
            handleAnswerSelection(item, index);
          }}
          key={`input-answer-${index}`}
          className={`${
            index === currentAnswer?.answerIndex
              ? styles.selected
              : "border-slate-400"
          } cursor-pointer bg-white px-1 py-2 h-full rounded-md  border flex items-center justify-center text-center line-clamp-2 `}
        >
          <p className="line-clamp-2">{item}</p>
        </li>
      ))}
    </ul>
  );
};

const TypingInput = ({ setAnswerArr, answerArr, currentQuizId }) => {
  // Fetched data
  const currentAns = answerArr.find((ans) => {
    return ans.id == currentQuizId;
  });
  let currentAnsString = "";
  if (currentAns && currentAns.answer) {
    currentAnsString = currentAns.answer;
  }
  // Handler
  const handleInputChange = (e) => {
    const trimmedInput = e.target.value.trim();
    if (trimmedInput) {
      const updatedAnsArr = answerArr.map((ans) => {
        if (ans.id !== currentQuizId) {
          return ans;
        } else {
          return { ...ans, answer: e.target.value, answerIndex: 1 };
        }
      });
      setAnswerArr(updatedAnsArr);
    } else {
      const updatedAnsArr = answerArr.map((ans) => {
        if (ans.id !== currentQuizId) {
          return ans;
        } else {
          return { ...ans, answer: null, answerIndex: null };
        }
      });
      setAnswerArr(updatedAnsArr);
    }
  };
  return (
    <div className="mt-4">
      <div className="bg-white rounded-md border border-slate-400 px-2 py-2">
        <input
          value={currentAnsString}
          onChange={handleInputChange}
          className="w-full text-center h-10 text-xl outline-none"
          placeholder="Definition"
          type="text"
        />
      </div>
    </div>
  );
};

const ButtonSection = ({
  totalQuiz,
  answerArr,
  currentQuiz,
  setCurrentQuiz,
}) => {
  const Rows = [];
  const buttonPerRow = 10;
  const rowsNumber = Math.ceil(totalQuiz / buttonPerRow);
  for (let i = 0; i < rowsNumber; i++) {
    const startIndex = i * buttonPerRow;
    const endIndex = (i + 1) * buttonPerRow;
    const renderData = answerArr.slice(startIndex, endIndex);
    const Row = (
      <ul
        key={`button-list-${i}`}
        className={`${
          i > 0 ? "mt-2" : ""
        } flex items-center space-x-3 justify-center`}
      >
        {renderData.map((item, index) => (
          <li
            onClick={() => {
              setCurrentQuiz(item.id);
            }}
            key={`card-select-btn-${index + buttonPerRow * i}`}
            className={`h-8 w-8 border flex items-center justify-center rounded border-slate-400 cursor-pointer ${
              item.id === currentQuiz && styles.active
            } ${
              item.answerIndex !== null &&
              item.answerIndex !== -1 &&
              styles.selected
            } ${item.answerIndex === -1 && styles.notSure}`}
          >
            {index + 1 + buttonPerRow * i}
          </li>
        ))}
      </ul>
    );
    Rows.push(Row);
  }
  return Rows;
};

const NextButton = ({ setCurrentQuiz, currentQuiz, totalQuiz, answerArr }) => {
  let answerSelected = false;
  const currentAns = answerArr?.find((ans) => ans.id === currentQuiz);
  if (currentAns?.answerIndex !== null) {
    answerSelected = true;
  }

  return (
    <button
      disabled={!answerSelected}
      onClick={() => {
        if (currentQuiz < totalQuiz) {
          setCurrentQuiz(currentQuiz + 1);
        } else {
          setCurrentQuiz(1);
        }
      }}
      className={`h-10 ${
        answerSelected ? "bg-blue-500" : "bg-blue-200"
      }  w-full font-semibold text-white rounded-md`}
    >
      Next
    </button>
  );
};

const NotSureButton = ({
  answerArr,
  setAnswerArr,
  currentQuiz,
  totalQuiz,
  setCurrentQuiz,
}) => {
  const handleNotSure = () => {
    // If user not sure set the answer index = -1
    const updatedAnsArr = answerArr.map((ans) => {
      if (ans.id !== currentQuiz) {
        return ans;
      } else {
        return { ...ans, answerIndex: -1 };
      }
    });
    setAnswerArr(updatedAnsArr);
    if (currentQuiz < totalQuiz) {
      setCurrentQuiz(currentQuiz + 1);
    }
  };
  return (
    <div className="w-full">
      <button
        onClick={handleNotSure}
        className="h-10 w-full bg-orange-400 font-semibold text-white rounded-md"
      >
        Not sure
      </button>
    </div>
  );
};

const handleSubmitAns = async (
  quizArr,
  answerArr,
  setResultArr,
  setOpenResultModal,
  collectionId,
  learningStatus,
  mutateLearningStatus
) => {
  const updatedTestResult = [...learningStatus?.test_result];
  // Check current input answer to generate the test result
  const resultArr = quizArr.map((quiz, index) => {
    if (answerArr[index].answer === null) {
      return { c: quiz.cardId, r: 0 };
    }
    const correctAns = quiz.answer.toLowerCase();
    const inputAns = answerArr[index].answer.toLowerCase();
    if (correctAns === inputAns) {
      return { c: quiz.cardId, r: 1 };
    } else {
      return { c: quiz.cardId, r: 0 };
    }
  });
  // Loop through current test result and set new test result , if not there yet push new record

  resultArr.forEach((currentAns) => {
    const foundAnsIndex = updatedTestResult.findIndex(
      (previousAns) => previousAns.c === currentAns.c
    );
    // If found old result update it
    if (foundAnsIndex !== -1) {
      updatedTestResult[foundAnsIndex].p = currentAns.p;
    } else {
      // If not found old result then push new item to the result
      updatedTestResult.push({
        c: currentAns.c,
        r: currentAns.r,
      });
    }
  });

  const result = await privateUserServ()
    .updateTestResult(collectionId, updatedTestResult)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
  mutateLearningStatus();
  setResultArr(resultArr);
  setOpenResultModal(true);
};
