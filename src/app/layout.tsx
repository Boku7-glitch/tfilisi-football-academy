import type { Metadata } from "next";
import { Noto_Sans_Georgian, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const notoSansGeorgian = Noto_Sans_Georgian({
  variable: "--font-georgian",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ტფილისის საფეხბურთო აკადემია | Tfilisi Football Academy",
  description: "საფეხბურთო აკადემია ბავშვებისა და მოზარდებისთვის. ასაკობრივი ჯგუფები (2012-2019 წწ), განრიგი, ლოკაციები, ინდივიდუალური მომზადება და მშობლის პირადი კაბინეტი.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ka"
      className={`${notoSansGeorgian.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
