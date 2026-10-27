import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import { site } from "@/lib/site";

// const values = [
//   { label: "Custom", detail: "One-of-a-kind designs, drawn for you" },
//   { label: "Blackwork", detail: "Black & grey, fine line, colour" },
//   { label: "Private", detail: "By appointment, one client at a time" },
// ];

// const steps = [
//   {
//     number: "01",
//     title: "Pick a time",
//     body: "Choose a consultation slot in the live calendar. Availability updates around the studio's booked sessions.",
//   },
//   {
//     number: "02",
//     title: "Talk it through",
//     body: "Bring references and we'll work through placement, size, and budget before anything is committed.",
//   },
//   {
//     number: "03",
//     title: "Book the session",
//     body: "Once the design is agreed, your appointment is confirmed by email with everything you need to know.",
//   },
// ];

const Home = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden sm:min-h-[calc(100vh-5rem)]">
        <div className="absolute inset-0 -z-20 bg-shop bg-cover bg-center" />
        <div className="via-ink/85 absolute inset-0 -z-10 bg-gradient-to-r from-ink to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" />

        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:py-32">
          <p className="eyebrow">{site.location}</p>

          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-bone sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/client"
              className="inline-flex items-center justify-center bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-label text-ink transition hover:bg-brass"
            >
              Client 
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-label text-ink transition hover:bg-brass"
            >
              Booking
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center border border-bone/30 px-7 py-4 text-xs font-semibold uppercase tracking-label text-bone transition hover:border-bone hover:bg-bone/5"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </section>
      {/* VALUES
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.label}>
              <p className="font-display text-lg text-bone">{value.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-bone/50">
                {value.detail}
              </p>
            </div>
          ))}
        </div>
      </section>  */}

      {/* SELECTED WORK */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Link
            href="/portfolio"
            className="text-xs uppercase tracking-label text-bone/50 transition hover:text-brass"
          >
            View all work →
          </Link>
        </div>

        <div className="mt-10">
          <PortfolioCarousel />
        </div>
      </section>

      {/* PROCESS
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">Booking</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CLOSING */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-8">
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-label text-ink transition hover:bg-brass"
          >
            Book an appointment
          </Link>
          {/* <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center border border-bone/30 px-7 py-4 text-xs font-semibold uppercase tracking-label text-bone transition hover:border-bone hover:bg-bone/5"
          >
            {site.email}
          </a> */}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Home;
