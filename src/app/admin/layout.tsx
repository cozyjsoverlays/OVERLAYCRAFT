import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutGrid, Package, RefreshCcw, LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin" },
  robots: { index: false },
};

// All admin pages are auth-gated and read the live DB — never prerender.
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/etsy", label: "Etsy Sync", icon: RefreshCcw },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-base text-body">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-subtle bg-surface lg:flex">
        <div className="flex h-16 items-center gap-2 px-5 border-b border-subtle">
          <LayoutGrid size={18} className="text-lavender" />
          <span className="font-extrabold text-heading text-sm">CozyOverlays</span>
          <span className="ml-auto rounded bg-lavender/20 px-1.5 py-0.5 text-[10px] font-bold text-lavender">
            Admin
          </span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-body hover:bg-white/5 hover:text-heading transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="POST" className="p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-pink transition-colors"
          >
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-subtle bg-surface px-4 lg:hidden">
        <LayoutGrid size={16} className="text-lavender" />
        <span className="font-extrabold text-heading text-sm">Admin</span>
        <div className="ml-auto flex gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-body hover:bg-white/5 hover:text-heading"
            >
              {label}
            </Link>
          ))}
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-pink"
            >
              Out
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-6 pt-20 lg:pt-6">{children}</main>
    </div>
  );
}
