"use client";

export default function TestingCard_Back() {
  const haveDefine2 = true;
  return (
    <div className="h-60 rounded-lg cursor-pointer">
      {/* Back */}
      <div className="relative w-full h-full rounded bg-white p-2 border border-slate-400">
        {/* Back side background */}
        <div
          style={{
            backgroundImage: `url(${``})`,
            backgroundSize: `160px 160px`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
          }}
          className={`h-full opacity-70 flex items-center`}
        ></div>
        {/* Absolute container */}
        <div
          className={`absolute top-0 left-0 h-full w-full flex flex-col ${
            haveDefine2 ? "justify-between" : "justify-center"
          } rounded p-2`}
        >
          {haveDefine2 ? (
            <div className=" text-gray-700 bg-white bg-opacity-90">
              <p className="text-center text-xl">KANJI</p>
            </div>
          ) : (
            <></>
          )}

          <div
            className={`text-gray-950  bg-white bg-opacity-70 space-y-1 ${
              haveDefine2 ? "pb-4" : ""
            } `}
          >
            <p className="text-center text-2xl font-semibold">Definition</p>
          </div>
        </div>
      </div>
    </div>
  );
}
