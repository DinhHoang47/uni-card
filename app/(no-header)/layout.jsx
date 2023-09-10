import { Providers } from "@redux/provider";

import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="w-full h-screen">{props.children}</main>
        </Providers>
      </body>
    </html>
  );
}
