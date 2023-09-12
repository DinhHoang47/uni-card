import { Providers } from "@redux/provider";

import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <div className="main -z-10">
            <div className="primary-blue-bg"></div>
          </div>
          <main className="w-full min-h-screen flex flex-col justify-between">
            {props.children}
            <footer className="bg-white w-full h-10 px-2 sm:px-8 flex items-center mt-8">
              <p className="select-none">
                2023 © Uni Card . Your creative flash card app
              </p>
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
