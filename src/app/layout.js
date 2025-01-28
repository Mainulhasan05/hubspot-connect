// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Authentication App",
  description: "Next.js authentication with NextAuth.js",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
