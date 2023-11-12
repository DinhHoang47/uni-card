import CommonMessage from "@components/CommonMessage/CommonMessage";
import "@styles/globals.css";
import Script from "next/script";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <main className="">
      <Script
        strategy="beforeInteractive"
        src="https://accounts.google.com/gsi/client"
      ></Script>
      {props.children}
      <CommonMessage />
    </main>
  );
}
