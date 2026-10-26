import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { assetPath } from "@/lib/paths";

/** Each set is repeated so the loop has enough content to fill wide screens. */
const SET_COPIES = 4;

const PortfolioCarousel = () => {
  const sets = Array.from({ length: SET_COPIES }, (_, index) => index);

  return (
    <div className="group relative mt-10 overflow-hidden motion-reduce:overflow-x-auto">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent sm:w-20" />

      <ul className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused]  motion-reduce:animate-none">
        {sets.map((set) =>
          portfolio.map((piece) => {
            const isDuplicate = set > 0;

            return (
              <li
                key={`${set}-${piece.src}`}
                aria-hidden={isDuplicate || undefined}
                className="mr-1 w-[78vw] max-w-[360px] shrink-0 motion-reduce:hidden sm:w-[320px]"
              >
                <Link
                  href="/portfolio"
                  tabIndex={isDuplicate ? -1 : undefined}
                  className="group/card block overflow-hidden border border-white/10 bg-white/[0.03]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-bone">
                    <img
                      src={assetPath(piece.src)}
                      alt={piece.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover/card:scale-[1.03]"
                    />
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default PortfolioCarousel;
