import styles from "./styles.module.css";
export default function ResultList() {
  const data = [
    {
      selected: true,
      active: false,
      passed: false,
    },
    {
      selected: true,
      active: false,
      passed: false,
    },
    {
      selected: true,
      active: false,
      passed: false,
    },
    {
      selected: true,
      active: false,
      passed: false,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: true,
    },
    {
      selected: true,
      active: false,
      passed: false,
    },
    {
      selected: true,
      active: false,
      passed: false,
    },
  ];
  const buttonPerRow = 10;
  const rowsNumber = Math.ceil(data.length / buttonPerRow);
  const Rows = [];
  for (let i = 0; i < rowsNumber; i++) {
    const startIndex = i * buttonPerRow;
    const endIndex = (i + 1) * buttonPerRow;
    const renderData = data.slice(startIndex, endIndex);
    const renderLength = renderData.length;
    const Row = (
      <ul
        key={`button-list-${i}`}
        className={`${
          i > 0 ? "mt-2" : ""
        } flex items-center space-x-2 sm:space-x-3 ${
          renderLength < buttonPerRow ? "" : ""
        }`}
      >
        {renderData.map((item, index) => (
          <li
            key={`card-select-btn-${index + buttonPerRow * i}`}
            className={`h-7 w-7 border-2 flex items-center justify-center rounded border-slate-400 cursor-pointer ${
              item.passed ? styles.correct : styles.fail
            }`}
          >
            {index + 1 + buttonPerRow * i}
          </li>
        ))}
      </ul>
    );
    Rows.push(Row);
  }
  return Rows;
}
