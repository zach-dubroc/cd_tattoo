import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

const NotFound = () => {
  return (
    <SiteLayout title="Page not found">
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-bone/50">
          text copy placeholder
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-label text-ink transition hover:bg-brass"
          >
            Back home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center border border-bone/30 px-7 py-4 text-xs font-semibold uppercase tracking-label text-bone transition hover:border-bone hover:bg-bone/5"
          >
            View portfolio
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
