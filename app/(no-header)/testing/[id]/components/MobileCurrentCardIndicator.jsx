export default function MobileCurrentCardIndicator() {
  const data = [
    { active: false, answer: true },
    { active: false, answer: true },
    { active: false, answer: true },
    { active: false, answer: true },
    { active: false, answer: true },
    { active: false, answer: true },
    { active: true, answer: true },
    { active: false, answer: false },
    { active: false, answer: false },
    { active: false, answer: false },
  ];
  return (
    <ul className="grid grid-cols-10 gap-2">
      {data.map((item, index) => {
        return (
          <li
            key={`${index + 1}-selection`}
            className={`w-5 h-5 border-2 rounded  ${
              item.active ? "border-blue-500" : "border-slate-400"
            } ${item.answer ? "bg-blue-300" : "bg-gray-100"}`}
          ></li>
        );
      })}
    </ul>
  );
}
