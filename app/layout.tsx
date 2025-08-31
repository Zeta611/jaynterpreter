import type { Metadata } from "next";
import { Hahmlet, Michroma, Pixelify_Sans, Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ShellProvider from "@/components/shell-provider";
import NavBar from "@/components/nav-bar";
import { cn } from "@/lib/utils";
import Script from "next/script";

const michroma = Michroma({
  variable: "--font-michroma",
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

const hahmlet = Hahmlet({
  variable: "--font-hahmlet",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Jay Lee's Seeking the Tao of Programming",
  description: "This is Jay Lee's cozy corner on the Internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/copy-tex.min.js"
          integrity="sha384-HORx6nWi8j5/mYA+y57/9/CZc5z8HnEw4WUZWy5yOn9ToKBv1l58vJaufFAn9Zzi"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          michroma.variable,
          rubik.variable,
          pixelify.variable,
          hahmlet.variable,
          "antialiased font-sans"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div className="w-full max-w-3xl mx-auto">
            <div className="my-4 mx-2">
              <ShellProvider>{children}</ShellProvider>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
