import Image from "next/image";
import { sections, technologies, technologyCategories } from "@/constants";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

export default function Skills() {
  return (
    <section id={sections.skills} className="container mx-auto px-5 py-10 sm:px-10 md:py-14">
      <h2 className="mb-8 text-3xl font-bold md:mb-10">
        <span className="text-primary">Skills</span> &amp; Technologies
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {technologyCategories.map((category) => (
          <Card key={category} className="gap-4 border border-border px-4 sm:px-5">
            <h3 className="text-lg font-semibold">{category}</h3>
            <ul className="grid grid-cols-2 gap-2 min-[360px]:grid-cols-3 lg:grid-cols-4">
              {technologies.filter((tech) => tech.category === category).map((tech) => (
                <li
                  key={tech.name}
                  className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-secondary/20 px-2 py-3 text-center text-xs transition-colors hover:border-primary/50"
                >
                  <Image
                    unoptimized
                    alt=""
                    src={tech.logo}
                    width={28}
                    height={28}
                    className={cn("size-7 object-contain", tech.lightLogo && "brightness-0 invert")}
                  />
                  {tech.name}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
