"use client";

import Image from "next/image";
import { profile, sections, siteAssets } from "@/constants";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Card } from "../ui/card";
import ContactForm from "../ContactForm";
const Contact = () => {
  return (
    <section
      id={sections.contact}
      className="container mx-auto px-5 py-10 sm:px-10 md:py-14"
    >
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="mb-5 max-w-sm leading-relaxed text-muted-foreground">
            For freelance projects and software engineering opportunities, send me a message.
          </p>
          <a
            href={profile.emailHref}
            className="inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-primary hover:underline"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            <span>{profile.email}</span>
          </a>
          <div className="mt-5 flex gap-3">
            <Button variant={"outline"} size={"icon"} asChild>
              <a
                aria-label="GitHub"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <a
                aria-label="LinkedIn"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                aria-label="Instagram"
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram aria-hidden="true" className="w-5 h-5" />
              </a>
            </Button>
          </div>
          <Image
            src={siteAssets.contact}
            alt=""
            width={600}
            height={402}
            className="mt-6 hidden h-auto w-full max-w-xs md:block"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border border-border p-5 sm:p-6">
            <ContactForm />
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
