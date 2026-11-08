import type { Metadata } from "next";
import { Toaster } from "sonner";
import { profile } from "@/constants";
import { CursorGlow } from "@/components/CursorGlow";
import Header from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import "./globals.css";

const pageTitle = `${profile.name} | ${profile.role}`;
const pageDescription = `Portfolio of ${profile.name}, a ${profile.role.toLowerCase()} building web apps and APIs with React, Next.js, Node.js, and PostgreSQL. Explore selected projects, experience, and GitHub activity.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://princepal.vercel.app"),
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: profile.name,
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Portrait of ${profile.name}, ${profile.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="antialiased">
      <body>
        <CursorGlow />
        <PortfolioMotion>
          <Header />
          {children}
          <Footer />
        </PortfolioMotion>
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  );
}
