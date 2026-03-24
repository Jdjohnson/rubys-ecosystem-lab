import type { Metadata, Viewport } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ruby's Ozarks Ecosystem Lab",
  description:
    "An interactive ecosystem learning app for exploring biotic, abiotic, predators, prey, and food webs in Springfield and the Ozarks.",
  appleWebApp: {
    capable: true,
    title: "Ecosystem Lab",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body
        className="min-h-dvh flex flex-col"
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
