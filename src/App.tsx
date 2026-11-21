import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Flame,
  Home,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  CategoryId,
  CollectionId,
  JewelleryProduct,
  KaratGrade,
  LangMode,
  RAHA_BRAND,
  RAHA_CATEGORIES,
  RAHA_COLLECTIONS,
  RAHA_PRODUCTS,
  RAHA_REVIEWS,
  ThemeMode,
} from './data/rahaCatalog';
import { RahaHeader } from './components/RahaHeader';
import { HeroBannerSlider } from './components/HeroBannerSlider';
import { ProductShowcaseSection } from './components/ProductShowcaseSection';
import { ActiveRouteView, ListingPage } from './components/ListingPage';
import { ResilientImage } from './components/ResilientImage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RahaScreenshotStudio } from './components/RahaScreenshotStudio';

function parseRouteFromHash(): ActiveRouteView {
  const hash = window.location.hash;
  const catMatch = hash.match(/^#\/category\/([a-z-]+)$/);
  if (catMatch) {
    const id = catMatch[1] as CategoryId;
    if (RAHA_CATEGORIES.some((c) => c.id === id)) {
      return { type: 'category', id };
    }
  }
  const colMatch = hash.match(/^#\/collection\/([a-z-]+)$/);
  if (colMatch) {
    const id = colMatch[1] as CollectionId;
    if (id in RAHA_COLLECTIONS) {
      return { type: 'collection', id };
    }
  }
  return { type: 'home' };
}

export default function App() {
  const [lang, setLang] = useState<LangMode>('bn');
  // Default to the requested crisp White + Golden-Amber mode, with 1-tap toggle to Black Mode
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [showShots, setShowShots] = useState<boolean>(false);
  const [route, setRoute] = useState<ActiveRouteView>(() => parseRouteFromHash());

  const [detailModal, setDetailModal] = useState<{
    product: JewelleryProduct;
    karat: KaratGrade;
  } | null>(null);

  const categoriesSectionRef = useRef<HTMLElement | null>(null);

  // Sync Tailwind v4 `.dark` class on <html> cleanly
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Sync browser Back / Forward navigation
  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateHome = () => {
    setRoute({ type: 'home' });
    window.history.pushState(null, '', '#/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (id: CategoryId) => {
    setRoute({ type: 'category', id });
    window.history.pushState(null, '', `#/category/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCollection = (id: CollectionId) => {
    setRoute({ type: 'collection', id });
    window.history.pushState(null, '', `#/collection/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    if (route.type !== 'home') {
      setRoute({ type: 'home' });
      window.history.pushState(null, '', '#/');
      window.setTimeout(() => {
        categoriesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      categoriesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hotSaleProducts = useMemo(() => RAHA_PRODUCTS.filter((p) => p.isHotSale), []);
  const newArrivalProducts = useMemo(() => RAHA_PRODUCTS.filter((p) => p.isNewArrival), []);
  const signatureProducts = useMemo(() => RAHA_PRODUCTS.filter((p) => p.isSignature), []);

  const activeNav =
    route.type === 'home'
      ? 'home'
      : route.type === 'category'
        ? 'category'
        : route.id;

  if (showShots) {
    return (
      <RahaScreenshotStudio
        lang={lang}
        theme={theme}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onBackToLiveSite={() => setShowShots(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-noir-body text-[#161412] dark:bg-[#0C0908] dark:text-[#F5EDE0] transition-colors duration-200">
      <RahaHeader
        lang={lang}
        theme={theme}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onGoHome={navigateHome}
        onGoCategories={scrollToCategories}
        onOpenCollection={navigateToCollection}
        onOpenShots={() => setShowShots(true)}
        activeNav={activeNav}
      />

      {route.type !== 'home' ? (
        <ListingPage
          view={route}
          lang={lang}
          onBackHome={navigateHome}
          onSelectCategoryPage={navigateToCategory}
          onOpenDetail={(p, k) => setDetailModal({ product: p, karat: k })}
        />
      ) : (
        <main className="pb-16 md:pb-0">
          {/* 1. HERO COMBO & OFFER BANNER SLIDER + WELCOME STATEMENT */}
          <HeroBannerSlider
            lang={lang}
            onNavigateTarget={(type, id) => {
              if (type === 'category') navigateToCategory(id as CategoryId);
              else navigateToCollection(id as CollectionId);
            }}
            onScrollCategories={scrollToCategories}
          />

          {/* 2. 8 CATEGORIES SECTION (EACH OPENS DEDICATED CATEGORY PAGE) */}
          <section
            ref={categoriesSectionRef}
            className="mx-auto max-w-[1320px] px-3.5 py-10 sm:px-6 sm:py-14 lg:px-10"
          >
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-[#9A6B00] dark:text-[#D8AF56]">
                  {lang === 'bn' ? '৮টি জুয়েলারি ক্যাটাগরি' : 'Eight Curated Categories'}
                </p>
                <h2 className="font-noir-display mt-1 text-2xl font-semibold text-[#161412] sm:text-3xl lg:text-4xl dark:text-[#F5EDE0]">
                  {lang === 'bn' ? 'ক্যাটাগরি অনুযায়ী গহনা দেখুন' : 'Shop by Jewellery Category'}
                </h2>
              </div>
              <p className="text-xs text-[#6B6258] dark:text-[#A89B8C]">
                {lang === 'bn'
                  ? 'যেকোনো ক্যাটাগরিতে ক্লিক করে ২৪K–১৮K ক্যারেট ও প্রাইস ফিল্টারসহ সব ডিজাইন দেখুন'
                  : 'Tap any category to open its full catalog with 24K–18K karat & price filters'}
              </p>
            </div>

            {/* 2x4 Grid on Phone, 4x2 Grid on Desktop (zero orphan cards!) */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {RAHA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => navigateToCategory(cat.id)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#E7E2D8] bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F4B400] hover:shadow-[0_10px_28px_rgba(22,20,18,0.08)] dark:border-[#D8AF56]/20 dark:bg-[#16110E] dark:hover:border-[#D8AF56]/60 dark:hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B400]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F2EC] dark:bg-[#211A15]">
                    <ResilientImage
                      src={cat.image}
                      alt={lang === 'bn' ? cat.nameBn : cat.nameEn}
                      fallbackTone="warm"
                      label={lang === 'bn' ? cat.nameBn : cat.nameEn}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="font-noir-display text-base font-semibold text-[#161412] group-hover:text-[#9A6B00] dark:text-[#F5EDE0] dark:group-hover:text-[#E8C46D] transition-colors sm:text-xl">
                      {lang === 'bn' ? cat.nameBn : cat.nameEn}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#6B6258] dark:text-[#A89B8C] line-clamp-1 sm:line-clamp-2">
                      {lang === 'bn' ? cat.subtitleBn : cat.subtitleEn}
                    </p>

                    <div className="mt-auto flex items-center justify-end border-t border-[#EFECE5] pt-2.5 text-xs dark:border-white/8">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9A6B00] dark:text-[#E8C46D] group-hover:translate-x-0.5 transition-transform">
                        <span>{lang === 'bn' ? 'দেখুন' : 'View'}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 3. হট সেল (HOT SALE) */}
          <ProductShowcaseSection
            kicker={lang === 'bn' ? 'সর্বোচ্চ বিক্রিত ও ক্রেতাদের পছন্দ' : 'Top Selling Pieces'}
            title={lang === 'bn' ? 'হট সেল কালেকশন' : 'Hot Sale'}
            products={hotSaleProducts}
            lang={lang}
            surfaceTone="alt"
            defaultMobileLayout="slider"
            onSeeAll={() => navigateToCollection('hot-sale')}
            onOpenDetail={(p, k) => setDetailModal({ product: p, karat: k })}
          />

          {/* 4. নিউ অ্যারাইভালস (NEW ARRIVALS) */}
          <ProductShowcaseSection
            kicker={lang === 'bn' ? 'নতুন ডিজাইন ও কম্বো রিলিজ' : 'Fresh Season Releases'}
            title={lang === 'bn' ? 'নিউ অ্যারাইভালস' : 'New Arrivals'}
            products={newArrivalProducts}
            lang={lang}
            surfaceTone="base"
            defaultMobileLayout="slider"
            onSeeAll={() => navigateToCollection('new-arrivals')}
            onOpenDetail={(p, k) => setDetailModal({ product: p, karat: k })}
          />

          {/* 5. সিগনেচার কালেকশন (SIGNATURE COLLECTION) */}
          <ProductShowcaseSection
            kicker={lang === 'bn' ? 'RaHa-এর রাজকীয় এক্সক্লুসিভ' : 'Flagship Luxury Craft'}
            title={lang === 'bn' ? 'সিগনেচার কালেকশন' : 'Signature Collection'}
            products={signatureProducts}
            lang={lang}
            surfaceTone="alt"
            defaultMobileLayout="grid"
            onSeeAll={() => navigateToCollection('signature')}
            onOpenDetail={(p, k) => setDetailModal({ product: p, karat: k })}
          />

          {/* 6. সবার নিচে: ৪টি সার্ভিস গ্যারান্টি (COD, Return, Karat, Delivery) + ক্রেতাদের রিভিউ */}
          <section className="border-t border-[#E7E2D8] bg-white py-10 sm:py-14 dark:border-[#D8AF56]/15 dark:bg-[#0C0908]">
            <div className="mx-auto max-w-[1320px] px-3.5 sm:px-6 lg:px-10">
              {/* 4 Trust Pillars Placed at Bottom Before Contact & Footer */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {[
                  {
                    t: lang === 'bn' ? 'পূর্ণ ক্যাশ অন ডেলিভারি' : 'Full Cash on Delivery',
                    d:
                      lang === 'bn'
                        ? 'অগ্রিম ১ টাকাও নয় — পণ্য হাতে পেয়ে চেক করে পেমেন্ট'
                        : 'Zero advance required — pay cash when your parcel arrives',
                  },
                  {
                    t: lang === 'bn' ? 'পছন্দ না হলে রিটার্ন' : 'Instant Return Policy',
                    d:
                      lang === 'bn'
                        ? 'ডেলিভারি ম্যানের সামনে দেখে পছন্দ না হলে সহজ রিটার্ন'
                        : 'Check craftsmanship on delivery with hassle-free return',
                  },
                  {
                    t: lang === 'bn' ? '২৪K–১৮K ক্যারেট গ্যারান্টি' : '24K–18K Karat Tiers',
                    d:
                      lang === 'bn'
                        ? 'স্বচ্ছ ক্যারেট প্রাইসিং ও প্রিমিয়াম ভেলভেট গিফট বক্স'
                        : 'Transparent karat pricing packed in anti-tarnish velvet boxes',
                  },
                  {
                    t: lang === 'bn' ? '৬৪ জেলায় হোম ডেলিভারি' : '64-District Delivery',
                    d:
                      lang === 'bn'
                        ? 'ঢাকায় ২৪ ঘণ্টায় এবং ঢাকার বাইরে ২–৩ দিনে ডেলিভারি'
                        : '24h Dhaka express dispatch & 2–3 days nationwide',
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 sm:p-5 dark:border-[#D8AF56]/20 dark:bg-[#15100D]"
                  >
                    <div className="text-xs sm:text-sm font-bold text-[#161412] dark:text-[#E8C46D]">
                      {item.t}
                    </div>
                    <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#5F574E] dark:text-[#A89B8C]">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>

              {/* Verified Shopper Reviews */}
              <div className="mt-10">
                <p className="text-xs font-semibold text-[#9A6B00] dark:text-[#D8AF56]">
                  {lang === 'bn' ? 'ক্রেতাদের অভিজ্ঞতা' : 'Verified Shopper Stories'}
                </p>
                <h2 className="font-noir-display mt-1 text-2xl font-semibold text-[#161412] sm:text-3xl dark:text-[#F5EDE0]">
                  {lang === 'bn'
                    ? 'সারা বাংলাদেশের ৫,২০০+ ক্রেতার আস্থা'
                    : 'Trusted by 5,200+ Shoppers Across Bangladesh'}
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {RAHA_REVIEWS.map((review) => (
                    <blockquote
                      key={review.id}
                      className="flex flex-col justify-between rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-5 dark:border-[#D8AF56]/15 dark:bg-[#15100D]"
                    >
                      <p className="text-xs sm:text-sm leading-relaxed text-[#332E29] dark:text-[#DED3C5]">
                        “{lang === 'bn' ? review.quoteBn : review.quoteEn}”
                      </p>
                      <footer className="mt-4 border-t border-[#E5DEC9] pt-3 dark:border-white/10">
                        <div className="text-xs font-bold text-[#161412] dark:text-[#F5EDE0]">
                          {review.author}
                        </div>
                        <div className="mt-0.5 text-[11px] text-[#6B6258] dark:text-[#A89B8C]">
                          {review.location} · {review.item}
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* CONTACT ADDRESS & FOOTER */}
      <footer className="border-t border-[#E7E2D8] bg-[#161412] text-[#D4CCC0] dark:border-[#D8AF56]/15 dark:bg-[#090706]">
        <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-12">
            {/* Brand & Contact Address */}
            <div className="md:col-span-5">
              <div className="font-noir-display text-2xl font-bold text-[#F4B400] dark:text-[#E8C46D]">
                {RAHA_BRAND.name}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#E4DDD2]">
                {lang === 'bn' ? RAHA_BRAND.taglineBn : RAHA_BRAND.taglineEn} ·{' '}
                {lang === 'bn' ? RAHA_BRAND.promiseBn : RAHA_BRAND.promiseEn}
              </p>
              <div className="mt-3.5 space-y-1.5 text-xs text-[#C6BEB3]">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F4B400] dark:text-[#D8AF56]" aria-hidden="true" />
                  <span>{lang === 'bn' ? RAHA_BRAND.addressBn : RAHA_BRAND.addressEn}</span>
                </div>
                <a
                  href={`tel:${RAHA_BRAND.phone}`}
                  className="inline-flex items-center gap-2 font-semibold text-[#F4B400] dark:text-[#D8AF56] hover:underline tabular-nums"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {lang === 'bn' ? 'হটলাইন / হোয়াটসঅ্যাপ:' : 'Hotline / WhatsApp:'}{' '}
                    {RAHA_BRAND.phone}
                  </span>
                </a>
              </div>
            </div>

            {/* 8 Category Quick Links */}
            <div className="md:col-span-4">
              <div className="text-xs font-semibold text-white">
                {lang === 'bn' ? '৮টি ক্যাটাগরি' : 'All 8 Categories'}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {RAHA_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => navigateToCategory(cat.id)}
                    className="text-left hover:text-[#F4B400] dark:hover:text-[#E8C46D] transition-colors"
                  >
                    {lang === 'bn' ? cat.nameBn : cat.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Collections & Tools */}
            <div className="md:col-span-3 space-y-2 text-xs md:text-right">
              <div className="font-semibold text-white">
                {lang === 'bn' ? 'কুইক লিংকস' : 'Quick Links'}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => navigateToCollection('hot-sale')}
                  className="hover:text-[#F4B400]"
                >
                  {lang === 'bn' ? 'হট সেল' : 'Hot Sale'}
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCollection('new-arrivals')}
                  className="hover:text-[#F4B400]"
                >
                  {lang === 'bn' ? 'নিউ অ্যারাইভালস' : 'New Arrivals'}
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCollection('signature')}
                  className="hover:text-[#F4B400]"
                >
                  {lang === 'bn' ? 'সিগনেচার' : 'Signature'}
                </button>
                <a
                  href={RAHA_BRAND.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4B400]"
                >
                  {lang === 'bn' ? 'মেসেঞ্জার ইনবক্স' : 'Messenger'}
                </a>
                <button
                  type="button"
                  onClick={() => setShowShots(true)}
                  className="hover:text-[#F4B400]"
                >
                  {lang === 'bn' ? 'PC ও Phone PNG' : 'PC & Phone PNG'}
                </button>
              </div>
              <p className="pt-2 text-[11px] opacity-65">© 2026 {RAHA_BRAND.name}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIM MOBILE STICKY BOTTOM NAV (<= 56px, Info Catalog + Direct Messenger) */}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed bottom-0 left-0 right-0 z-40 grid h-14 grid-cols-4 border-t border-[#E7E2D8] bg-white/98 backdrop-blur-md dark:border-[#D8AF56]/20 dark:bg-[#0C0908]/98 md:hidden"
      >
        <button
          type="button"
          onClick={navigateHome}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${
            route.type === 'home'
              ? 'text-[#9A6B00] dark:text-[#E8C46D]'
              : 'text-[#6B6258] dark:text-[#A89B8C]'
          }`}
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
        </button>
        <button
          type="button"
          onClick={scrollToCategories}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${
            route.type === 'category'
              ? 'text-[#9A6B00] dark:text-[#E8C46D]'
              : 'text-[#6B6258] dark:text-[#A89B8C]'
          }`}
        >
          <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          <span>{lang === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</span>
        </button>
        <button
          type="button"
          onClick={() => navigateToCollection('hot-sale')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${
            route.type === 'collection' && route.id === 'hot-sale'
              ? 'text-[#9A6B00] dark:text-[#E8C46D]'
              : 'text-[#6B6258] dark:text-[#A89B8C]'
          }`}
        >
          <Flame className="h-4 w-4" aria-hidden="true" />
          <span>{lang === 'bn' ? 'হট সেল' : 'Hot Sale'}</span>
        </button>
        <a
          href={RAHA_BRAND.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-[#9A6B00] dark:text-[#E8C46D]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>{lang === 'bn' ? 'মেসেঞ্জার' : 'Messenger'}</span>
        </a>
      </nav>

      {/* PRODUCT DETAIL & 24K–18K KARAT PRICING MODAL */}
      <ProductDetailModal
        product={detailModal?.product ?? null}
        initialKarat={detailModal?.karat ?? '22K'}
        lang={lang}
        onClose={() => setDetailModal(null)}
      />
    </div>
  );
}
