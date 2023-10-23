import styles from "./styles.module.css";
export default function SelectCardSection({ currentCardArr }) {
  return (
    <ul className="grid grid-cols-5 gap-2">
      {currentCardArr.map((item, index) => (
        <li
          key={`selectcardbtn-${index}`}
          onClick={() => {}}
          className={`bg-white h-9 cursor-pointer rounded flex items-center px-1 border  ${
            item.active === true ? `${styles.active}` : "border-slate-400"
          } relative overflow-hidden`}
        >
          <p className="truncate text-xs w-full text-center">{item.term}</p>
        </li>
      ))}
    </ul>
  );
}

const StatusIndicator = ({ passedTest }) => {
  return (
    <span
      className={`absolute bottom-0 right-0 w-5 h-5 translate-x-1/2 translate-y-1/2   ${
        passedTest === true ? `${styles.btnPass}` : `${styles.btnFail}`
      }`}
    ></span>
  );
};
