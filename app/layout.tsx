import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
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
    <html lang="vi" className={`${inter.variable} ${cormorant.variable} ${greatVibes.variable}`}>
      <body className="font-sans antialiased text-stone-800 bg-[#fcfbf9] app-full-height">
        {children}
      </body>
    </html>
  );
}