import { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, Rows3 } from 'lucide-react';
import {
  JewelleryProduct,
  KaratGrade,
  LangMode,
} from '../data/rahaCatalog';
import { ProductCard } from './ProductCard';

interface ProductShowcaseSectionProps {
  kicker: string;
  title: string;
  products: JewelleryProduct[];
  lang: LangMode;
  surfaceTone?: 'base' | 'alt';
  defaultMobileLayout?: 'slider' | 'grid';
  onSeeAll: () => void;
  onOpenDetail: (product: JewelleryProduct, initialKarat: KaratGrade) => void;
}

export function ProductShowcaseSection({
  kicker,
  title,
  products,
  lang,
  surfaceTone = 'base',
  defaultMobileLayout = 'slider',
  onSeeAll,
  onOpenDetail,
}: ProductShowcaseSectionProps) {
  const [mobileMode, setMobileMode] = useState<'slider' | 'grid'>(defaultMobileLayout);
  const railRef = useRef<HTMLDivElement | null>(null);

  const slideBy = (dir: -1 | 1) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  const bgClasses =
    surfaceTone === 'alt'
      ? 'border-t border-[#E7E2D8] bg-[#FAF8F4] dark:border-[#D8AF56]/15 dark:bg-[#120D0B]'
      : 'border-t border-[#E7E2D8] bg-white dark:border-[#D8AF56]/15 dark:bg-[#0C0908]';

  return (
    <section className={`${bgClasses} py-10 sm:py-14 transition-colors`}>
      <div className="mx-auto max-w-[1320px] px-3.5 sm:px-6 lg:px-10">
        {/* Section Header + Mobile Slide/Grid Toggle + See All CTA */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#9A6B00] dark:text-[#D8AF56]">{kicker}</p>
            <h2 className="font-noir-display mt-1 text-2xl font-semibold text-[#161412] sm:text-3xl lg:text-4xl dark:text-[#F5EDE0]">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile-friendly Slider vs 2-Col Grid Toggle */}
            <div
              className="flex items-center rounded-md border border-[#E2DBD0] bg-white p-0.5 md:hidden dark:border-white/12 dark:bg-[#16110E]"
              role="group"
              aria-label="Mobile layout toggle"
            >
              <button
                type="button"
                onClick={() => setMobileMode('slider')}
                className={`flex h-7 items-center gap-1 rounded px-2 text-[11px] font-medium ${
                  mobileMode === 'slider'
                    ? 'bg-[#F4B400] text-[#161412] dark:bg-[#D8AF56]'
                    : 'text-[#6B6258] dark:text-[#A89B8C]'
                }`}
              >
                <Rows3 className="h-3 w-3" aria-hidden="true" />
                <span>{lang === 'bn' ? 'স্লাইড' : 'Slide'}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMode('grid')}
                className={`flex h-7 items-center gap-1 rounded px-2 text-[11px] font-medium ${
                  mobileMode === 'grid'
                    ? 'bg-[#F4B400] text-[#161412] dark:bg-[#D8AF56]'
                    : 'text-[#6B6258] dark:text-[#A89B8C]'
                }`}
              >
                <LayoutGrid className="h-3 w-3" aria-hidden="true" />
                <span>{lang === 'bn' ? 'গ্রিড' : 'Grid'}</span>
              </button>
            </div>

            {/* Slider Prev/Next arrows on mobile slider mode */}
            {mobileMode === 'slider' && (
              <div className="flex items-center gap-1 md:hidden">
                <button
                  type="button"
                  onClick={() => slideBy(-1)}
                  aria-label="Scroll left"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E2DBD0] bg-white text-[#161412] dark:border-white/12 dark:bg-[#16110E] dark:text-[#F5EDE0]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => slideBy(1)}
                  aria-label="Scroll right"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E2DBD0] bg-white text-[#161412] dark:border-white/12 dark:bg-[#16110E] dark:text-[#F5EDE0]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE VIEW: Swipeable Horizontal Slider OR 2-Column Grid */}
        <div className="mt-5 md:hidden">
          {mobileMode === 'slider' ? (
            <div
              ref={railRef}
              className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
            >
              {products.map((product) => (
                <div key={product.id} className="w-[218px] shrink-0 snap-start">
                  <ProductCard
                    product={product}
                    lang={lang}
                    compact={true}
                    onOpenDetail={onOpenDetail}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  compact={true}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP VIEW: Clean 3-Col / 4-Col Full Grid */}
        <div className="mt-6 hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

        {/* Compact See All CTA Placed Below Products */}
        <div className="mt-5 flex justify-center sm:mt-7">
          <button
            type="button"
            onClick={onSeeAll}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#161412]/20 bg-white px-4 text-xs font-semibold text-[#161412] transition-colors hover:border-[#F4B400] hover:bg-[#FFFBF0] dark:border-[#D8AF56]/35 dark:bg-[#16110E] dark:text-[#E8C46D] dark:hover:bg-[#D8AF56]/10 whitespace-nowrap"
          >
            <span>{lang === 'bn' ? 'আরও দেখুন' : 'See All'}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
