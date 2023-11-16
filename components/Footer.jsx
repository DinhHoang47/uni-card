import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-white  text-gray-400  h-14 w-full">
      <div className="max-w-[1440px] h-full w-full flex items-center justify-between sm:px-8 px-6">
        <p className="select-none">2023 © Unicard </p>
        <div className="space-x-4">
          <Link href={"/features/flashcards"}>Features</Link>
          <Link href={"/privacy"}>Privacy</Link>
        </div>
      </div>
    </div>
  );
}
