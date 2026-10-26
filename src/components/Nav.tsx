import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  return (
    <header className="bg-ink/85 fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-bone sm:text-2xl">
            CD
          </span>
          <span className="font-display text-xl tracking-[0.18em] text-bone/70 transition group-hover:text-brass sm:text-2xl">
            TATTOOS
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? router.pathname === "/"
                : router.pathname.startsWith(link.href);

            if (link.href === "/book") {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border px-5 py-2 text-xs font-semibold uppercase tracking-label transition ${
                    isActive
                      ? "border-brass bg-brass text-ink"
                      : "border-brass/60 text-brass hover:bg-brass hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-label transition ${
                  isActive ? "text-brass" : "text-bone/70 hover:text-bone"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/client"
            className={`text-xs uppercase tracking-label transition ${
              router.pathname === "/client"
                ? "text-brass"
                : "text-bone/70 hover:text-bone"
            }`}
          >
            Client
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center text-bone md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-white/10 bg-ink px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-sm uppercase tracking-label text-bone/80 hover:text-brass"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="block py-3 text-sm uppercase tracking-label text-bone/80 hover:text-brass"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                href="/client"
                className="block py-3 text-sm uppercase tracking-label text-bone/80 hover:text-brass"
              >
                Client
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Nav;
