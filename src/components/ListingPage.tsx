import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import {
  CategoryId,
  CollectionId,
  computeKaratPricing,
  JewelleryProduct,
  KARAT_LIST,
  KARAT_TIERS,
  KaratGrade,
  LangMode,
  RAHA_CATEGORIES,
  RAHA_COLLECTIONS,
  RAHA_PRODUCTS,
} from '../data/rahaCatalog';
import { ProductCard } from './ProductCard';

export type ActiveRouteView =
  | { type: 'home' }
  | { type: 'category'; id: CategoryId }
  | { type: 'collection'; id: CollectionId };

interface ListingPageProps {
  view: Exclude<ActiveRouteView, { type: 'home' }>;
  lang: LangMode;
  onBackHome: () => void;
  onSelectCategoryPage: (id: CategoryId) => void;
  onOpenDetail: (product: JewelleryProduct, initialKarat: KaratGrade) => void;
}

type PriceRange = 'all' | 'under-1500' | '1500-3000' | '3000-5000' | 'over-5000';
type SortMode = 'featured' | 'price-asc' | 'price-desc' | 'weight-desc';

export function ListingPage({
  view,
  lang,
  onBackHome,
  onSelectCategoryPage,
  onOpenDetail,
}: ListingPageProps) {
  const [subCategoryFilter, setSubCategoryFilter] = useState<CategoryId | 'all'>('all');
  const [karatFilter, setKaratFilter] = useState<KaratGrade | 'all'>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortMode>('price-asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset sub-filters neatly when navigating to a different Category or Collection page
  useEffect(() => {
    setSubCategoryFilter('all');
    setPriceRange('all');
    setSearchQuery('');
  }, [view.type, view.id]);

  const pageHeader = useMemo(() => {
    if (view.type === 'category') {
      const cat = RAHA_CATEGORIES.find((c) => c.id === view.id) ?? RAHA_CATEGORIES[0];
      return {
        breadcrumb: lang === 'bn' ? cat.nameBn : cat.nameEn,
        kicker: lang === 'bn' ? 'ক্যাটাগরি কালেকশন · ২৪K / ২২K / ২১K / ১৮K' : 'Category Collection · 24K / 22K / 21K / 18K',
        title: lang === 'bn' ? `${cat.nameBn} কালেকশন` : `${cat.nameEn} Collection`,
        description: lang === 'bn' ? cat.descriptionBn : cat.descriptionEn,
      };
    }
    const col = RAHA_COLLECTIONS[view.id];
    return {
      breadcrumb: lang === 'bn' ? col.nameBn : col.nameEn,
      kicker: lang === 'bn' ? col.kickerBn : col.kickerEn,
      title: lang === 'bn' ? col.nameBn : col.nameEn,
      description: lang === 'bn' ? col.descriptionBn : col.descriptionEn,
    };
  }, [view, lang]);

  const baseProducts = useMemo(() => {
    if (view.type === 'category') {
      return RAHA_PRODUCTS.filter((p) => p.categoryId === view.id);
    }
    if (view.id === 'hot-sale') return RAHA_PRODUCTS.filter((p) => p.isHotSale);
    if (view.id === 'new-arrivals') return RAHA_PRODUCTS.filter((p) => p.isNewArrival);
    return RAHA_PRODUCTS.filter((p) => p.isSignature);
  }, [view]);

  const filteredProducts = useMemo(() => {
    const activeKarat = (p: JewelleryProduct): KaratGrade =>
      karatFilter === 'all' ? p.defaultKarat : karatFilter;

    let list = baseProducts.filter((p) => {
      const catMatch =
        view.type === 'category' || subCategoryFilter === 'all' || p.categoryId === subCategoryFilter;

      const q = searchQuery.trim().toLowerCase();
      const qCompact = q.replace(/[-\s]/g, '');
      const skuCompact = p.sku.toLowerCase().replace(/[-\s]/g, '');
      const searchMatch =
        !q ||
        p.nameBn.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        skuCompact.includes(qCompact) ||
        qCompact.startsWith(skuCompact);

      const price = computeKaratPricing(p, activeKarat(p)).finalPrice;
      const priceMatch =
        priceRange === 'all' ||
        (priceRange === 'under-1500' && price < 1500) ||
        (priceRange === '1500-3000' && price >= 1500 && price <= 3000) ||
        (priceRange === '3000-5000' && price > 3000 && price <= 5000) ||
        (priceRange === 'over-5000' && price > 5000);

      return catMatch && searchMatch && priceMatch;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort(
        (a, b) =>
          computeKaratPricing(a, activeKarat(a)).finalPrice -
          computeKaratPricing(b, activeKarat(b)).finalPrice
      );
    } else if (sortBy === 'price-desc') {
      list = [...list].sort(
        (a, b) =>
          computeKaratPricing(b, activeKarat(b)).finalPrice -
          computeKaratPricing(a, activeKarat(a)).finalPrice
      );
    } else if (sortBy === 'weight-desc') {
      list = [...list].sort((a, b) => b.weightGrams - a.weightGrams);
    }

    return list;
  }, [baseProducts, view.type, subCategoryFilter, karatFilter, priceRange, sortBy, searchQuery]);

  return (
    <main className="min-h-[75vh] bg-white pb-24 text-[#161412] dark:bg-[#0C0908] dark:text-[#F5EDE0] md:pb-16 transition-colors">
      {/* Top Breadcrumb & 8-Category Switcher */}
      <div className="border-b border-[#E7E2D8] bg-[#FAF8F4] dark:border-[#D8AF56]/15 dark:bg-[#120D0B]">
        <div className="mx-auto max-w-[1320px] px-4 py-3.5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#6B6258] dark:text-[#A89B8C]">
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-1.5 font-semibold text-[#9A6B00] hover:underline dark:text-[#E8C46D] whitespace-nowrap"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lang === 'bn' ? 'হোম পেজ' : 'Home'}</span>
              </button>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#161412] dark:text-[#F5EDE0]">
                {pageHeader.breadcrumb}
              </span>
            </div>

            {/* If on Category Page: Switch between the 8 Categories. If on Collection Page (e.g. New Arrivals): Filter by Section! */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {view.type === 'collection' && (
                <button
                  type="button"
                  onClick={() => setSubCategoryFilter('all')}
                  className={`h-8 rounded-md px-3 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    subCategoryFilter === 'all'
                      ? 'bg-[#161412] text-white dark:bg-[#D8AF56] dark:text-[#120D0A]'
                      : 'border border-[#E5DEC9] bg-white text-[#5A534A] hover:text-[#161412] dark:border-white/10 dark:bg-white/5 dark:text-[#C8BCAE] dark:hover:text-white'
                  }`}
                >
                  {lang === 'bn' ? `সব গহনা (${baseProducts.length})` : `All (${baseProducts.length})`}
                </button>
              )}

              {RAHA_CATEGORIES.map((cat) => {
                const isActive =
                  view.type === 'category'
                    ? view.id === cat.id
                    : subCategoryFilter === cat.id;
                const countInCollection =
                  view.type === 'collection'
                    ? baseProducts.filter((p) => p.categoryId === cat.id).length
                    : null;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (view.type === 'category') {
                        onSelectCategoryPage(cat.id);
                      } else {
                        setSubCategoryFilter(cat.id);
                      }
                    }}
                    className={`h-8 rounded-md px-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#F4B400] font-semibold text-[#161412] dark:bg-[#D8AF56] dark:text-[#120D0A]'
                        : 'border border-[#E5DEC9] bg-white text-[#5A534A] hover:border-[#F4B400] hover:text-[#161412] dark:border-white/10 dark:bg-white/5 dark:text-[#C8BCAE] dark:hover:text-white'
                    }`}
                  >
                    {lang === 'bn' ? cat.nameBn : cat.nameEn}
                    {countInCollection !== null && countInCollection > 0
                      ? ` (${countInCollection})`
                      : ''}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Page Header & 4-Grade Karat Purity Reference */}
      <section className="border-b border-[#E7E2D8] bg-[#FAF8F4] dark:border-[#D8AF56]/15 dark:bg-gradient-to-b dark:from-[#17110E] dark:to-[#0C0908]">
        <div className="mx-auto max-w-[1320px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-[#9A6B00] dark:text-[#D8AF56]">
                {pageHeader.kicker}
              </p>
              <h1 className="font-noir-display mt-1.5 text-2xl font-semibold text-[#161412] sm:text-4xl lg:text-5xl dark:text-[#F5EDE0] [text-wrap:balance]">
                {pageHeader.title}
              </h1>
              <p className="mt-2.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#5F574E] dark:text-[#C2B6A8]">
                {pageHeader.description}
              </p>
            </div>

            {/* 4-Karat Tier Strip (24K / 22K / 21K / 18K) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-4 divide-x divide-[#E7E2D8] overflow-hidden rounded-xl border border-[#E5DEC9] bg-white dark:divide-[#D8AF56]/15 dark:border-[#D8AF56]/20 dark:bg-[#140F0D]">
                {KARAT_LIST.map((grade) => {
                  const spec = KARAT_TIERS[grade];
                  const isFocused = karatFilter === grade;
                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setKaratFilter(isFocused ? 'all' : grade)}
                      className={`p-2.5 sm:p-3 text-left transition-colors ${
                        isFocused
                          ? 'bg-[#F4B400]/20 dark:bg-[#D8AF56]/20'
                          : 'hover:bg-[#FAF8F4] dark:hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold text-[#9A6B00] dark:text-[#E8C46D] tabular-nums">
                        {grade}
                      </div>
                      <div className="mt-0.5 text-[10px] text-[#5F574E] dark:text-[#C8BCAE] truncate">
                        {spec.purityCode}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Default Filter Bar: Karat + Price Range + Low-to-High Sort + Search */}
      <section className="mx-auto max-w-[1320px] px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-3.5 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 sm:p-4 dark:border-[#D8AF56]/15 dark:bg-[#140F0D] lg:flex-row lg:items-center lg:justify-between">
          {/* Karat Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F574E] dark:text-[#A89B8C] mr-1 whitespace-nowrap shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#9A6B00] dark:text-[#D8AF56]" aria-hidden="true" />
              <span>{lang === 'bn' ? 'ক্যারেট:' : 'Karat:'}</span>
            </span>
            <button
              type="button"
              onClick={() => setKaratFilter('all')}
              className={`h-9 rounded-md px-3 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                karatFilter === 'all'
                  ? 'bg-[#161412] text-white dark:bg-[#D8AF56] dark:text-[#120D0A]'
                  : 'border border-[#E2DBD0] bg-white text-[#5A534A] hover:text-[#161412] dark:border-white/10 dark:bg-[#0C0908] dark:text-[#C8BCAE] dark:hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'সব ক্যারেট' : 'All'}
            </button>
            {KARAT_LIST.map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => setKaratFilter(grade)}
                className={`h-9 rounded-md px-3 text-xs font-semibold transition-colors tabular-nums whitespace-nowrap shrink-0 ${
                  karatFilter === grade
                    ? 'bg-[#F4B400] text-[#161412] dark:bg-[#D8AF56] dark:text-[#120D0A]'
                    : 'border border-[#E2DBD0] bg-white text-[#5A534A] hover:border-[#F4B400] hover:text-[#161412] dark:border-white/10 dark:bg-[#0C0908] dark:text-[#C8BCAE] dark:hover:text-white'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          {/* Search, Price Range & Low-to-High Sort */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <div className="relative col-span-2 sm:w-44">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8E857B]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'bn' ? 'নাম বা ID (যেমন S-1001-22K)...' : 'Name or ID (e.g. S-1001-22K)...'
                }
                className="h-9 w-full rounded-md border border-[#DFD8CC] bg-white pl-8 pr-3 text-xs text-[#161412] placeholder:text-[#8E857B] focus:border-[#F4B400] focus:outline-none dark:border-white/12 dark:bg-[#0C0908] dark:text-[#F5EDE0] dark:placeholder:text-[#7F7264] dark:focus:border-[#D8AF56]"
              />
            </div>

            <select
              aria-label="Filter by price range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRange)}
              className="h-9 rounded-md border border-[#DFD8CC] bg-white px-2.5 text-xs text-[#161412] focus:border-[#F4B400] focus:outline-none dark:border-white/12 dark:bg-[#0C0908] dark:text-[#E8DCC8] dark:focus:border-[#D8AF56]"
            >
              <option value="all">{lang === 'bn' ? 'সব প্রাইস রেঞ্জ' : 'All Prices'}</option>
              <option value="under-1500">
                {lang === 'bn' ? '৳১,৫০০ এর নিচে' : 'Under ৳1,500'}
              </option>
              <option value="1500-3000">
                {lang === 'bn' ? '৳১,৫০০ – ৳৩,০০০' : '৳1,500 – ৳3,000'}
              </option>
              <option value="3000-5000">
                {lang === 'bn' ? '৳৩,০০০ – ৳৫,০০০' : '৳3,000 – ৳5,000'}
              </option>
              <option value="over-5000">{lang === 'bn' ? '৳৫,০০০+' : 'Over ৳5,000'}</option>
            </select>

            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortMode)}
              className="h-9 rounded-md border border-[#DFD8CC] bg-white px-2.5 text-xs text-[#161412] focus:border-[#F4B400] focus:outline-none dark:border-white/12 dark:bg-[#0C0908] dark:text-[#E8DCC8] dark:focus:border-[#D8AF56]"
            >
              <option value="price-asc">
                {lang === 'bn' ? 'দাম: কম → বেশি (Low to High)' : 'Price: Low to High'}
              </option>
              <option value="price-desc">
                {lang === 'bn' ? 'দাম: বেশি → কম (High to Low)' : 'Price: High to Low'}
              </option>
              <option value="featured">{lang === 'bn' ? 'জনপ্রিয়' : 'Featured'}</option>
              <option value="weight-desc">
                {lang === 'bn' ? 'ওজন: বেশি → কম' : 'Weight: High to Low'}
              </option>
            </select>
          </div>
        </div>

        {/* Active Filter Context Note */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6258] dark:text-[#A89B8C]">
          <span>
            {karatFilter !== 'all' ? (
              <>
                <strong className="text-[#9A6B00] dark:text-[#E8C46D]">
                  {lang === 'bn'
                    ? KARAT_TIERS[karatFilter].labelBn
                    : KARAT_TIERS[karatFilter].labelEn}
                </strong>{' '}
                —{' '}
                {lang === 'bn'
                  ? KARAT_TIERS[karatFilter].rateNoteBn
                  : KARAT_TIERS[karatFilter].rateNoteEn}
              </>
            ) : (
              <span>
                {lang === 'bn'
                  ? 'প্রতিটি ডিজাইনের কার্ডেই ২৪K / ২২K / ২১K / ১৮K সিলেক্ট করে দাম দেখতে পারবেন'
                  : 'Tap 24K / 22K / 21K / 18K on any card to compare live pricing'}
              </span>
            )}
          </span>
          <span className="tabular-nums font-medium">
            {lang === 'bn'
              ? `মোট ${filteredProducts.length}টি ডিজাইন`
              : `${filteredProducts.length} designs shown`}
          </span>
        </div>

        {/* Product Grid: 2-col on Mobile, 3-col on Tablet/Desktop, 4-col on Wide PC */}
        {filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-10 text-center dark:border-[#D8AF56]/15 dark:bg-[#16110E]">
            <p className="text-sm font-medium">
              {lang === 'bn'
                ? 'এই ফিল্টারে কোনো ডিজাইন পাওয়া যায়নি।'
                : 'No designs match your current filter selection.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubCategoryFilter('all');
                setKaratFilter('all');
                setPriceRange('all');
                setSearchQuery('');
              }}
              className="mt-4 h-10 rounded-md bg-[#F4B400] px-5 text-xs font-semibold text-[#161412] hover:bg-[#E2A500] dark:bg-[#D8AF56]"
            >
              {lang === 'bn' ? 'সব ফিল্টার রিসেট করুন' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                forcedKarat={karatFilter === 'all' ? null : karatFilter}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
