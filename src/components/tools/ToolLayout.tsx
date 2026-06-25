import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

interface ToolLayoutProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
}

/** Shared page shell for every free tool: nav, cozy hero, breadcrumb, footer. */
export function ToolLayout({ eyebrow = "Free Tool", title, subtitle, children }: ToolLayoutProps) {
  return (
    <>
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-6 pt-32 md:pt-40">
          <AuroraBackground />
          <div className="container-page max-w-4xl">
            <Link
              href="/free-tools"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-lavender transition-colors hover:text-pink"
            >
              <ArrowLeft size={15} /> All free tools
            </Link>
            <span className="mt-6 block text-xs font-bold uppercase tracking-[0.2em] text-lavender">
              {eyebrow}
            </span>
            <h1 className="mt-3 text-balance text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight text-heading">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-body">{subtitle}</p>
          </div>
        </section>

        <section className="section-pad pt-2">
          <div className="container-page max-w-4xl">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
