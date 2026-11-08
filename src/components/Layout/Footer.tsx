import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { navigation, profile, sections, siteLinks } from "@/constants";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { label: "GitHub", href: profile.githubUrl, Icon: FaGithub },
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: FaLinkedin },
  { label: "Instagram", href: profile.instagramUrl, Icon: FaInstagram },
];

export function Footer() {
  const initials = profile.name.split(" ").map((part) => part[0]).join("");
  const about = `${siteLinks.home}#${sections.about}`;

  return (
    <footer className="border-t border-primary/20 bg-linear-to-b from-primary/5 to-card">
      <div className="container mx-auto px-5 pb-6 pt-10 sm:px-10 md:pt-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href={about} className="inline-flex items-center gap-3 rounded-lg hover:text-primary">
              <span aria-hidden="true" className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                {initials}
              </span>
              <span>
                <span className="block text-lg font-semibold leading-tight">{profile.name}</span>
                <span className="text-sm text-muted-foreground">{profile.role}</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <Button key={label} asChild variant="outline" className="h-10 gap-2">
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon aria-hidden="true" />
                    {label}
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <nav aria-labelledby="footer-navigation">
            <h2 id="footer-navigation" className="mb-4 text-sm font-semibold">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {navigation.map(({ id, label }) => (
                <li key={id}>
                  <a href={`${siteLinks.home}#${id}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Get in touch</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={profile.emailHref} className="flex items-start gap-2 font-medium text-primary hover:underline">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span className="wrap-anywhere">{profile.email}</span>
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {profile.phoneLabel}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-5 text-xs text-muted-foreground md:mt-10">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <p>© {profile.name}. All rights reserved.</p>
            <p>
              Made with{" "}
              <a href={siteLinks.nextjs} className="font-medium text-foreground hover:text-primary hover:underline">
                Next.js
              </a>
            </p>
          </div>
          <Button asChild variant="ghost" className="ml-auto h-9 gap-2 px-2 text-xs">
            <a href="#">
              Back to top
              <ArrowUp aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
