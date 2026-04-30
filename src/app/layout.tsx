import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Using Inter and Space Grotesk for modern feel
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "LayerZero Token Presale",
  description: "The official gateway for the LayerZero Token ecosystem, presale, and airdrops.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-black text-white`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
