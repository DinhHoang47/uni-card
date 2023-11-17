import AmberButton from "@components/Buttons/AmberButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@public/assets/images/unicard-logo.png";

export default function layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

const Nav = () => {
  return (
    <header className="max-w-3xl flex justify-between w-full h-14 items-center px-4 mx-auto">
      <Link href={"/"} className="flex items-center space-x-2 select-none">
        <Image
          priority
          sizes="40px"
          alt="Unicard logo"
          className="w-10"
          src={Logo}
        />
        <h1 className="logo_text font-vina text-xl">UniCard</h1>
      </Link>
      <nav className="">
        <Link href={"/auth"}>
          <AmberButton>Sign In</AmberButton>
        </Link>
      </nav>
    </header>
  );
};
