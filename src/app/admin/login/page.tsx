import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-3xl">✦</span>
          <h1 className="mt-3 text-2xl font-extrabold text-heading">Admin access</h1>
          <p className="mt-1 text-sm text-muted">CozyOverlays dashboard</p>
        </div>
        <AdminLoginForm next={searchParams.next} />
      </div>
    </div>
  );
}
