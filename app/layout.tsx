import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomicLangToggle from "@/components/AtomicLangToggle"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Moreno — Desarrollador Full Stack",
  description:
    "Portafolio personal de Alex Moreno. Desarrollo web moderno, interfaces de alto impacto y soluciones digitales a medida.",
  keywords: ["desarrollador", "full stack", "portafolio", "react", "next.js"],
  authors: [{ name: "Alex Moreno" }],
  openGraph: {
    title: "Alex Moreno — Desarrollador Full Stack",
    description: "Portafolio personal de Alex Moreno.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-inter bg-zinc-950 text-zinc-100 antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
            <AtomicLangToggle />
    </body>
    </html>
  );
}