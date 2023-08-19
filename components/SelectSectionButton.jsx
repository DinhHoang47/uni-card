export default function SelectSectionButton({ selected }) {
  return (
    <li
      onTransitionEnd={(e) => {
        e.stopPropagation();
      }}
      className={`h-9 border ${
        selected ? "bg-blue-500 text-white" : ""
      } border-slate-400  w-24 rounded hover:bg-blue-500 hover:text-white flex items-center justify-center cursor-pointer transition-all duration-300`}
    >
      <span className="font-semibold">1 ~ 10</span>
    </li>
  );
}
