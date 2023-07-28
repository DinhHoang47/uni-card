import Nav from "@components/Nav";
import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
