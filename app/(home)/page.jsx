"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@public/assets/images/unicard-logo.png";
import TopBannerImage from "@public/assets/images/mock-pc-mobile-unicard.png";
import Feature1Image from "@public/assets/images/Feature-Img-1-1.png";
import Feature2Image from "@public/assets/images/Feature-Img-1-2.png";
import Feature3Image from "@public/assets/images/Feature-Img-1-3.png";
import OtherFeature1Image from "@public/assets/images/Other-Feature-Image-1.png";
import OtherFeature2Image from "@public/assets/images/Other-Feature-Image-2.png";
import OtherFeature3Image from "@public/assets/images/Other-Feature-Image-3.png";
import OtherFeature4Image from "@public/assets/images/Other-Feature-Image-4.png";
import InstagramIcon from "@public/assets/icons/icon-instagram.svg";
import FacebookIcon from "@public/assets/icons/icon-facebook.svg";
import TwitterIcon from "@public/assets/icons/icon-twitter.svg";

import AmberButton from "@components/Buttons/AmberButton";

export default function Home() {
  return (
    <div className="w-full flex-center flex-col">
      <Nav />
      <TopBanner />
      <FeaturesSection />
      <OtherFeatures />
      <CallToActions />
      <SocialSection />
      <HomeFooter />
    </div>
  );
}

const Nav = () => {
  return (
    <div className="max-w-3xl flex justify-between w-full h-14 items-center px-4">
      <div className="flex items-center space-x-2 select-none">
        <Image sizes="40px" alt="Unicard logo" className="w-10" src={Logo} />
        <h1 className="logo_text font-vina text-xl">UniCard</h1>
      </div>
      <div className="">
        <Link href={"/auth"}>
          <AmberButton>Sign In</AmberButton>
        </Link>
      </div>
    </div>
  );
};

const FeaturesContent = [
  {
    number: 1,
    title: "Flashcards Simplified",
    description: `Create your own or explore available collections 
with Unicard's user-friendly interface.`,
    image: Feature1Image,
  },
  {
    number: 2,
    title: `Memory-Boosting Quizzes`,
    description: `Test your knowledge and reinforce your memory 
    with interactive quizzes tailored to your needs.`,
    image: Feature2Image,
  },
  {
    number: 3,
    title: `Track Your Progress`,
    description: `Monitor your memorization status
    and stay motivated with our status indicator.`,
    image: Feature3Image,
  },
];

const OtherFeaturesContent = [
  {
    number: 1,
    title: "Spaced Repetition",
    description: `Improving the status indicator with spaced repetition for optimized
    learning, along with a sleek new progress monitoring UI.`,
    image: OtherFeature1Image,
  },
  {
    number: 2,
    title: `Card UI Makeover`,
    description: `Enjoy a fresh, modern card interface for an even better learning experience.`,
    image: OtherFeature2Image,
  },
  {
    number: 3,
    title: `Varied Learning Modes`,
    description: `We'll adding more testing and learning modes to cater to your unique preferences.`,
    image: OtherFeature3Image,
  },
  {
    number: 4,
    title: `Text-to-Sound`,
    description: `For improved language pronunciation and learning`,
    image: OtherFeature4Image,
  },
];

const TopBanner = () => {
  return (
    <div className="w-full bg-white text-center">
      <div className="max-w-3xl w-full mx-auto flex justify-center items-center flex-col space-y-6 mt-10  px-4">
        <h2 className="font-bold text-blue-600 text-4xl">A better flashcard</h2>
        <h3 className="blue_gradient text-2xl font-bold">
          Effortlessly Memorize, Progress Tracking
        </h3>
        <p className="text-center font-serif text-lg">
          Unicard allows you to create collections of terms, quizzes to aid in
          memorization. It is particularly effective for language learning, test
          preparation, and more.
        </p>
        <CTAButton />
        <Image
          className="translate-y-10"
          src={TopBannerImage}
          alt="Top banner"
        />
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="bg-blue-50 w-full pb-10">
      <div className="max-w-3xl px-4 flex items-center flex-col justify-center mt-14 mx-auto w-full">
        <h3 className="text-center text-4xl font-semibold">Features</h3>
        <div className="mt-5 w-full space-y-10">
          {FeaturesContent.map((item) => {
            return (
              <Feature
                key={item.number}
                title={item.title}
                number={item.number}
                description={item.description}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Feature = ({ number, title, description, image }) => {
  return (
    <div className="bg-white flex flex-col items-center rounded-lg px-4 pt-4 space-y-3 shadow-md">
      <div className="w-10 h-10 flex items-center justify-center font-semibold text-xl text-blue-600 rounded-full bg-blue-200">
        <span>{number}</span>
      </div>
      <h4 className="font-semibold text-3xl text-center">{title}</h4>
      <p className="text-center max-w-md text-lg">{description}</p>
      <div className="w-96">
        <Image sizes="384px" quality={100} src={image} alt="Feature Image" />
      </div>
    </div>
  );
};

const OtherFeatures = () => {
  return (
    <div className="bg-white w-full pb-10">
      <div className="max-w-3xl px-4 mx-auto ">
        <h4 className="font-semibold text-4xl text-center mt-5">
          We Are Working On
        </h4>
        <div className="mt-5 w-full bg-blue-50 rounded-lg py-8 space-y-5 px-4 shadow-md">
          {OtherFeaturesContent.map((item) => {
            return (
              <OtherFeatureItem
                key={`other-feature-${item.number}`}
                title={item.title}
                image={item.image}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const OtherFeatureItem = ({ image, title, description }) => {
  return (
    <div className="flex items-center space-x-8 max-w-xl w-full mx-auto select-none">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-200 shrink-0">
        <div className="relative w-8 h-8 ">
          <Image
            sizes="32px"
            fill
            style={{ objectFit: "contain" }}
            alt="Other Feature"
            src={image}
          />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-xl">{title}</h4>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>
    </div>
  );
};

const CallToActions = () => {
  return (
    <div className="w-full bg-blue-50 py-10">
      <div className="max-w-3xl w-full mx-auto px-4">
        <div className="px-4 bg-white py-5 rounded-lg w-full flex flex-col items-center justify-center space-y-4 shadow-md">
          <div className="relative w-14 h-14">
            <Image
              fill
              sizes="56px"
              style={{ objectFit: "contain" }}
              alt="Unicard logo"
              src={Logo}
            ></Image>
          </div>
          <p className="text-lg text-center max-w-md">
            Try Unicard and supercharge your learning journey with flashcards
            today!
          </p>
          <CTAButton />
        </div>
      </div>
    </div>
  );
};

const CTAButton = () => {
  return (
    <Link
      className="h-12 bg-blue-500 hover:bg-blue-600 transition-all shadow font-semibold text-white rounded px-4 flex items-center"
      href={"/auth"}
    >
      {" "}
      Start using now (for Free)
    </Link>
  );
};

const SocialSection = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-4 py-10">
      <h4 className="text-4xl font-semibold">Follow us</h4>
      <div className="flex space-x-8">
        <Link href={"https://www.facebook.com/uni.card.flashcard"}>
          <div className="relative w-8 h-8">
            <Image
              sizes="32px"
              alt="Facebook icon"
              src={FacebookIcon}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <Link href={"#"}>
          <div className="relative w-8 h-8">
            <Image
              sizes="32px"
              alt="Instagram Icon"
              src={InstagramIcon}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <Link href={"#"}>
          <div className="relative w-8 h-8">
            <Image
              sizes="32px"
              alt="Twitter Icon"
              src={TwitterIcon}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

const HomeFooter = () => {
  return (
    <div className=" w-full border-t">
      <div className="max-w-3xl p-4 mx-auto text-gray-400">2023 © Unicard</div>
    </div>
  );
};
