import Link from "next/link";
import type { Product } from "@/lib/types";
import { discountPercent, formatPrice, hasRealImage, productAlt, productPath } from "@/lib/utils";
import { VideoPreview } from "./VideoPreview";
import { PackArt } from "./PackArt";
import { SaveButton } from "./SaveButton";
import { ShareButton } from "./ShareButton";
import { EtsyLink } from "./EtsyLink";

export function ProductCard({ product }: { product: Product }) {
  const path = productPath(product);
  const discount = discountPercent(product);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-veil bg-ink2/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-lilac/50 hover:shadow-volt-soft">
      <Link href={path} className="block" aria-label={product.etsyTitle ?? product.title}>
        <div className="relative aspect-video">
          {hasRealImage(product) ? (
            <VideoPreview
              src={product.previewVideo}
              poster={product.thumbnails[0]}
              alt={productAlt(product, 0)}
              className="h-full w-full"
            />
          ) : (
            <PackArt product={product} className="absolute inset-0 h-full w-full" />
          )}
          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {product.newDrop && (
              <span className="rounded-full bg-volt px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                New Drop
              </span>
            )}
            {product.bestseller && (
              <span className="rounded-full bg-lilac px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                Bestseller
              </span>
            )}
            {discount !== null && (
              <span className="rounded-full bg-volt px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Save / share - revealed on hover, always visible on touch */}
      <div className="absolute right-3 top-3 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <SaveButton slug={product.slug} />
        <ShareButton
          title={product.title}
          path={path}
          etsyUrl={product.etsyUrl}
          thumbnail={product.thumbnails[0]}
        />
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 pb-2">
          {product.category.slice(0, 2).map((c) => (
            <Link
              key={c}
              href={`/overlays/${c}`}
              className="rounded-full bg-abyss/20 px-2 py-0.5 text-[11px] capitalize text-lilac hover:bg-abyss/40"
            >
              {c.replace(/-/g, " ")}
            </Link>
          ))}
        </div>
        <Link href={path}>
          <h3 className="font-body text-sm font-medium leading-snug text-blush transition-colors group-hover:text-lilac">
            {product.title}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-mono text-sm">
            {product.salePrice !== null ? (
              <>
                <span className="text-volt">{formatPrice(product.salePrice)}</span>{" "}
                <span className="text-mist line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-volt">{formatPrice(product.price)}</span>
            )}
          </div>
          <EtsyLink etsyUrl={product.etsyUrl} variant="text" className="text-xs" />
        </div>
      </div>
    </div>
  );
}
