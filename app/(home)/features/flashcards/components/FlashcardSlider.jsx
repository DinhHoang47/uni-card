"use client";
import { useKeenSlider } from "keen-slider/react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

const slidesData = [
  {
    id: "1",
    term: "Apple",
    def1: "林檎",
    def2: "/'æpl/",
    exam: "A round green or red fruit",
    img: "https://res.cloudinary.com/unicard/image/upload/v1700103735/cards/apple-0103735449.png",
  },
  {
    id: "2",
    term: "Broccoli",
    def1: "ブロッコリー",
    def2: "/ˈbrɒk·ə·li/",
    exam: "A green vegetable with a thick stem",
    img: "https://res.cloudinary.com/unicard/image/upload/v1700103813/cards/broccoli-0103813061.png",
  },
  {
    id: "3",
    term: "Burger",
    def1: "バーガー",
    def2: "/ˈbɜː·ɡər/",
    exam: "Meat that is cooked in a round",
    img: "https://res.cloudinary.com/unicard/image/upload/v1700103944/cards/burger-0103944259.png",
  },
  {
    id: "4",
    term: "Carrot",
    def1: "ニンジン",
    def2: "/ˈkær·ət/",
    exam: "A long, thin, orange vegetable that grows in the ground",
    img: "https://res.cloudinary.com/unicard/image/upload/v1700104155/cards/carrot-0104155307.png",
  },
];

const changeSlideTime = 4000;
const FlipCardTime = 2000;
export default function FlashcardSlider() {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {},
      loop: false,
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
          }, changeSlideTime);
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
    <div ref={sliderRef} className={` keen-slider py-2 rounded-md`}>
      {slidesData.map((item, index) => (
        <SlideItem data={item} key={index} />
      ))}
    </div>
  );
}

const SlideItem = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlipped((pre) => !pre);
    }, FlipCardTime);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="keen-slider__slide rounded-lg">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <FrontSide data={data} />
        <BackSide data={data} />
      </ReactCardFlip>
    </div>
  );
};

const FrontSide = ({ data }) => {
  return (
    <div className="flex items-center justify-center py-2">
      <div className={`${styles.cardStyle}`}>
        <div className="m-auto">
          <p className="text-lg font-semibold">{data?.term}</p>
        </div>
      </div>
    </div>
  );
};

const BackSide = ({ data }) => {
  return (
    <div className="flex items-center justify-center py-2">
      <div className={`${styles.cardStyle} text-center`}>
        <p className="mb-4">{data?.def2}</p>
        <Image
          alt="Image"
          className="mb-4"
          height={60}
          width={60}
          src={
            data?.img ||
            "https://res.cloudinary.com/unicard/image/upload/v1700104155/cards/carrot-0104155307.png"
          }
        />
        <p className="text-lg mb-2 font-semibold">{data?.def1}</p>
        <p className="text-sm">{data?.exam}</p>
      </div>
    </div>
  );
};
