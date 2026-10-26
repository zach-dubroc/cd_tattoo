import Head from "next/head";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { site } from "@/lib/site";
import { assetPath } from "@/lib/paths";

interface SiteLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const SiteLayout = ({
  children,
  title,
  description = site.description,
}: SiteLayoutProps) => {
  const pageTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} — ${site.tagline}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0b0c" />

        <link rel="icon" href={assetPath("/favicon.ico")} />
        <link
          rel="icon"
          type="image/svg+xml"
          href={assetPath("/favicon.svg")}
        />
        <link
          rel="apple-touch-icon"
          href={assetPath("/apple-touch-icon.png")}
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default SiteLayout;
