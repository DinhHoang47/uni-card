"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

export default function HomeBanner() {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div className="home-banner">
      {/* Desktop Banner */}
      {!loaded && (
        <div className="sm:hidden w-full h-full">
          <Image
            className="w-full"
            alt="Slide1"
            height={140}
            width={380}
            src={"/assets/images/Slide1.png"}
          />
        </div>
      )}
      {/* Desktop */}
      <div className="hidden sm:flex desktop-banner">
        <Image
          alt="Home Banner"
          width={1376}
          height={171}
          src={"/assets/images/HomeBanner.png"}
        />
      </div>
      {/* Mobile Banner */}
      <div className={`sm:hidden rounded-lg`}>
        <div
          ref={sliderRef}
          className={`keen-slider rounded-lg ${loaded ? "" : "h-0"}`}
        >
          <div className="keen-slider__slide">
            <Image
              className="w-full"
              alt="Slide1"
              height={140}
              width={380}
              src={"/assets/images/Slide1.png"}
            />
          </div>
          <div className="keen-slider__slide">
            <Image
              className="w-full"
              alt="Slide2"
              height={140}
              width={380}
              src={"/assets/images/Slide2.png"}
            />
          </div>
          <div className="keen-slider__slide">
            <Image
              className="w-full"
              alt="Slide3"
              height={140}
              width={380}
              src={"/assets/images/Slide3.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
