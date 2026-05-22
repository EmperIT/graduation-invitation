import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Great_Vibes, Baloo_2, Patrick_Hand } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const bubbleCute = Baloo_2({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bubble-cute",
});

const patrickHand = Patrick_Hand({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-patrick-hand",
});

export const metadata: Metadata = {
  title: "Lễ Tốt Nghiệp Vui Vẻ",
  description: "Trân trọng kính mời bạn đến dự lễ tốt nghiệp của mình",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${cormorant.variable} ${greatVibes.variable} ${bubbleCute.variable} ${patrickHand.variable}`}
    >
      <body className="font-sans antialiased text-foreground bg-background app-full-height">
        {children}
      </body>
    </html>
  );
}