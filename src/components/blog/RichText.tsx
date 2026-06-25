import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders blog paragraph text with inline markdown-style links and bold:
 *   [label](/internal) or [label](https://external)  →  styled links
 *   **bold**  →  emphasized text
 * Internal links (starting with "/") use next/link; external open in a new tab.
 */

const linkClass =
  "font-semibold text-lavender underline decoration-lavender/40 underline-offset-2 transition-colors hover:text-pink";

function renderBold(text: string, keyBase: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyBase}-b${i}`} className="font-semibold text-heading">
        {part}
      </strong>
    ) : (
      <span key={`${keyBase}-t${i}`}>{part}</span>
    ),
  );
}

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...renderBold(text.slice(lastIndex, match.index), `seg${key++}`));
    }
    const [, label, href] = match;
    const external = /^https?:/i.test(href);
    nodes.push(
      external ? (
        <a
          key={`lnk${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      ) : (
        <Link key={`lnk${key++}`} href={href} className={linkClass}>
          {label}
        </Link>
      ),
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(...renderBold(text.slice(lastIndex), `seg${key++}`));
  }

  return <>{nodes}</>;
}
