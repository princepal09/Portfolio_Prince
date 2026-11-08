import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TransferWalkthrough } from "@/components/TransferWalkthrough";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile, projects, sections, siteLinks } from "@/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.flatMap(({ detail }) =>
    detail ? [{ slug: detail.slug }] : [],
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find(({ detail }) => detail?.slug === slug);

  if (!project) notFound();

  return {
    title: `${project.title} | ${profile.name}`,
    description: project.description,
  };
}

export default function ProjectDetail({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-5 pb-16 pt-28 sm:px-10 md:pt-32">
          <div className="mx-auto max-w-5xl animate-pulse space-y-5">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-12 w-2/3 rounded bg-muted" />
            <div className="h-5 w-full max-w-2xl rounded bg-muted" />
            <div className="h-64 rounded-xl bg-muted" />
          </div>
        </main>
      }
    >
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Props) {
  const { slug } = await params;

  const project = projects.find(({ detail }) => detail?.slug === slug);

  if (!project?.detail) notFound();

  const { detail, featured } = project;

  return (
    <main className="container mx-auto px-5 pb-16 pt-28 sm:px-10 md:pt-32">
      <article className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
        <header className="space-y-5">
          <Link
            href={`${siteLinks.home}#${sections.projects}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to projects
          </Link>

          <div className="space-y-3">
            <p className="text-sm font-medium text-primary">{detail.kind}</p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {featured && project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live site <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            )}

            <Button asChild variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                Source code <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </header>

        {featured && (
          <figure className="overflow-hidden rounded-xl border border-primary/25 bg-card">
            <Image
              src={project.image}
              alt="Rock Lizard Adventure homepage with trek navigation over a snowy mountain trail"
              width={featured.width}
              height={featured.height}
              sizes="(min-width: 1100px) 1024px, 100vw"
              className="h-auto w-full"
            />

            <figcaption className="border-t px-4 py-3 text-sm text-muted-foreground">
              The homepage gives visitors a starting point for finding treks and
              expeditions.
            </figcaption>
          </figure>
        )}

        <div className={featured ? "grid gap-4 md:grid-cols-3" : "max-w-2xl"}>
          {detail.sections.map(({ title, text }) => (
            <section
              key={title}
              className="space-y-2 rounded-xl border bg-card p-5"
            >
              <h2 className="text-lg font-semibold">{title}</h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </section>
          ))}
        </div>

        {detail.transferDemo && <TransferWalkthrough />}

        <section className="space-y-3 border-t pt-6">
          <h2 className="text-lg font-semibold">Tech stack</h2>

          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary">{tech}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
