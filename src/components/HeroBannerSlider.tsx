import { TouchEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import {
  CategoryId,
  CollectionId,
  HERO_SLIDES,
  LangMode,
  RAHA_BRAND,
} from '../data/rahaCatalog';
import { ResilientImage } from './ResilientImage';

interface HeroBannerSliderProps {
  lang: LangMode;
  onNavigateTarget: (type: 'category' | 'collection', id: CategoryId | CollectionId) => void;
  onScrollCategories: () => void;
}

export function HeroBannerSlider({
  lang,
  onNavigateTarget,
  onScrollCategories,
}: HeroBannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setPaused(true);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current !== null) {
      const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
      if (Math.abs(delta) > 40) {
        if (delta < 0) goNext();
        else goPrev();
      }
    }
    touchStartX.current = null;
    setPaused(false);
  };

  const slide = HERO_SLIDES[activeIndex];

  return (
    <section className="border-b border-[#E7E2D8] bg-[#FAF8F4] dark:border-[#D8AF56]/15 dark:bg-[#0C0908] transition-colors">
      <div className="mx-auto max-w-[1320px] px-3 pt-3 pb-4 sm:px-6 sm:pt-5 sm:pb-7 lg:px-10">
        {/* Carousel Viewport (Swipeable on Phone + Click Controls on PC) */}
        <div
          className="relative overflow-hidden rounded-2xl border border-[#E5DEC9] bg-[#120D0A] shadow-[0_14px_40px_rgba(22,20,18,0.14)] dark:border-[#D8AF56]/25 dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Aspect ratio tuned for mobile + wide desktop banners (sleek & punchy) */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.75/1] w-full overflow-hidden">
            <ResilientImage
              src={slide.image}
              alt={lang === 'bn' ? slide.titleBn : slide.titleEn}
              fallbackTone="dark"
              label={slide.titleEn}
              className="h-full w-full object-cover transition-opacity duration-300"
            />

            {/* Measured contrast scrim for combo/offer slides (kept gentle on Official Banner so brand artwork stays crisp) */}
            {slide.isOfficialBanner ? (
              <div
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                aria-hidden="true"
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0C0908]/92 via-[#0C0908]/60 to-[#0C0908]/15"
                aria-hidden="true"
              />
            )}

            {/* Slide Content Overlay */}
            {slide.isOfficialBanner ? (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3.5 sm:px-8 sm:pb-5">
                <p className="text-[11px] font-medium text-[#F5DC93] sm:text-xs truncate">
                  {lang === 'bn' ? slide.kickerBn : slide.kickerEn} ·{' '}
                  {lang === 'bn' ? slide.titleBn : slide.titleEn}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigateTarget(slide.targetType, slide.targetId)}
                  className="inline-flex h-8 sm:h-9 items-center gap-1.5 rounded-md bg-[#F4B400] px-3 sm:px-4 text-[11px] sm:text-xs font-semibold text-[#161412] transition-colors hover:bg-[#FFC41F] whitespace-nowrap shrink-0"
                >
                  <span>{lang === 'bn' ? slide.ctaBn : slide.ctaEn}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-14">
                <div className="max-w-lg">
                  <p className="text-[11px] font-semibold text-[#F4B400] sm:text-xs">
                    {lang === 'bn' ? slide.kickerBn : slide.kickerEn}
                  </p>
                  <h2 className="font-noir-display mt-1.5 text-lg font-semibold leading-snug text-white sm:text-3xl lg:text-4xl [text-wrap:balance]">
                    {lang === 'bn' ? slide.titleBn : slide.titleEn}
                  </h2>
                  <p className="mt-2 hidden sm:block text-xs leading-relaxed text-[#E6DDD0] sm:text-sm">
                    {lang === 'bn' ? slide.subtitleBn : slide.subtitleEn}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigateTarget(slide.targetType, slide.targetId)}
                    className="mt-3 sm:mt-5 inline-flex h-9 sm:h-11 items-center gap-1.5 rounded-md bg-[#F4B400] px-4 sm:px-5 text-xs sm:text-sm font-semibold text-[#161412] transition-colors hover:bg-[#FFC41F] whitespace-nowrap"
                  >
                    <span>{lang === 'bn' ? slide.ctaBn : slide.ctaEn}</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Prev / Next Controls */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous offer slide"
              className="absolute left-2.5 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-xs transition-colors hover:bg-black/80"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next offer slide"
              className="absolute right-2.5 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-xs transition-colors hover:bg-black/80"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Slide Navigation Strip */}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#140F0D] px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeIndex
                      ? 'w-7 bg-[#F4B400]'
                      : 'w-2 bg-white/30 hover:bg-white/55'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#C8BCAE] tabular-nums">
              {activeIndex + 1} / {total} ·{' '}
              {lang === 'bn' ? 'স্লাইড করে অফার দেখুন' : 'Swipe offers'}
            </span>
          </div>
        </div>

        {/* Welcome & Brand Trust Statement Directly Below Banner (Compact, Side-by-Side Actions) */}
        <div className="mt-3.5 flex flex-col gap-3 rounded-xl border border-[#E7E2D8] bg-white p-3.5 sm:mt-5 sm:p-5 lg:flex-row lg:items-center lg:justify-between dark:border-[#D8AF56]/15 dark:bg-[#15100D]">
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-semibold text-[#9A6B00] dark:text-[#D8AF56]">
              {lang === 'bn' ? RAHA_BRAND.welcomeBn : RAHA_BRAND.welcomeEn}
            </p>
            <h1 className="font-noir-display mt-0.5 text-lg font-semibold leading-snug text-[#161412] sm:text-2xl lg:text-3xl dark:text-[#F5EDE0] [text-wrap:balance]">
              {lang === 'bn' ? RAHA_BRAND.taglineBn : RAHA_BRAND.taglineEn}
            </h1>
            <p className="mt-1 text-[11px] leading-relaxed text-[#5F574E] sm:text-xs dark:text-[#C2B6A8]">
              {lang === 'bn'
                ? '২৪K, ২২K, ২১K ও ১৮K ক্যারেট প্রাইসিংয়ে ৮টি ক্যাটাগরি — হাতে পেয়ে চেক করে পেমেন্ট।'
                : '8 jewellery categories with 24K–18K pricing — inspect on delivery before paying.'}
            </p>
          </div>

          {/* Side-by-Side Single Row on Mobile & Desktop */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onScrollCategories}
              className="flex h-9 sm:h-10 items-center justify-center gap-1 rounded-md bg-[#F4B400] px-2.5 sm:px-4 text-[11px] sm:text-xs font-semibold text-[#161412] transition-colors hover:bg-[#E2A500] dark:bg-[#D8AF56] dark:hover:bg-[#E7C26E] whitespace-nowrap"
            >
              <span className="truncate">{lang === 'bn' ? 'সব ক্যাটাগরি দেখুন' : 'All Categories'}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </button>
            <a
              href={`tel:${RAHA_BRAND.phone}`}
              className="flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-md border border-[#161412]/20 bg-[#FAF8F4] px-2.5 sm:px-3.5 text-[11px] sm:text-xs font-semibold text-[#161412] transition-colors hover:bg-[#F2EFE8] dark:border-[#D8AF56]/30 dark:bg-[#0C0908] dark:text-[#E8DCC8] dark:hover:bg-white/5 whitespace-nowrap tabular-nums"
            >
              <Phone className="h-3 w-3 shrink-0 text-[#9A6B00] dark:text-[#D8AF56]" aria-hidden="true" />
              <span>{RAHA_BRAND.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
