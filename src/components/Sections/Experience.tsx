"use client";

import { experiences, sections } from "@/constants";
import { motion } from "framer-motion";
import { BriefcaseBusiness, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";

const Experience = () => {
  return (
    <section id={sections.experience} className="container mx-auto px-5 py-10 sm:px-10 md:py-14">
      <h2 className="mb-8 text-3xl font-bold md:mb-10">
        Professional <span className="text-primary">Experience</span>
      </h2>

      <div className="mx-auto space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={`${exp.company}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <Card className="gap-5 border border-border p-5 transition-colors hover:border-primary/30 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <div className="flex items-center gap-4">
                  {exp.logo ? (
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white">
                      <Image
                        src={exp.logo}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 object-contain"
                      />
                    </div>
                  ) : (
                    <BriefcaseBusiness aria-hidden="true" className="size-7 shrink-0 text-primary" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-primary sm:text-xl">{exp.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {exp.duration}
                </span>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="max-w-3xl leading-relaxed text-muted-foreground">{exp.description}</p>
              )}
              {exp.contributions && (
                <ul className="max-w-3xl list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-primary">
                  {exp.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                </ul>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer */}
              {exp.certificate && (
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">
                    Internship Certificate
                  </span>

                  <a
                    href={exp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary transition-all hover:gap-3"
                  >
                    View
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
