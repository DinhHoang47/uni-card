import { Providers } from "@redux/provider";
// Temporarily remove analytis
// import { Analytics } from "@vercel/analytics/react";

import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://my-flashcard.com"),
  title: "Unicard - Vocabulary Learning and Progress Tracking",
  description:
    "Enhance language skills with Unicard. Track progress, master new words through interactive flashcards. Start your language journey now!",
  openGraph: {
    images: "/opengraph-image.png",
    title: "Unicard - Vocabulary Learning and Progress Tracking",
    description:
      "Enhance language skills with Unicard. Track progress, master new words through interactive flashcards. Start your language journey now!",
    type: "website",
    url: "https://www.my-flashcard.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <Script src="https://accounts.google.com/gsi/client" />
        <body>{children}</body>
      </html>
    </Providers>
  );
}
