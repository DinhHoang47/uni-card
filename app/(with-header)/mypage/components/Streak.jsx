"use client";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Streak() {
  return (
    <div className="">
      {/* Title */}
      <div className="">
        <h3 className="font-semibold text-lg">Streak</h3>
      </div>
      {/* Streak grid */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        <div className="flex h-40 bg-white rounded-md border pr-4 border-gray-300">
          <div className="relative flex items-center">
            <Player
              autoplay
              loop
              src={"/assets/images/fire-2.json"}
              style={{ height: "120px", width: "120px" }}
            ></Player>
            <div className=" font-semibold text-xl absolute top-1/2 left-1/2 -translate-y-2 -translate-x-1/2 text-[#f53d67]">
              5
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-2 ">
            <div className="font-semibold">5-streak days</div>
            <div className="">
              Study <span className="font-semibold">tomorrow</span> to keep your
              streak going!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
