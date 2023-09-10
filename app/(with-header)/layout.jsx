import Footer from "@components/Footer";
import Nav from "@components/Nav";
import { Providers } from "@redux/provider";
import { ClerkProvider } from "@clerk/nextjs";

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
          <ClerkProvider>
            <div className="main">
              <div className="primary-blue-bg"></div>
            </div>
            <main className="app mt-16">
              <Nav />
              {props.auth}
              {props.children}
              <Footer />
            </main>
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  );
}
