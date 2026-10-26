export type PortfolioCategory = "flash" | "print";

export type PortfolioPiece = {
  /** File in `public/portfolio/flash/` or `public/portfolio/print/`. */
  src: string;
  /** Describes the artwork for screen readers. */
  alt: string;
  category: PortfolioCategory;
};

/**
 * The portfolio grid is driven by this list. Drop artwork into
 * `public/portfolio/flash/` or `public/portfolio/print/` and add an entry.
 */
export const portfolio: PortfolioPiece[] = [
  {
    src: "/portfolio/flash/flash_1.png",
    alt: "Flash tattoo design sheet",
    category: "flash",
  },
  {
    src: "/portfolio/flash/flash_2.png",
    alt: "Flash tattoo design sheet",
    category: "flash",
  },
  {
    src: "/portfolio/print/print_1.png",
    alt: "Peony tattoo print",
    category: "print",
  },
];

export const flashPortfolio = portfolio.filter(
  (piece) => piece.category === "flash"
);
export const printPortfolio = portfolio.filter(
  (piece) => piece.category === "print"
);
