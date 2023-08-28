import Image from "next/image";

export default function UserInfo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="">
        <Image
          width={40}
          height={40}
          src={"https://api.multiavatar.com/Binx Bond.png"}
          alt="user-image"
        />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">User Name</div>
        <div className="">useremail@gmail.com</div>
      </div>
    </div>
  );
}