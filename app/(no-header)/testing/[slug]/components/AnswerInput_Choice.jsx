import styles from "./styles.module.css";

export default function AnswerInput_Choice() {
  const data = [
    {
      answer: "Lorem ipsum",
      selected: true,
      correctAns: "Lorem ipsum",
    },
    {
      answer: "Lorem ipsum",
      selected: false,
      correctAns: "Lorem ipsum",
    },
    {
      answer: "Lorem ipsum",
      selected: false,
      correctAns: "Lorem ipsum",
    },
    {
      answer: "Lorem ipsum",
      selected: false,
      correctAns: "Lorem ipsum",
    },
  ];
  return (
    <ul className="grid grid-cols-2 gap-2">
      {data.map((item, index) => (
        <li
          key={`input-answer-${index}`}
          className={`${
            item.selected === true ? styles.selected : "border-slate-400"
          } cursor-pointer bg-white px-1 py-2 h-full rounded-md  border flex items-center justify-center text-center line-clamp-2 `}
        >
          <p className="line-clamp-2">{item.answer}</p>
        </li>
      ))}
    </ul>
  );
}
