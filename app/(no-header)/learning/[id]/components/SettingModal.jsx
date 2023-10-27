"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";

export default function SettingModal({
  setIsOpen,
  id,
  hanger,
  currentSection,
}) {
  // Local state
  const speedLevel = {
    slow: 15,
    moderate: 10,
    fast: 5,
  };

  const router = useRouter();
  const [mode, setMode] = useState("multiple-choice");
  const [testing, setTesting] = useState("term");
  const [speed, setSpeed] = useState(speedLevel.moderate);

  const handleTest = () => {
    setIsOpen(false);
    router.push(
      `/testing/${id}?section=${`${currentSection?.startNumber}:${currentSection?.endNumber}`}&input=${mode}&testing=${testing}&time=${speed}`
    );
  };

  return (
    <PortalModalWrapper mountTarget={hanger}>
      {/* Main container */}
      <div className="p-6 rounded relative bg-white space-y-3">
        <div className="font-semibold text-lg text-center select-none">
          Select Test Mode
        </div>
        {/* Option 1 */}
        <div className="">
          <div className="">
            <p className="font-semibold">Testing</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            {/* Front Option */}
            <label
              htmlFor="testingModeRadio-One"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                checked={testing === "term"}
                className="h-0 w-0 opacity-0"
                id="testingModeRadio-One"
                type="radio"
                name="testingMode"
                value={"term"}
                onChange={(e) => {
                  setTesting(e.target.value);
                }}
              />
              <div className="w-32 h-16 border border-black justify-center items-center flex rounded">
                Term
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
            {/* Back Option */}
            <label
              htmlFor="testingModeRadio-Two"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                checked={testing === "definition"}
                className="h-0 w-0 opacity-0"
                id="testingModeRadio-Two"
                type="radio"
                name="showMode"
                value={"definition"}
                onChange={(e) => {
                  setTesting(e.target.value);
                }}
              />
              <div className="w-32 h-16 border border-black justify-around items-center flex flex-col rounded ">
                {/* <span>Pronunciation</span> */}
                <span>Definition</span>
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
          </div>
        </div>
        {/* Option 2 */}
        <div className="">
          <div className="">
            <p className="font-semibold">Input type</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <label
              htmlFor="inputModeRadio-One"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                checked={mode === "typing"}
                className="h-0 w-0 opacity-0"
                id="inputModeRadio-One"
                type="radio"
                name="inputMode"
                value={"typing"}
                onChange={(e) => {
                  setMode(e.target.value);
                }}
              />
              <div className="w-32 justify-center items-center flex flex-col">
                <Image
                  alt="text-box-image"
                  width={36}
                  height={36}
                  src={"/assets/images/text-box.png"}
                />
                <p className="text-xs">typing</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
            <label
              htmlFor="inputModeRadio-Two"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                className="h-0 w-0 opacity-0"
                id="inputModeRadio-Two"
                type="radio"
                name="inputMode"
                checked={mode === "multiple-choice"}
                value={"multiple-choice"}
                onChange={(e) => {
                  setMode(e.target.value);
                }}
              />
              <div className="w-32 justify-center items-center flex flex-col">
                <Image
                  alt="typing-image"
                  width={36}
                  height={36}
                  src={"/assets/images/test.png"}
                />
                <p className="text-xs">Multiple Choices</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
          </div>
        </div>
        {/* Option 3 */}
        <div className="">
          <div className="">
            <p className="font-semibold">Speed</p>
          </div>
          <div className="flex items-center justify-between space-x-4">
            {/* Slow */}
            <label
              htmlFor="speedModeRadio-One"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                checked={speed === speedLevel.slow}
                className="h-0 w-0 opacity-0"
                id="speedModeRadio-One"
                type="radio"
                name="speedMode"
                value={speedLevel.slow}
                onChange={(e) => {
                  setSpeed(e.target.value * 1);
                }}
              />
              <div className="w-16  justify-center items-center flex flex-col">
                <Image
                  alt="text-box-image"
                  width={36}
                  height={36}
                  src={"/assets/images/turtle.png"}
                />
                <p className="text-xs">Slow</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
            {/* Moderate */}
            <label
              htmlFor="speedModeRadio-Two"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                className="h-0 w-0 opacity-0"
                id="speedModeRadio-Two"
                type="radio"
                name="speedMode"
                checked={speed === speedLevel.moderate}
                value={speedLevel.moderate}
                onChange={(e) => {
                  setSpeed(e.target.value * 1);
                }}
              />
              <div className="w-16  justify-center items-center flex flex-col">
                <Image
                  alt="typing-image"
                  width={36}
                  height={36}
                  src={"/assets/images/hare.png"}
                />
                <p className="text-xs">Moderate</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
            {/* Fast */}
            <label
              htmlFor="speedModeRadio-Three"
              className={`${styles.container} flex flex-col items-center justify-center space-y-2 cursor-pointer`}
            >
              <input
                className="h-0 w-0 opacity-0"
                id="speedModeRadio-Three"
                type="radio"
                name="speedMode"
                checked={speed === speedLevel.fast}
                value={speedLevel.fast}
                onChange={(e) => {
                  setSpeed(e.target.value * 1);
                }}
              />
              <div className="w-16  justify-center items-center flex flex-col">
                <Image
                  alt="typing-image"
                  width={36}
                  height={36}
                  src={"/assets/images/cheetah.png"}
                />
                <p className="text-xs">Fast</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full bg-zinc-200 ${styles.checkMark}`}
              ></div>
            </label>
          </div>
        </div>
        {/* Actions */}
        <div className="!mt-8">
          <button
            onClick={handleTest}
            className="h-10 bg-blue-500 w-full text-white font-semibold rounded-md"
          >
            Test
          </button>
        </div>
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute !mt-0 top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-white w-8 h-8 border-2 border-gray-500 flex items-center justify-center rounded-full"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}
