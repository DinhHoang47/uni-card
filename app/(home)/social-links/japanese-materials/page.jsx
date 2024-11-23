import JapanFlag from "@public/assets/icons/JapanFlag";
import InstagramIcon from "@public/assets/icons/InstagramIcon";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@public/assets/icons/FacebookIcon";
import TwitterIcon from "@public/assets/icons/Twitter";
import ChromeIcon from "@public/assets/icons/ChromeIcon";

export default function page() {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <LinksModal />
    </div>
  );
}

const socialLinks = [
  {
    url: "https://www.instagram.com/unicard_learning_japanese",
    Icon: InstagramIcon,
    text: "unicard_learning_japanese",
  },
  {
    url: "https://www.facebook.com/unicard.japanese",
    Icon: FacebookIcon,
    text: "unicard.japanese",
  },
  {
    url: "https://twitter.com/UnicardJapanese",
    Icon: TwitterIcon,
    text: "UnicardJapanese",
  },
];

const LinksModal = () => {
  return (
    <div className="bg-white p-8 rounded-lg  shadow-slate-300 shadow-md">
      <Logo />
      <p className="text-center  text-2xl font-allura mt-4">Follow us</p>
      <div className="flex space-x-1 justify-center items-center">
        <span className="animate-bounce">👇</span>
        <h1 className="font-semibold ">Japanese materials</h1>
        <JapanFlag className="" />
        <span className="animate-bounce">👇</span>
      </div>
      <div className="min-w-min space-y-4 mt-4">
        {socialLinks.map((item) => {
          return (
            <SocialLink
              key={item.url}
              Icon={item.Icon}
              url={item.url}
              text={item.text}
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-center space-x-2 items-center">
        <span className="">📚</span>
        <p className="text-center font-allura text-2xl">Learn on</p>
        <span className="">📚</span>
      </div>
      <div className="mt-2">
        <SocialLink
          Icon={ChromeIcon}
          url={"https://www.nihongo.click/"}
          text={"Unicard App"}
        />
      </div>
    </div>
  );
};

const SocialLink = ({ Icon, url, text }) => {
  return (
    <Link
      className="group w-full h-11 border rounded-md border-blue-300 flex items-center space-x-2 px-2 hover:bg-blue-600 hover:text-white transition-all"
      href={url}
    >
      <Icon className="w-6 h-6 fill-blue-600 group-hover:fill-white" />
      <p className="text-blue-600 text-sm font-semibold text-center flex-1 group-hover:text-white">
        {text}
      </p>
    </Link>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Image
        quality={100}
        src={"/assets/images/unicard-logo.png"}
        width={60}
        height={60}
        alt="Unicard Logo"
        className=""
      />
      <p className="logo_text text-center text-xl">Unicard</p>
    </div>
  );
};
