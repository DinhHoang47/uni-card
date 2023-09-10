import AnswerInput_1 from "../components/AnswerInput_1";
import AnswerInput_2 from "../components/AnswerInput_2";
import AnswerInput_Choice from "../components/AnswerInput_Choice";
import NextButton from "../components/NextButton";
import TestingCard_Back from "../components/TestingCard_Back";
import TestingCard_Front from "../components/TestingCard_Front";
import styles from "./styles.module.css";
export default function DesktopTestingGround({ testingMode, showMode }) {
  const data = [
    {
      selected: true,
      active: false,
    },
    {
      selected: true,
      active: false,
    },
    {
      selected: true,
      active: false,
    },
    {
      selected: false,
      active: true,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
    {
      selected: false,
      active: false,
    },
  ];
  const buttonPerRow = 10;
  const rowsNumber = Math.ceil(data.length / buttonPerRow);
  const ButtonSection = () => {
    const Rows = [];
    for (let i = 0; i < rowsNumber; i++) {
      const startIndex = i * buttonPerRow;
      const endIndex = (i + 1) * buttonPerRow;
      const renderData = data.slice(startIndex, endIndex);
      const renderLength = renderData.length;
      const Row = (
        <ul
          key={`button-list-${i}`}
          className={`${i > 0 ? "mt-2" : ""} flex items-center space-x-3 ${
            renderLength < buttonPerRow ? "mx-[10px]" : "justify-center"
          }`}
        >
          {renderData.map((item, index) => (
            <li
              key={`card-select-btn-${index + buttonPerRow * i}`}
              className={`h-8 w-8 border flex items-center justify-center rounded border-slate-400 cursor-pointer ${
                item.active && styles.active
              } ${item.selected && styles.selected}`}
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
  return (
    <div className=" hidden sm:block ">
      <div className="max-w-md mx-auto">
        {/* Card */}
        {showMode === "front" ? <TestingCard_Front /> : <TestingCard_Back />}
        {/* Input */}
        <div className="mt-4">
          {testingMode === "choice" ? (
            <AnswerInput_Choice />
          ) : showMode === "front" ? (
            <AnswerInput_2 />
          ) : (
            <AnswerInput_1 />
          )}
        </div>
        {/* Action */}
        <div className="mt-4">
          <NextButton />
        </div>
        {/* Status */}
        <div className="mt-8">
          <ButtonSection />
        </div>
      </div>
    </div>
  );
}
