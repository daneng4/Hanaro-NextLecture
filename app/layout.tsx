import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/Nav";
import { RecipeProvider } from "@/components/context/recipe-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hanaro 2024 Exam",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <SessionProvider session={session}>
            <Nav />
          </SessionProvider>
        </header>
        <div className="flex flex-col items-center">
          <SessionProvider session={session}>
            <RecipeProvider>{children}</RecipeProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}