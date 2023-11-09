import Image from "next/image";
import Link from "next/link";
import React from "react";
import unicardLogo from "@public/assets/images/unicard-logo.png";

export default function SiteLogo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image
        style={{ width: "40px" }}
        alt="Myflashcard logo"
        src={unicardLogo}
      />
      <h1 className="logo_text font-vina text-xl">UniCard</h1>
    </Link>
  );
}
