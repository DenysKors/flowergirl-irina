import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const alegreyaBold = localFont({
  src: "../assets/fonts/Alegreya-Bold.ttf",
  variable: "--font-Alegreya-Bold",
});

const openSansRegular = localFont({
  src: "../assets/fonts/Nunito-Medium.ttf",
  variable: "--font-Nunito-Medium",
});

export const metadata: Metadata = {
  title: "Flowergirl-irina / Квіти для дому та саду, добрива та засоби захисту",
  description:
    "Розсада вуличних квітів, кімнатні квіти з Голландії, добрива та засоби захисту рослин для дому та саду",
  keywords: ["Прикраси", "Натуральне каміння", "Mara Jewelry"],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Flowergirl-irina / Квіти для дому та саду, добрива та засоби захисту",
    description:
      "Розсада вуличних квітів, кімнатні квіти з Голландії, добрива та засоби захисту рослин для дому та саду",
    url: "https://flowergirl-irina.vercel.app/",
    siteName:
      "Flowergirl-irina / Квіти для дому та саду, добрива та засоби захисту",
    images: [
      {
        url: "https://flowergirl-irina.vercel.app/opengraph-image.jpg",
        width: 124,
        height: 124,
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${alegreyaBold.variable} ${openSansRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
