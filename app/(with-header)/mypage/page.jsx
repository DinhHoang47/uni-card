import MyCollections from "./components/MyCollections";
import Streak from "./components/Streak";
import UserInfo from "./components/UserInfo";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "My page - Unicard",
    description:
      "Explore and review your study sets on My Page at Unicard. Enhance your vocabulary learning experience with interactive flashcards.",
    alternates: {
      canonical: `mypage`,
    },
  };
}

export default function MyPage() {
  return (
    <div className="w-full mt-8 px-4 lg:px-8 pb-16 space-y-8">
      {/* User Info */}
      <UserInfo />
      {/* <Streak /> */}
      <MyCollections />
    </div>
  );
}
