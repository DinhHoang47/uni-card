export default function AnswerInput_2() {
  return (
    <div className="mt-4">
      <div className="bg-white rounded-md border border-slate-400 px-2 py-2">
        <input
          className="w-full text-center h-10 text-xl outline-none"
          placeholder="KANJI"
          type="text"
        />
        <div className="flex justify-center">
          <div className="w-40 h-[2px] bg-gray-300"></div>
        </div>
        <input
          className="w-full text-center h-10 text-xl"
          placeholder="Definition"
          type="text"
        />
      </div>
    </div>
  );
}
