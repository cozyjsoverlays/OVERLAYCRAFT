import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[50vh] max-w-3xl place-items-center px-4 py-20 text-center">
      <div>
        <p className="font-mono text-sm text-volt">404</p>
        <h1 className="mt-3 font-display text-3xl text-blush md:text-4xl">
          This corner of the atelier is empty
        </h1>
        <p className="mt-3 text-mist">
          The page you&apos;re after has drifted off like lilac dust. The catalog, however, is very real.
        </p>
        <Link
          href="/overlays"
          className="mt-8 inline-block rounded-xl bg-volt px-7 py-3.5 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
        >
          Browse Overlays
        </Link>
      </div>
    </div>
  );
}
