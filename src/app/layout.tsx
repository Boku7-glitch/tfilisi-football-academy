import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { AcademyProvider } from "../context/AcademyContext";

export const metadata: Metadata = {
  title: "ტფილისის საფეხბურთო აკადემია | Tfilisi Football Academy",
  description: "საფეხბურთო აკადემია ბავშვებისა და მოზარდებისთვის. ასაკობრივი ჯგუფები (2012-2019 წწ), განრიგი, ლოკაციები, ინდივიდუალური მომზადება და მშობლის პირადი კაბინეტი.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <AcademyProvider>
            {children}
          </AcademyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

