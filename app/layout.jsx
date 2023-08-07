import Nav from "@components/Nav";
import AuthProvider from "@components/Provider";
import store from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";

import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          <AuthProvider>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app mt-16">
              <Nav />
              {props.auth}
              {props.children}
            </main>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
