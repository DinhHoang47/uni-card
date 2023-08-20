import CardStudy from "@components/CardStudy";
import FlipCardTesting from "./FlipCardTesting";

export default function DesktopTestingGround() {
  return (
    <div className=" hidden sm:grid grid-cols-3 lg:grid-cols-4 gap-6 lg:px-5 xl:px-20">
      <FlipCardTesting />
      <FlipCardTesting />
      <FlipCardTesting />
      <FlipCardTesting />
      <FlipCardTesting />
      <FlipCardTesting />
      <FlipCardTesting />
      <FlipCardTesting />
    </div>
  );
}
