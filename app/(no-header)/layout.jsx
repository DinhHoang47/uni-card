import Footer from "@components/Footer";
import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <>
      <main className="bg-blue-50 w-full min-h-screen flex flex-col justify-between">
        {props.children}
        <Footer />
      </main>
    </>
  );
}
