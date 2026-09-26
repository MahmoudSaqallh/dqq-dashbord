import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { localeToDir } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const madaniArabic = localFont({
  variable: "--font-madani-arabic",
  src: [
    { path: "../public/fonts/MadaniArabic-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/MadaniArabic-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/MadaniArabic-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/MadaniArabic-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "DQQ AI Dashboard",
  description: "DQQ AI shipping & order management dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await getServerLocale();
  const dir = localeToDir(initialLocale);

  return (
    <html
      lang={initialLocale}
      dir={dir}
      className={`${madaniArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-foreground">
        <LanguageProvider initialLocale={initialLocale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
