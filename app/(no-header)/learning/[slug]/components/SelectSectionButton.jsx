import styles from "./styles.module.css";

export default function SelectSectionButton({ selected }) {
  return (
    <li
      onTransitionEnd={(e) => {
        e.stopPropagation();
      }}
      className={`h-10 border ${
        selected ? "bg-blue-600 text-white" : ""
      } relative border-blue-500  rounded hover:bg-blue-500  hover:text-white flex flex-col justify-end cursor-pointer transition-all duration-300`}
    >
      <span className="text-sm font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
        100<span className="text-xs">~</span>100
      </span>
      <ul className={`${styles.testingStatusList} w-full h-2 flex`}>
        <li status="failed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="passed"></li>
        <li status="failed"></li>
      </ul>
    </li>
  );
}
