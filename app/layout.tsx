import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import "./globals.css";

import ReactQueryProvider from "@/app/providers/queryProvider";

const alegreyaBold = localFont({
  src: "../assets/fonts/Alegreya-Bold.ttf",
  variable: "--font-Alegreya-Bold",
});

const openSansRegular = localFont({
  src: "../assets/fonts/Nunito-Medium.ttf",
  variable: "--font-Nunito-Medium",
});

export const metadata: Metadata = {
  title:
    "Ірочка Хазяйка - квіти та інші рослини для дому та саду, добрива та засоби захисту / Flowergirl-irina",
  description:
    "Розсада вуличних квітів та інших рослин, кімнатні квіти з Голландії, добрива та засоби захисту рослин для дому та саду",
  keywords: [
    "Квіти",
    "Кімнатні квіти",
    "Рослини",
    "Засоби захисту",
    "Добрива",
    "Ірочка Хазяйка",
    "Flowergirl-irina",
  ],
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
    title: "Ірочка Хазяйка - квіти та інші рослини, добрива та засоби захисту",
    description:
      "Ірочка Хазяйка - розсада квітів та інших рослин, квіти з Голландії, добрива та засоби захисту рослин.",
    url: "https://flowergirl-irina.com/",
    siteName:
      "Ірочка Хазяйка - розсада квітів та інших рослин, квіти з Голландії, добрива та засоби захисту рослин.",
    images: [
      {
        url: "https://flowergirl-irina.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
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
        <ReactQueryProvider>
          {children}
          <div id="modal-root"></div>
        </ReactQueryProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
