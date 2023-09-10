"use client";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import MobileCurrentCardIndicator from "../components/MobileCurrentCardIndicator";
import TestingCard_Front from "../components/TestingCard_Front";
import AnswerInput_Choice from "../components/AnswerInput_Choice";
import NextButton from "../components/NextButton";
import TestingCard_Back from "../components/TestingCard_Back";

export default function TestingGround_Choice({ showMode }) {
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
      {/* Input Answer */}
      <div className="mt-6 mx-2">
        <AnswerInput_Choice />
      </div>
      {/* Actions Button */}
      <div className="px-2 mt-4">
        <NextButton />
      </div>
    </div>
  );
}
