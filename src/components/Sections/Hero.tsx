"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { experiences, profile, sections, siteAssets } from "@/constants";
import { HeroOrnament } from "../HeroOrnament";
import { Button } from "../ui/button";

export default function Hero() {
  const currentRole = experiences.find((experience) => experience.current);

  return (
    <section id={sections.about} className="container mx-auto px-5 pb-10 pt-28 sm:px-10 md:pb-14 md:pt-32">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center gap-3 sm:gap-4">
            <div className="shrink-0 rounded-full border border-primary/35 bg-primary/5 p-1">
              <Image
                src={siteAssets.portrait}
                alt=""
                width={64}
                height={64}
                sizes="(min-width: 640px) 64px, 48px"
                className="size-12 rounded-full object-cover object-[50%_60%] sm:size-16"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-primary">{profile.role}</p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
                Hi, I&apos;m <span className="whitespace-nowrap text-primary">{profile.name}</span>
              </h1>
            </div>
          </div>
          <p className="max-w-md text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {profile.tagline}
          </p>
          {currentRole && (
            <p className="mt-4 text-sm text-muted-foreground">
              {currentRole.role} at <span className="font-medium text-foreground">{currentRole.company}</span>
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 gap-2 px-4">
              <a href={`#${sections.projects}`}>
                View Projects
                <ArrowDownRight />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 gap-2 px-4">
              <a href={`#${sections.contact}`}>
                <Mail />
                Contact Me
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          data-hero-visual
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-artwork relative isolate mx-auto grid w-full max-w-[520px] grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-2xl border border-primary/20 p-4 sm:p-6"
        >
          <Image
            src={siteAssets.hero}
            alt="Developer illustration"
            width={500}
            height={358}
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 30vw, 60vw"
            className="h-auto w-full"
            preload
          />
          <HeroOrnament />
        </motion.div>
      </div>
    </section>
  );
}
