import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Learn
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center"> Uni Cards</span>
      </h1>
      <p className="desc text-center">
        Unicard is an web application that allow you to lear Kanji and tracking
        your learning process
      </p>
      <div className="">
        <Link
          href={"/auth"}
          className="flex items-center justify-center bg-blue-600 font-semibold text-white h-10 px-5 rounded-md mt-10"
        >
          Get start
        </Link>
      </div>
    </section>
  );
}
