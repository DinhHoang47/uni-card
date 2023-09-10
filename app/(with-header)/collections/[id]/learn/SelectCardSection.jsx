import styles from "./styles.module.css";
export default function SelectCardSection() {
  const cardList = [
    {
      passTest: true,
      selecting: true,
      active: true,
    },
    {
      passTest: true,
      selecting: true,
    },
    {
      passTest: true,
      selecting: true,
    },
    {
      passTest: true,
      selecting: true,
    },

    {
      passTest: true,
      selecting: true,
    },
    {
      passTest: true,
      selecting: true,
    },
    {
      passTest: true,
      selecting: true,
    },
    {
      passTest: false,
      selecting: true,
    },
    {
      passTest: false,
      selecting: true,
    },
    {
      passTest: false,
      selecting: true,
    },
  ];
  return (
    <ul className="grid grid-cols-5 gap-2">
      {cardList.map((item, index) => (
        <li
          key={`selectcardbtn-${index}`}
          onClick={() => {}}
          className={`bg-white h-9 cursor-pointer rounded flex items-center px-1 border-2  ${
            item.active === true ? `${styles.active}` : "border-slate-400"
          } relative overflow-hidden`}
        >
          <p className="truncate text-xs w-full text-center">漢字</p>
          <span
            className={`absolute bottom-0 right-0 w-5 h-5 translate-x-1/2 translate-y-1/2   ${
              item.passTest === true ? `${styles.btnPass}` : `${styles.btnFail}`
            }`}
          ></span>
        </li>
      ))}
    </ul>
  );
}
