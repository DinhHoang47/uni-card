"use client";
import { useKeenSlider } from "keen-slider/react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

const slidesData = [
  {
    id: "1",
    title: "Create Your Decks",
    content:
      "Start by creating personalized collections based on your learning goals.",
  },
  {
    id: "2",
    title: "Create Rich Content",
    content:
      "Unicard allow you to flashcards with rich content such as images, examples, and pronunciation fields.",
  },
  {
    id: "3",
    title: "Customize Your Study Session",
    content:
      "You can divide your term deck into a specific number of terms per section for learning and tracking it according to your own schedule.",
  },
  {
    id: "4",
    title: "Track Your Progress",
    content: "Stay motivated by tracking your progress over time.",
  },
];

const changeSlideTime = 4000;
const FlipCardTime = 2000;
export default function FlashcardSlider() {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {},
      loop: true,
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
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <FrontSide data={data} />
        <BackSide data={data} />
      </ReactCardFlip>
    </div>
  );
};

const FrontSide = ({ data }) => {
  return (
    <div className={`${styles.cardStyle}`}>
      <div className="m-auto">
        <p className="text-lg font-semibold">Banana</p>
      </div>
    </div>
  );
};

const BackSide = ({ data }) => {
  return (
    <div className={`${styles.cardStyle}`}>
      <p className="mb-4">bə'nænə</p>
      <Image
        alt="Image"
        className="mb-4"
        height={60}
        width={60}
        src={
          "https://res.cloudinary.com/unicard/image/upload/v1699953665/cards/blob_tt5d0z.jpg"
        }
      />
      <p className="text-lg mb-2 font-semibold">バナナ</p>
      <p className="text-sm">A bench of bananas</p>
    </div>
  );
};
