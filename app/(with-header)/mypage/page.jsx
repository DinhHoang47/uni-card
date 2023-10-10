import LearningCollections from "./components/LearningCollections";
import MyCollections from "./components/MyCollections";
import Streak from "./components/Streak";
import UserInfo from "./components/UserInfo";

export default function MyPage() {
  return (
    <div className="w-full mt-8 px-4 pb-16 space-y-8">
      {/* User Info */}
      <UserInfo />
      <Streak />
      <MyCollections />
      <LearningCollections />
    </div>
  );
}
