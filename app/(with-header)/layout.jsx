import CommonMessage from "@components/CommonMessage/CommonMessage";
import Footer from "@components/Footer";
import Nav from "@components/Nav/Nav";

import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <>
      <main className=" mt-16 bg-blue-50">
        <div className="app">
          <Nav />
          {props.children}
        </div>
        <Footer />
      </main>
    </>
  );
}
