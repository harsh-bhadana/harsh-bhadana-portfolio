import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Bhadana | Senior Frontend Engineer & Dashboard Architect",
  description: "Portfolio of Harsh Bhadana, a Frontend Developer with 4+ years of experience designing and building performant dashboards, real-time bidding systems, and secure web architectures using Next.js, Redux, and Firebase.",
  keywords: ["Harsh Bhadana", "Frontend Developer", "Next.js Portfolio", "React Engineer", "Dashboard Developer", "Web Security", "Royal Enfield Frontend"],
  authors: [{ name: "Harsh Bhadana", url: "mailto:harshbhadana40@gmail.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground bg-grid-pattern selection:bg-primary/30 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
