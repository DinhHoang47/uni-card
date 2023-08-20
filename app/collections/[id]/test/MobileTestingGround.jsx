"use client";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import MobileCardStudy from "../../../../components/MobileCardStudy";

export default function MobileTestingGround() {
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
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide">
            <MobileCardStudy />
          </div>
          <div className="keen-slider__slide">
            <MobileCardStudy />
          </div>
          <div className="keen-slider__slide">
            <MobileCardStudy />
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
      {/* Input Anwser */}
      <div className="px-2 py-4">
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
            placeholder="Meaning"
            type="text"
          />
        </div>
      </div>
      {/* Actions Button */}
      <div className="px-2 mt-4">
        <button className="h-10 bg-blue-500 w-full font-semibold text-white rounded-md">
          Next
        </button>
      </div>
    </div>
  );
}
