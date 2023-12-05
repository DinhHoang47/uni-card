import styles from "./styles.module.css";
import FlashcardSlider from "./components/FlashcardSlider";
import Image from "next/image";
import img_section2_1 from "@public/assets/images/features/img_section2_1.png";
import img_section2_2 from "@public/assets/images/features/img_section2_2.png";
import img_section2_3 from "@public/assets/images/features/img_section2_3.png";
import img_section2_4 from "@public/assets/images/features/img_section2_4.png";
import img_section2_brain from "@public/assets/images/features/img_section2_brain.png";
import Link from "next/link";
import Footer from "@components/Footer";

const Section2ItemsData = [
  {
    id: "1",
    title: "Create Your Decks",
    content:
      "Start by creating personalized collections based on your learning goals.",
    image: img_section2_1,
    color: "bg-orange-100",
  },
  {
    id: "2",
    title: "Create Rich Content",
    content:
      "Unicard allow you to flashcards with rich content such as images, examples, and pronunciation fields.",
    image: img_section2_2,
    color: "bg-lime-100",
  },
  {
    id: "3",
    title: "Customize Your Study Session",
    content:
      "You can divide your term deck into a specific number of terms per section for learning and tracking it according to your own schedule.",
    image: img_section2_3,
    color: "bg-green-100",
  },
  {
    id: "4",
    title: "Track Your Progress",
    content: "Stay motivated by tracking your progress over time.",
    image: img_section2_4,
    color: "bg-sky-100",
  },
];

export const metadata = {
  alternates: {
    canonical: "/features/flashcards",
  },
  title: "Features - Unicard",
  description:
    "Enhance language skills with Unicard. Track progress, master new words through interactive flashcards. Start your language journey now!",
};

export default function page() {
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </>
  );
}

const Header = () => {
  return (
    <section
      className={`${styles.sectionStyle} mx-auto max-w-4xl mt-10 px-4 py-10`}
    >
      <article className="text-center space-y-4">
        <h1 className="text-blue-600 text-3xl font-semibold">
          Master Your Vocabulary with Flashcards
        </h1>
        <p className="max-w-2xl mx-auto">
          Welcome to the world of efficient and personalized learning! If you're
          on a quest to expand your vocabulary, master new languages, or simply
          enhance your knowledge in any field, you've come to the right place.
          Our flashcard study method is designed to make learning engaging,
          effective, and tailored to your unique learning style.
        </p>
      </article>
    </section>
  );
};

const Section1 = () => {
  return (
    <section className={`${styles.sectionStyle} bg-blue-50 py-10`}>
      <div className="px-4  max-w-4xl  mx-auto grid grid-cols-1 sm:grid-cols-2 space-x-4">
        <article className="space-y-2 pl-4 py-4">
          <h2 className="font-semibold text-xl">The Power of Flashcards</h2>
          <p className="pl-2">
            Flashcards have stood the test of time as a proven study tool, and
            for good reason. This method capitalizes on the principles of active
            recall and spaced repetition, helping you reinforce your memory and
            solidify your grasp on new information.
          </p>
        </article>
        <div className="flex justify-center py-4">
          <FlashcardSlider />
        </div>
      </div>
    </section>
  );
};

const Section2 = () => {
  return (
    <section className={`${styles.sectionStyle} bg-white py-10`}>
      <div className="px-4  max-w-4xl  mx-auto grid grid-cols-1 sm:grid-cols-2 space-x-4">
        <div className="flex justify-center py-4">
          <Image alt="Brain image" width={180} src={img_section2_brain} />
        </div>
        <article className="space-y-2 pl-4 py-4">
          <h2 className="font-semibold text-xl">
            Your Personalized Flashcards
          </h2>
          <p className="pl-2">
            With our flashcard app, you are in control of your learning
            experience. Here's how you can make the most of the flashcard study
            method:
          </p>
        </article>
      </div>
      <div className="px-4  max-w-4xl  mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        {Section2ItemsData.map((item) => (
          <Section2Item data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

const Section2Item = ({ data }) => {
  return (
    <div className="">
      <div
        className={`${styles.section2Shadow} px-2 flex flex-col items-center justify-center py-5 rounded-lg space-y-4 ${data.color}`}
      >
        <div className="flex items-center justify-center bg-blue-500 rounded-full h-8 w-8 ">
          <p className="text-center text-white">{data.id}</p>
        </div>
        <h3 className="font-semibold text-lg">{data.title}</h3>
        <div className="rounded-md overflow-hidden border border-blue-400">
          <Image
            alt="Feature image"
            className=""
            quality={100}
            unoptimized
            width={320}
            src={data.image}
          />
        </div>
        <p className="max-w-[240px] text-center h-20 text-sm">{data.content}</p>
      </div>
    </div>
  );
};

const Section3 = () => {
  return (
    <section className={`${styles.sectionStyle} bg-blue-50 py-10`}>
      <div className="px-4  max-w-4xl  mx-auto grid grid-cols-1 sm:grid-cols-2 space-x-4">
        <article className="space-y-2 pl-4 py-4">
          <h2 className="font-semibold text-xl">Get Started Today!</h2>
          <p className="pl-2">
            Embark on a journey of knowledge and skill enhancement with our
            flashcard study method.
          </p>
        </article>
        <div className="flex justify-center items-center py-4">
          <Link
            href={"/mypage"}
            className="px-4 bg-blue-600 text-white h-12 rounded-md flex items-center"
          >
            <span>Start using now (for Free)</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
