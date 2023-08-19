import FacebookIcon from "@public/assets/icons/FacebookIcon";
import InstagramIcon from "@public/assets/icons/InstagramIcon";
import TwitterIcon from "@public/assets/icons/Twitter";
import Link from "next/link";

export default function FooterMenu() {
  return (
    <div className=" border-t-gray-300 border-t">
      <div className="my-8 relative grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="h-9 flex items-center">
            <h3 className="text_primary font-semibold select-none">UniCard</h3>
          </div>
          <div className="">
            <button className="bg-blue-600 text-white px-4 font-semibold h-10 rounded">
              Subscribe
            </button>
          </div>
          <div className="h-10 flex items-center space-x-2">
            <Link className="" href={"#"}>
              <FacebookIcon className="hover:fill-slate-700 fill-gray-500" />
            </Link>
            <Link href={"#"}>
              <InstagramIcon className="hover:fill-slate-700 fill-gray-500" />
            </Link>
            <Link href={"#"}>
              <TwitterIcon className="h-6 w-6 hover:fill-slate-700 fill-gray-500" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-10">
            <p className="font-semibold select-none">About</p>
          </div>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-blue-600" href={"#"}>
                About UniCard
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600" href={"#"}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="h-10">
            <p className="font-semibold select-none">Blog</p>
          </div>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-blue-600" href={"#"}>
                Uni Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
