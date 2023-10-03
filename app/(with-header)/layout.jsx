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
      <div className="main">
        <div className="primary-blue-bg"></div>
      </div>
      <main className="app mt-16">
        <Nav />
        {props.children}
        <Footer />
      </main>
    </>
  );
}
