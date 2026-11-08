"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, profile, siteLinks } from "@/constants";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header  className={`fixed  top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""}`  }>
      <div className="container py-5  mx-auto px-5 sm:px-10">
        <div className="flex items-center justify-between">
          <Link href={siteLinks.home} className="text-xl font-bold text-primary">
            {profile.name}
          </Link>

          {/* Desktop Menu  */}

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navigation.map(({ id, label }) => (
              <a
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                key={id}
                href={`${siteLinks.home}#${id}`}
              >
                {label}
              </a>
            ))}

            <Button asChild variant="default" size="lg" className="gap-2">
              <a href={profile.resumeUrl} download>
                <Download className="w-4 h-4" />
                Resume
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button  */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t mt-3 bg-background"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4" aria-label="Primary">
              {navigation.map(({ id, label }) => (
                <a
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-all"
                  key={id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={`${siteLinks.home}#${id}`}
                >
                  {label}
                </a>
              ))}

              <Button asChild variant="default" size="sm" className="gap-2">
                <a href={profile.resumeUrl} download>
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

