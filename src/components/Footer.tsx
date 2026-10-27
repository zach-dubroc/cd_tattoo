import Link from "next/link";
import { site } from "@/lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="  max-w-6xl flex-col gap-8 px-5 py-10 ">
        <div className="flex justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-label text-bone/60">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center transition hover:text-brass"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-bone/30">
        © {year} shark_blood sytems
      </div>
    </footer>
  );
};

export default Footer;
