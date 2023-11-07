import { Providers } from "@redux/provider";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <Script src="https://accounts.google.com/gsi/client" />
        <body>{children}</body>
        <Analytics />
      </html>
    </Providers>
  );
}
