import type { Metadata } from "next";
import { Toaster } from "sonner";
import { profile } from "@/constants";
import { CursorGlow } from "@/components/CursorGlow";
import Header from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: `Explore ${profile.name}’s projects, experience, skills, and GitHub activity.`,
  twitter: { card: "summary_large_image" },
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
