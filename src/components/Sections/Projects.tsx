import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { projects, sections, siteLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Projects() {
  return (
    <section
      id={sections.projects}
      className="container mx-auto px-5 py-10 sm:px-10 md:py-14"
    >
      <div className="mb-8 md:mb-10">
        <h2 className="mb-3 text-3xl font-bold">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Client websites, full-stack applications, and backend APIs.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project) => {
          const { featured } = project;
          const features = (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          );

          return (
            <Card
              key={project.title}
              className={cn(
                "gap-0 overflow-hidden border border-border py-0 transition-colors hover:border-primary/40",
                featured &&
                  "md:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center border-primary/25",
              )}
            >
              {featured ? (
                <div className="p-3 sm:p-5">
                  <Image
                    src={project.image}
                    alt={`${project.title} homepage`}
                    width={featured.width}
                    height={featured.height}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="h-auto w-full rounded-lg border border-border"
                  />
                </div>
              ) : (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex grow flex-col gap-4 p-5 sm:p-6">
                {featured && (
                  <Badge
                    variant="outline"
                    className="h-auto border-primary/30 bg-primary/10 px-3 py-1 text-primary"
                  >
                    {featured.label}
                  </Badge>
                )}
                <h3
                  className={cn(
                    "font-semibold tracking-tight",
                    featured ? "text-2xl sm:text-3xl" : "text-xl",
                  )}
                >
                  {project.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ul
                  aria-label="Key technologies"
                  className="flex flex-wrap gap-2"
                >
                  {project.technologies.slice(0, 5).map((tech) => (
                    <li key={tech}>
                      <Badge variant="secondary" className="bg-secondary/55">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>

                {featured && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">What I built</h4>
                    {features}
                  </div>
                )}

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.detail && (
                    <Button asChild className="h-10 px-3">
                      <Link
                        href={`${siteLinks.projectDetails}/${project.detail.slug}`}
                      >
                        {project.detail.label}
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (featured || !project.detail) && (
                    <Button asChild variant="secondary" className="h-10 px-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {featured ? "Live Site" : "Live Demo"}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="h-10 px-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source Code
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>

                <details className="group/highlights border-t border-border pt-3">
                  <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                    Project highlights
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 group-open/highlights:rotate-180"
                    />
                  </summary>
                  <div className="space-y-3 pb-1 pt-2">
                    {!featured && features}
                    <div>
                      <h4 className="mb-1 text-sm font-medium">
                        Full tech stack
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.technologies.join(", ")}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
