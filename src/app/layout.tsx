import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ტფილისის საფეხბურთო აკადემია | Tfilisi Football Academy",
  description: "საფეხბურთო აკადემია ბავშვებისა და მოზარდებისთვის. ასაკობრივი ჯგუფები (2012-2019 წწ), განრიგი, ლოკაციები, ინდივიდუალური მომზადება და მშობლის პირადი კაბინეტი.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ka"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
