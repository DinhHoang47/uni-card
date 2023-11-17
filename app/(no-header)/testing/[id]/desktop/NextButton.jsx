export const NextButton = ({
  setCurrentQuiz,
  currentQuiz,
  totalQuiz,
  answerArr,
  quizArr,
}) => {
  console.log("answerArr: ", answerArr);

  // Find index of current quiz
  const currentQuizIndex = quizArr.findIndex((item) => item.id === currentQuiz);
  let nextQuizId;
  // If not reached the end quiz then set the next quiz id equel to next index item id
  if (currentQuizIndex < quizArr.length - 1) {
    nextQuizId = quizArr[currentQuizIndex + 1]?.id;
  } else {
    nextQuizId = quizArr[0]?.id;
  }
  let answerSelected = false;
  const currentAns = answerArr?.find((ans) => ans.id === currentQuiz);
  if (currentAns?.answerIndex !== null) {
    answerSelected = true;
  }

  return (
    <button
      disabled={!answerSelected}
      onClick={() => {
        setCurrentQuiz(nextQuizId);
        // setCurrentQuiz(quizArr[0].id);
      }}
      className={`h-10 ${
        answerSelected ? "bg-blue-500" : "bg-blue-200"
      }  w-full font-semibold text-white rounded-md`}
    >
      Next
    </button>
  );
};
