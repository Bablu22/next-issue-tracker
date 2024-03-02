import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import NavBar from "./NavBar";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="dark">
          <NextTopLoader color="rgb(14 165 233)" showSpinner={false} />
          <NavBar />
          <main className="relative mx-auto  bg-slate-950 text-white min-h-screen">
            <div className="container mx-auto">
              <div className="py-16 px-4 sm:px-6 lg:px-8">{children}</div>
            </div>
          </main>
        </Theme>
      </body>
    </html>
  );
}
