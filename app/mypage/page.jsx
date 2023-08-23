import Streak from "./components/Streak";
import UserInfo from "./components/UserInfo";

export default function MyPage() {
  return (
    <div className="bg-blue-400 w-full px-6">
      {/* User Info */}
      <UserInfo />
      <Streak />
    </div>
  );
}
