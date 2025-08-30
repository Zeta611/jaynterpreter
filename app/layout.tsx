import type { Metadata } from "next";
import { Megrim, Pixelify_Sans, Rubik } from "next/font/google";
import "./globals.css";
import ShellProvider from "@/components/shell-provider";

const megrim = Megrim({
  variable: "--font-megrim",
  weight: "400",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jay Lee's Home",
  description: "Jay Lee's Cozy Corner on the Internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${megrim.className} ${rubik.variable} ${pixelify.className} antialiased`}
      >
        <ShellProvider>{children}</ShellProvider>
      </body>
    </html>
  );
}
