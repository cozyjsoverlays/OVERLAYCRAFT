import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { isEtsyConfigured } from "@/lib/env";
import { EtsySyncPanel } from "@/components/admin/EtsySyncPanel";

export const metadata: Metadata = { title: "Etsy Sync" };

// Auth-gated + DB-backed: never statically prerender (also avoids the
// useSearchParams CSR-bailout during build).
export const dynamic = "force-dynamic";

export default async function AdminEtsyPage() {
  const configured = isEtsyConfigured;

  const [auth, lastSync, etsyProducts] = configured
    ? await Promise.all([
        prisma.etsyAuth.findFirst(),
        prisma.etsySyncLog.findFirst({ orderBy: { startedAt: "desc" } }),
        prisma.product.findMany({
          where: { source: "etsy" },
          orderBy: { updatedAt: "desc" },
        }),
      ])
    : [null, null, []];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-heading">Etsy Sync</h1>
      <p className="mb-6 text-sm text-muted">
        Optionally import listings from your Etsy shop. Your store runs fully
        without it.
      </p>

      <EtsySyncPanel
        configured={configured}
        connected={!!auth}
        shopId={auth?.shopId ?? null}
        lastSync={
          lastSync
            ? {
                status: lastSync.status,
                startedAt: lastSync.startedAt.toISOString(),
                upserted: lastSync.upserted,
                errors: lastSync.errors,
                message: lastSync.message,
              }
            : null
        }
        etsyProducts={etsyProducts.map((p) => ({
          id: p.id,
          name: p.name,
          needsFile: p.needsFile,
          active: p.active,
          etsyUrl: p.etsyUrl,
        }))}
      />
    </div>
  );
}
