import "@styles/globals.css";

export const meta = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

export default async function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <main className="w-full pb-14">{props.children}</main>
      </body>
    </html>
  );
}
