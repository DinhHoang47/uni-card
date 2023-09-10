"use client";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import MobileCurrentCardIndicator from "../components/MobileCurrentCardIndicator";
import TestingCard_Front from "../components/TestingCard_Front";
import TestingCard_Back from "../components/TestingCard_Back";
import AnswerInput_2 from "../components/AnswerInput_2";
import AnswerInput_1 from "../components/AnswerInput_1";
import NextButton from "../components/NextButton";

export default function TestingGround_Writing({ showMode }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  function Arrow(props) {
    const disabeld = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  return (
    <div className="relative  w-full">
      {/* Card Select List */}
      <div className="card_selection p-2">
        <MobileCurrentCardIndicator />
      </div>
      {/* Card */}
      <div className="mt-4 px-2">
        {showMode === "front" ? <TestingCard_Front /> : <TestingCard_Back />}
      </div>
      {/* Input */}
      <div className="px-2">
        {showMode === "front" ? <AnswerInput_2 /> : <AnswerInput_1 />}
      </div>
      {/* Actions Button */}
      <div className="px-2 mt-4">
        <NextButton />
      </div>
    </div>
  );
}
