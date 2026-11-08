"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, profile, siteLinks } from "@/constants";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navigation[0]?.id ?? "");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;
    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);

        // Track the section that has reached the upper-middle reading position.
        // This avoids stale active links when sections have very different heights.
        const marker = Math.min(window.innerHeight * 0.35, 300);
        const currentSection = [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= marker);
        if (currentSection) setActiveSection(currentSection.id);
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const linkClass = (id: string) =>
    `relative py-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
      activeSection === id ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-border/70 bg-background/90 shadow-sm shadow-black/5 backdrop-blur-xl"
          : "border-transparent bg-background/65 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-5 sm:px-10">
        <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          <Link
            href={siteLinks.home}
            onClick={closeMobileMenu}
            className="rounded-sm text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {profile.name}
            <span className="ml-1 text-primary" aria-hidden="true">
              .
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {navigation.map(({ id, label }) => (
              <a
                className={linkClass(id)}
                key={id}
                href={`${siteLinks.home}#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
                <span
                  className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-primary transition-transform duration-200 ${
                    activeSection === id ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            ))}

            <Button
              asChild
              variant="default"
              size="lg"
              className="ml-1 h-10 gap-2 px-4"
            >
              <a href={profile.resumeUrl} download>
                <Download className="size-4" />
                Resume
              </a>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon-lg"
            className="lg:hidden"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-[51] overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl pointer-events-auto lg:hidden"
          >
            <nav
              className="container mx-auto flex flex-col gap-1 px-5 py-3 sm:px-10"
              aria-label="Mobile primary"
            >
              {navigation.map(({ id, label }) => (
                <Link
                  className={`${linkClass(id)} rounded-md px-3 ${
                    activeSection === id ? "bg-primary/10" : "hover:bg-muted/70"
                  }`}
                  key={id}
                  href={`${siteLinks.home}#${id}`}
                  onClick={closeMobileMenu}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                </Link>
              ))}
              <Button
                asChild
                variant="default"
                size="sm"
                className="mt-2 h-9 gap-2"
              >
                <a href={profile.resumeUrl} download onClick={closeMobileMenu}>
                  <Download className="size-4" />
                  Download Resume
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
