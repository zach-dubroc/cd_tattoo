import SiteLayout from "@/components/SiteLayout";
import { flashPortfolio, printPortfolio } from "@/data/portfolio";
import { assetPath } from "@/lib/paths";

const Portfolio = () => {
  const renderGrid = (items: typeof flashPortfolio) => (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((piece) => (
        <figure
          key={piece.src}
          className="overflow-hidden border border-white/10 bg-white/[0.03]"
        >
          <div className="aspect-[4/5] overflow-hidden bg-bone">
            <img
              src={assetPath(piece.src)}
              alt={piece.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
      ))}
    </div>
  );

  return (
    <SiteLayout
      title="Portfolio"
      description="A selection of flash and prints by CD Tattoos."
    >
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        {flashPortfolio.length > 0 && (
          <section className="mt-16">
            <header className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Flash</p>
              </div>
            </header>
            {renderGrid(flashPortfolio)}
          </section>
        )}

        {printPortfolio.length > 0 && (
          <section className="mt-16">
            <header className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">prints</p>
              </div>
            </header>
            {renderGrid(printPortfolio)}
          </section>
        )}
      </section>
    </SiteLayout>
  );
};

export default Portfolio;
