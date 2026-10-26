import SiteLayout from "@/components/SiteLayout";
import PaymentMethods from "@/components/PaymentMethods";
import { site } from "@/lib/site";

const Client = () => {
  return (
    <SiteLayout
      title="Client"
      description="Client resources - payments, tips, and more."
    >
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <header className="max-w-2xl">
          <p className="eyebrow">Client</p>
          {/* <h1 className="mt-4 font-display text-4xl leading-tight text-bone sm:text-5xl">
            Payments &amp; tips
          </h1>
          <p className="mt-5 leading-relaxed text-bone/60">
            Use any of the options below to pay for your session or leave a tip.
            Please include your name and appointment date in the payment note.
          </p> */}
        </header>

        <PaymentMethods className="mt-12" />

        <p className="mt-10 text-sm leading-relaxed text-bone/40">
          Questions?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-brass transition hover:text-bone"
          >
            {site.email}
          </a>
        </p>
      </section>
    </SiteLayout>
  );
};

export default Client;
