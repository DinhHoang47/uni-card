import Footer from "@components/Footer";
import Nav from "@components/Nav";
import AuthProvider from "@components/Provider";
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
          <AuthProvider>
            <div className="main">
              <div className="primary-blue-bg"></div>
            </div>
            <main className="app mt-16">
              <Nav />
              {props.auth}
              {props.children}
              <Footer />
            </main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
