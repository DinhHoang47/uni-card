"use client";
import Link from "next/link";
import CollectionCard from "./CollectionCard";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

export default function ResponsiveCollectionsList() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
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
    <div className="space-y-3 ">
      <div className="flex justify-between">
        <h4 className="font-semibold text-2xl">Collections title</h4>
        <Link className="hover:underline" href={"#"}>
          View All
        </Link>
      </div>
      {/* Destop View */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
      {/* Mobile View */}
      <div className="relative block sm:hidden">
        <>
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              <div className="keen-slider__slide number-slide1">
                <CollectionCard />
              </div>
              <div className="keen-slider__slide number-slide2">
                <CollectionCard />
              </div>
              <div className="keen-slider__slide number-slide3">
                <CollectionCard />
              </div>
              <div className="keen-slider__slide number-slide4">
                <CollectionCard />
              </div>
              <div className="keen-slider__slide number-slide5">
                <CollectionCard />
              </div>
              <div className="keen-slider__slide number-slide6">
                <CollectionCard />
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
            {/* Placeholder for dot when carousel is loading - prevent flickering */}
            {!loaded && <div className="h-[30px] w-full"></div>}
          </div>
          {loaded && instanceRef.current && (
            <div className="dots">
              {[
                ...Array(
                  instanceRef.current.track.details.slides.length
                ).keys(),
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
          {!loaded && (
            <div className="absolute top-0 rounded w-full h-full">
              <CollectionCard />
            </div>
          )}
        </>
      </div>
    </div>
  );
}
