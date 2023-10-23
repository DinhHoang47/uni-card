"use client";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import MobileCardLearn from "./MobileCardLearn";
import SelectCardSection from "../../SelectCardSection";

export default function MobilePlayground({ currentCardArr, displayOptions }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // Local state
  const [slides, setSlides] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    []
  );

  useEffect(() => {
    instanceRef.current?.update();
  }, [currentCardArr]);

  return (
    <div className="relative  w-full">
      <KeenSlider
        displayOptions={displayOptions}
        sliderRef={sliderRef}
        instanceRef={instanceRef}
        loaded={loaded}
        currentSlide={currentSlide}
        currentCardArr={currentCardArr}
      />
      <div className="card_selection p-2">
        <SelectCardSection currentCardArr={currentCardArr} />
      </div>
    </div>
  );
}

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

const KeenSlider = ({
  sliderRef,
  instanceRef,
  loaded,
  currentSlide,
  currentCardArr,
  displayOptions,
}) => {
  return (
    <>
      <div className="relative py-1">
        <div ref={sliderRef} className="keen-slider">
          {currentCardArr?.map((item) => (
            <div key={item.id} className="keen-slider__slide">
              <MobileCardLearn displayOptions={displayOptions} data={item} />
            </div>
          ))}
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
                instanceRef.current?.track?.details?.slides?.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current?.track?.details?.slides.length).keys(),
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
    </>
  );
};
