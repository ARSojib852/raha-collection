import { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  ArrowLeft,
  Check,
  Download,
  Expand,
  Flame,
  Home,
  LayoutGrid,
  Loader2,
  MessageCircle,
  Monitor,
  Moon,
  Smartphone,
  Sun,
  X,
} from 'lucide-react';
import {
  CategoryId,
  CollectionId,
  computeKaratPricing,
  formatBDT,
  getFullProductCode,
  HERO_SLIDES,
  KARAT_LIST,
  KaratGrade,
  LangMode,
  RAHA_BRAND,
  RAHA_CATEGORIES,
  RAHA_COLLECTIONS,
  RAHA_PRODUCTS,
  ThemeMode,
} from '../data/rahaCatalog';
import { ResilientImage } from './ResilientImage';

interface RahaScreenshotStudioProps {
  lang: LangMode;
  theme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onBackToLiveSite: () => void;
}

type ShotTarget =
  | { type: 'home' }
  | { type: 'category'; id: CategoryId }
  | { type: 'collection'; id: CollectionId };

function RahaShotCanvas({
  mode,
  target,
  karat,
  lang,
  theme,
}: {
  mode: 'pc' | 'phone';
  target: ShotTarget;
  karat: KaratGrade;
  lang: LangMode;
  theme: ThemeMode;
}) {
  const isPhone = mode === 'phone';
  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-[#0C0908] text-[#F5EDE0]' : 'bg-white text-[#161412]';
  const bgAlt = isDark ? 'bg-[#120D0B]' : 'bg-[#FAF8F4]';
  const cardCls = isDark
    ? 'border-[#D8AF56]/15 bg-[#16110E]'
    : 'border-[#E7E2D8] bg-white';
  const borderCls = isDark ? 'border-[#D8AF56]/15' : 'border-[#E7E2D8]';
  const mutedCls = isDark ? 'text-[#A89B8C]' : 'text-[#6B6258]';
  const accentText = isDark ? 'text-[#E8C46D]' : 'text-[#9A6B00]';
  const ctaBtn = isDark
    ? 'bg-[#D8AF56] text-[#120D0A]'
    : 'bg-[#161412] text-white';

  const hotProducts = useMemo(() => RAHA_PRODUCTS.filter((p) => p.isHotSale).slice(0, 6), []);
  const newProducts = useMemo(() => RAHA_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 6), []);
  const sigProducts = useMemo(() => RAHA_PRODUCTS.filter((p) => p.isSignature).slice(0, 6), []);

  const listingProducts = useMemo(() => {
    if (target.type === 'category') {
      return RAHA_PRODUCTS.filter((p) => p.categoryId === target.id);
    }
    if (target.type === 'collection') {
      if (target.id === 'hot-sale') return RAHA_PRODUCTS.filter((p) => p.isHotSale);
      if (target.id === 'new-arrivals') return RAHA_PRODUCTS.filter((p) => p.isNewArrival);
      return RAHA_PRODUCTS.filter((p) => p.isSignature);
    }
    return [];
  }, [target]);

  const listingTitle =
    target.type === 'category'
      ? lang === 'bn'
        ? `${RAHA_CATEGORIES.find((c) => c.id === target.id)?.nameBn} কালেকশন`
        : `${RAHA_CATEGORIES.find((c) => c.id === target.id)?.nameEn} Collection`
      : target.type === 'collection'
        ? lang === 'bn'
          ? RAHA_COLLECTIONS[target.id].nameBn
          : RAHA_COLLECTIONS[target.id].nameEn
        : '';

  const renderCardGrid = (items: typeof RAHA_PRODUCTS) => (
    <div className={`mt-4 grid ${isPhone ? 'grid-cols-2 gap-2.5' : 'grid-cols-3 gap-5'}`}>
      {items.map((product) => {
        const pricing = computeKaratPricing(product, karat);
        return (
          <div
            key={product.id}
            className={`flex flex-col overflow-hidden rounded-xl border ${cardCls}`}
          >
            <div className={`aspect-[4/3] w-full overflow-hidden ${isDark ? 'bg-[#1F1814]' : 'bg-[#F5F2EC]'}`}>
              <ResilientImage
                src={product.image}
                alt={product.nameEn}
                fallbackTone={isDark ? 'dark' : 'warm'}
                className="h-full w-full object-cover"
              />
            </div>
            <div className={`flex items-center justify-between border-b ${borderCls} ${bgAlt} px-2.5 py-1 text-[9px] tabular-nums`}>
              <span className="font-semibold">ID: {getFullProductCode(product, karat)}</span>
              <span className={accentText}>{lang === 'bn' ? 'কপি' : 'Copy'}</span>
            </div>
            <div className={isPhone ? 'p-2.5' : 'p-4'}>
              <div className={`text-[10px] tabular-nums truncate ${mutedCls}`}>
                <span className={`font-semibold ${accentText}`}>{karat}</span> ·{' '}
                {product.weightTraditionalBn}
              </div>
              <div className={`mt-1 font-semibold leading-snug ${isPhone ? 'text-xs' : 'text-sm'}`}>
                {lang === 'bn' ? product.nameBn : product.nameEn}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5 tabular-nums">
                <span className={`font-bold ${isPhone ? 'text-xs' : 'text-base'} ${isDark ? 'text-[#E8C46D]' : 'text-[#161412]'}`}>
                  {formatBDT(pricing.finalPrice)}
                </span>
                <span className="text-[10px] opacity-55 line-through">
                  {formatBDT(pricing.comparePrice)}
                </span>
              </div>
              <div className={`mt-2.5 flex items-center justify-center gap-1 rounded-md py-1.5 text-center text-[10px] font-semibold ${ctaBtn}`}>
                <MessageCircle className="h-3 w-3" aria-hidden="true" />
                <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Order Now'}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`${bgMain} font-noir-body`} style={{ width: isPhone ? '390px' : '1280px' }}>
      {isPhone && (
        <div className="flex h-7 items-center justify-between bg-[#161412] px-5 text-[10px] font-medium text-white/80 tabular-nums">
          <span>9:41</span>
          <span className="opacity-75">rahacollection.com</span>
          <span>5G · 100%</span>
        </div>
      )}

      {/* Top Assurance Strip */}
      <div
        className={`flex items-center justify-between ${
          isDark
            ? 'border-b border-[#D8AF56]/15 bg-[#16110E] text-[#E8DCC8]'
            : 'border-b border-[#D99D00]/30 bg-[#F4B400] text-[#161412]'
        } ${isPhone ? 'px-3.5 py-2 text-[10px]' : 'px-10 py-2 text-xs'}`}
      >
        <span className="truncate font-medium">
          {lang === 'bn' ? RAHA_BRAND.promiseBn : RAHA_BRAND.promiseEn}
        </span>
        <span className="font-semibold tabular-nums whitespace-nowrap">{RAHA_BRAND.phone}</span>
      </div>

      {/* Header */}
      <div className={`flex items-center justify-between border-b ${borderCls} ${isPhone ? 'h-12 px-3.5' : 'h-16 px-10'}`}>
        <div className={`font-noir-display font-bold ${isDark ? 'text-[#E8C46D]' : 'text-[#161412]'} ${isPhone ? 'text-lg' : 'text-2xl'}`}>
          {RAHA_BRAND.name}
        </div>
        {!isPhone && (
          <div className={`flex items-center gap-7 text-sm font-medium ${mutedCls}`}>
            <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
            <span>{lang === 'bn' ? '৮টি ক্যাটাগরি' : 'Categories'}</span>
            <span>{lang === 'bn' ? 'হট সেল' : 'Hot Sale'}</span>
            <span>{lang === 'bn' ? 'নিউ অ্যারাইভালস' : 'New Arrivals'}</span>
          </div>
        )}
        <div className={`flex items-center gap-1.5 rounded-md font-semibold ${ctaBtn} ${isPhone ? 'px-2.5 py-1.5 text-[10px]' : 'px-4 py-2 text-xs'}`}>
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{lang === 'bn' ? 'মেসেঞ্জার' : 'Messenger'}</span>
        </div>
      </div>

      {target.type === 'home' ? (
        <div>
          {/* Hero Carousel Preview + Welcome */}
          <div className={`border-b ${borderCls} ${bgAlt} ${isPhone ? 'p-3.5' : 'px-10 py-7'}`}>
            <div className="overflow-hidden rounded-2xl border border-[#D8AF56]/25 bg-[#120D0A]">
              <ResilientImage
                src={HERO_SLIDES[0].image}
                alt="RaHa Banner"
                fallbackTone="dark"
                className="block w-full h-auto object-cover"
              />
              <div className="flex items-center justify-between bg-[#140F0D] px-4 py-2 text-[10px] text-[#C8BCAE]">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-6 rounded-full bg-[#F4B400]" />
                  <span className="h-1.5 w-2 rounded-full bg-white/30" />
                  <span className="h-1.5 w-2 rounded-full bg-white/30" />
                  <span className="h-1.5 w-2 rounded-full bg-white/30" />
                </div>
                <span>1 / 4 · {lang === 'bn' ? 'কম্বো অফার স্লাইডার' : 'Offer Slider'}</span>
              </div>
            </div>

            <div className={`mt-3 rounded-xl border ${cardCls} ${isPhone ? 'p-3' : 'flex items-center justify-between p-5'}`}>
              <div>
                <div className={`text-[10px] font-semibold ${accentText}`}>
                  {lang === 'bn' ? RAHA_BRAND.welcomeBn : RAHA_BRAND.welcomeEn}
                </div>
                <div className={`font-noir-display mt-0.5 font-semibold ${isPhone ? 'text-base' : 'text-2xl'}`}>
                  {lang === 'bn' ? RAHA_BRAND.taglineBn : RAHA_BRAND.taglineEn}
                </div>
              </div>
              <div className={`${isPhone ? 'mt-2.5 grid grid-cols-2 gap-1.5' : 'flex items-center gap-2'}`}>
                <div className="flex h-8 items-center justify-center rounded-md bg-[#F4B400] px-2.5 text-[10px] font-semibold text-[#161412] whitespace-nowrap">
                  {lang === 'bn' ? 'সব ক্যাটাগরি দেখুন →' : 'All Categories →'}
                </div>
                <div className={`flex h-8 items-center justify-center rounded-md border ${borderCls} px-2.5 text-[10px] font-semibold tabular-nums whitespace-nowrap`}>
                  {RAHA_BRAND.phone}
                </div>
              </div>
            </div>
          </div>

          {/* 8 Categories */}
          <div className={isPhone ? 'px-3.5 py-6' : 'px-10 py-10'}>
            <div className={`text-[11px] font-semibold ${accentText}`}>
              {lang === 'bn' ? '৮টি মূল ক্যাটাগরি' : '8 Core Categories'}
            </div>
            <div className={`font-noir-display mt-0.5 font-semibold ${isPhone ? 'text-xl' : 'text-3xl'}`}>
              {lang === 'bn' ? 'ক্যাটাগরি অনুযায়ী গহনা দেখুন' : 'Shop by Jewellery Category'}
            </div>
            <div className={`mt-4 grid ${isPhone ? 'grid-cols-2 gap-2.5' : 'grid-cols-4 gap-4'}`}>
              {RAHA_CATEGORIES.map((cat) => (
                <div key={cat.id} className={`overflow-hidden rounded-xl border ${cardCls}`}>
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ResilientImage
                      src={cat.image}
                      alt={cat.nameEn}
                      fallbackTone="warm"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <div className="font-noir-display text-sm font-semibold">
                      {lang === 'bn' ? cat.nameBn : cat.nameEn}
                    </div>
                    <div className={`mt-1 text-right text-[10px] font-semibold ${accentText}`}>
                      {lang === 'bn' ? 'দেখুন →' : 'View →'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Sale */}
          <div className={`border-t ${borderCls} ${bgAlt} ${isPhone ? 'px-3.5 py-6' : 'px-10 py-10'}`}>
            <div>
              <div className={`text-[11px] font-semibold ${accentText}`}>
                {lang === 'bn' ? 'সর্বোচ্চ বিক্রিত' : 'Best Sellers'}
              </div>
              <div className={`font-noir-display font-semibold ${isPhone ? 'text-xl' : 'text-3xl'}`}>
                {lang === 'bn' ? 'হট সেল' : 'Hot Sale'}
              </div>
            </div>
            {renderCardGrid(isPhone ? hotProducts.slice(0, 4) : hotProducts)}
            <div className="mt-4 flex justify-center">
              <span className={`inline-flex rounded-md border ${borderCls} px-3.5 py-1.5 text-[11px] font-semibold`}>
                {lang === 'bn' ? 'আরও দেখুন →' : 'See All →'}
              </span>
            </div>
          </div>

          {/* New Arrivals */}
          <div className={`border-t ${borderCls} ${isPhone ? 'px-3.5 py-6' : 'px-10 py-10'}`}>
            <div>
              <div className={`text-[11px] font-semibold ${accentText}`}>
                {lang === 'bn' ? 'নতুন কালেকশন' : 'Fresh Releases'}
              </div>
              <div className={`font-noir-display font-semibold ${isPhone ? 'text-xl' : 'text-3xl'}`}>
                {lang === 'bn' ? 'নিউ অ্যারাইভালস' : 'New Arrivals'}
              </div>
            </div>
            {renderCardGrid(isPhone ? newProducts.slice(0, 4) : newProducts)}
            <div className="mt-4 flex justify-center">
              <span className={`inline-flex rounded-md border ${borderCls} px-3.5 py-1.5 text-[11px] font-semibold`}>
                {lang === 'bn' ? 'আরও দেখুন →' : 'See All →'}
              </span>
            </div>
          </div>

          {/* Signature Collection */}
          <div className={`border-t ${borderCls} ${bgAlt} ${isPhone ? 'px-3.5 py-6' : 'px-10 py-10'}`}>
            <div>
              <div className={`text-[11px] font-semibold ${accentText}`}>
                {lang === 'bn' ? 'রাজকীয় সংগ্রহ' : 'Flagship Luxury'}
              </div>
              <div className={`font-noir-display font-semibold ${isPhone ? 'text-xl' : 'text-3xl'}`}>
                {lang === 'bn' ? 'সিগনেচার কালেকশন' : 'Signature Collection'}
              </div>
            </div>
            {renderCardGrid(isPhone ? sigProducts.slice(0, 4) : sigProducts)}
            <div className="mt-4 flex justify-center">
              <span className={`inline-flex rounded-md border ${borderCls} px-3.5 py-1.5 text-[11px] font-semibold`}>
                {lang === 'bn' ? 'আরও দেখুন →' : 'See All →'}
              </span>
            </div>
          </div>

          {/* Bottom 4 Trust Points & Contact */}
          <div className={`border-t ${borderCls} ${isPhone ? 'px-3.5 py-6' : 'px-10 py-9'}`}>
            <div className={`grid ${isPhone ? 'grid-cols-2 gap-2.5' : 'grid-cols-4 gap-4'}`}>
              {[
                lang === 'bn' ? 'পূর্ণ ক্যাশ অন ডেলিভারি' : 'Full Cash on Delivery',
                lang === 'bn' ? 'পছন্দ না হলে রিটার্ন' : 'Instant Return Policy',
                lang === 'bn' ? '২৪K–১৮K ক্যারেট গ্যারান্টি' : '24K–18K Karat Tiers',
                lang === 'bn' ? 'সারা দেশে ডেলিভারি' : 'Nationwide Delivery',
              ].map((t) => (
                <div key={t} className={`rounded-lg border p-3 text-xs font-semibold ${cardCls}`}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={isPhone ? 'px-3.5 py-6' : 'px-10 py-9'}>
          <div className={`text-xs font-semibold ${accentText}`}>
            {lang === 'bn' ? '২৪K / ২২K / ২১K / ১৮K ক্যারেট প্রাইসিং' : '24K / 22K / 21K / 18K Karat Pricing'}
          </div>
          <div className={`font-noir-display mt-1 font-semibold ${isPhone ? 'text-2xl' : 'text-4xl'}`}>
            {listingTitle}
          </div>
          {renderCardGrid(listingProducts)}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[#D8AF56]/15 bg-[#161412] text-[#D4CCC0] dark:bg-[#090706]">
        <div className={isPhone ? 'px-3.5 py-5 text-xs space-y-1.5' : 'flex items-center justify-between px-10 py-7 text-xs'}>
          <div>
            <div className="font-noir-display text-lg font-bold text-[#F4B400] dark:text-[#E8C46D]">
              {RAHA_BRAND.name}
            </div>
            <div className="mt-0.5 text-[11px] opacity-85">
              {lang === 'bn' ? RAHA_BRAND.addressBn : RAHA_BRAND.addressEn} · {RAHA_BRAND.phone}
            </div>
          </div>
          <div className="text-[11px] opacity-65">© 2026 {RAHA_BRAND.name}</div>
        </div>
      </div>

      {isPhone && (
        <div className={`grid h-12 grid-cols-4 border-t ${borderCls} ${bgMain} text-[10px]`}>
          <div className={`flex flex-col items-center justify-center gap-0.5 font-semibold ${accentText}`}>
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
          </div>
          <div className={`flex flex-col items-center justify-center gap-0.5 ${mutedCls}`}>
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</span>
          </div>
          <div className={`flex flex-col items-center justify-center gap-0.5 ${mutedCls}`}>
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === 'bn' ? 'হট সেল' : 'Hot Sale'}</span>
          </div>
          <div className={`flex flex-col items-center justify-center gap-0.5 font-semibold ${accentText}`}>
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === 'bn' ? 'মেসেঞ্জার' : 'Messenger'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function RahaScreenshotStudio({
  lang,
  theme,
  onToggleLang,
  onToggleTheme,
  onBackToLiveSite,
}: RahaScreenshotStudioProps) {
  const [target, setTarget] = useState<ShotTarget>({ type: 'home' });
  const [karat, setKarat] = useState<KaratGrade>('22K');
  const [busy, setBusy] = useState<'pc' | 'phone' | 'both' | null>(null);
  const [saved, setSaved] = useState<{ pc?: boolean; phone?: boolean }>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    title: string;
    dataUrl: string;
    fileName: string;
  } | null>(null);

  const pcRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  const captureNode = async (mode: 'pc' | 'phone'): Promise<string> => {
    const node = mode === 'pc' ? pcRef.current : phoneRef.current;
    if (!node) throw new Error('Missing node');
    const bgColor = theme === 'dark' ? '#0C0908' : '#FFFFFF';
    const width = mode === 'pc' ? 1280 : 390;
    try {
      return await toPng(node, {
        width,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: bgColor,
        skipAutoScale: true,
      });
    } catch {
      return await toPng(node, {
        width,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: bgColor,
        skipAutoScale: true,
        skipFonts: true,
      });
    }
  };

  const triggerDownload = (dataUrl: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const fileNameFor = (mode: 'pc' | 'phone') => {
    const slug = target.type === 'home' ? 'home' : target.id;
    return `raha-${slug}-${theme}-${mode}-${karat.toLowerCase()}.png`;
  };

  const exportOne = async (mode: 'pc' | 'phone', openLightbox = false) => {
    setErrorMsg(null);
    setBusy(mode);
    try {
      const dataUrl = await captureNode(mode);
      const fileName = fileNameFor(mode);
      if (openLightbox) {
        setLightbox({
          title: `${mode.toUpperCase()} · ${theme === 'light' ? 'White Mode' : 'Black Mode'} Full-Page PNG`,
          dataUrl,
          fileName,
        });
      } else {
        triggerDownload(dataUrl, fileName);
        setSaved((p) => ({ ...p, [mode]: true }));
        window.setTimeout(() => setSaved((p) => ({ ...p, [mode]: false })), 2500);
      }
    } catch {
      setErrorMsg(
        lang === 'bn'
          ? 'PNG তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
          : 'Could not render PNG. Please try again.'
      );
    } finally {
      setBusy(null);
    }
  };

  const exportBoth = async () => {
    setErrorMsg(null);
    setBusy('both');
    try {
      const phoneUrl = await captureNode('phone');
      triggerDownload(phoneUrl, fileNameFor('phone'));
      await new Promise((r) => window.setTimeout(r, 350));
      const pcUrl = await captureNode('pc');
      triggerDownload(pcUrl, fileNameFor('pc'));
      setSaved({ pc: true, phone: true });
      window.setTimeout(() => setSaved({}), 2500);
    } catch {
      setErrorMsg(
        lang === 'bn'
          ? 'আলাদাভাবে Phone PNG বা PC PNG ডাউনলোড করুন।'
          : 'Download Phone PNG and PC PNG individually below.'
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#F5EDE0]">
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0C0908]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={onBackToLiveSite}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4B400] hover:underline whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{lang === 'bn' ? 'লাইভ ওয়েবসাইটে ফিরুন' : 'Back to Live Site'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs font-medium text-[#F5EDE0] hover:bg-white/10 whitespace-nowrap"
            >
              {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              <span>{theme === 'light' ? 'Black Mode' : 'White Mode'}</span>
            </button>
            <button
              type="button"
              onClick={onToggleLang}
              className="h-9 rounded-md border border-white/15 px-3 text-xs font-medium text-[#E8DCC8] hover:bg-white/10"
            >
              {lang === 'bn' ? 'EN' : 'বাংলা'}
            </button>
            <button
              type="button"
              disabled={busy !== null}
              onClick={exportBoth}
              className="flex h-9 items-center gap-1.5 rounded-md bg-[#F4B400] px-3.5 text-xs font-semibold text-[#161412] hover:bg-[#FFC41F] disabled:opacity-60 whitespace-nowrap"
            >
              {busy === 'both' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              <span>{lang === 'bn' ? 'Phone + PC ডাউনলোড' : 'Download Both'}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold text-[#F4B400]">
              {theme === 'light'
                ? lang === 'bn'
                  ? 'হোয়াইট মোড (White Mode) · ফুল-পেজ PNG'
                  : 'White Mode · Full-Page PNG Studio'
                : lang === 'bn'
                  ? 'ব্ল্যাক মোড (Black Mode) · ফুল-পেজ PNG'
                  : 'Black Mode · Full-Page PNG Studio'}
            </p>
            <h1 className="font-noir-display mt-1 text-2xl font-semibold sm:text-3xl">
              {lang === 'bn' ? 'Phone এবং PC ফুল-পেজ স্ক্রিনশট' : 'Phone & PC Full-Page Screenshots'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTarget({ type: 'home' })}
              className={`h-8 rounded px-3 text-xs font-semibold ${
                target.type === 'home' ? 'bg-[#F4B400] text-[#161412]' : 'bg-white/8 text-[#C8BCAE]'
              }`}
            >
              {lang === 'bn' ? 'হোম পেজ' : 'Home'}
            </button>
            {(['hot-sale', 'new-arrivals', 'signature'] as CollectionId[]).map((cid) => (
              <button
                key={cid}
                type="button"
                onClick={() => setTarget({ type: 'collection', id: cid })}
                className={`h-8 rounded px-3 text-xs font-medium ${
                  target.type === 'collection' && target.id === cid
                    ? 'bg-[#F4B400] text-[#161412] font-semibold'
                    : 'bg-white/8 text-[#C8BCAE]'
                }`}
              >
                {lang === 'bn' ? RAHA_COLLECTIONS[cid].nameBn : RAHA_COLLECTIONS[cid].nameEn}
              </button>
            ))}
            {RAHA_CATEGORIES.slice(0, 4).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setTarget({ type: 'category', id: c.id })}
                className={`h-8 rounded px-2.5 text-xs font-medium ${
                  target.type === 'category' && target.id === c.id
                    ? 'bg-[#F4B400] text-[#161412] font-semibold'
                    : 'bg-white/8 text-[#C8BCAE]'
                }`}
              >
                {lang === 'bn' ? c.nameBn : c.nameEn}
              </button>
            ))}
            <div className="ml-1 inline-flex rounded bg-white/8 p-0.5">
              {KARAT_LIST.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setKarat(g)}
                  className={`h-7 rounded px-2 text-[11px] font-semibold tabular-nums ${
                    karat === g ? 'bg-[#F4B400] text-[#161412]' : 'text-[#C8BCAE]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-950/30 px-4 py-3 text-xs text-rose-200">
            {errorMsg}
          </div>
        )}

        <div className="mt-7 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Phone Column */}
          <section className="flex flex-col items-center lg:col-span-5">
            <div className="mb-3 flex w-full max-w-[390px] items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Smartphone className="h-4 w-4 text-[#F4B400]" />
                <span>Phone (390px)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => exportOne('phone', false)}
                  className="flex h-9 items-center gap-1.5 rounded-md bg-[#F4B400] px-3 text-xs font-semibold text-[#161412] hover:bg-[#FFC41F]"
                >
                  {saved.phone ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                  <span>{saved.phone ? 'Saved' : 'PNG'}</span>
                </button>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => exportOne('phone', true)}
                  className="flex h-9 items-center gap-1 rounded-md border border-white/15 px-3 text-xs hover:bg-white/10"
                >
                  <Expand className="h-3.5 w-3.5" />
                  <span>{lang === 'bn' ? 'দেখুন' : 'View'}</span>
                </button>
              </div>
            </div>
            <div className="w-full max-w-[402px] overflow-x-auto rounded-[28px] border-[6px] border-[#2C2622] bg-black shadow-2xl">
              <div ref={phoneRef} className="w-[390px]">
                <RahaShotCanvas mode="phone" target={target} karat={karat} lang={lang} theme={theme} />
              </div>
            </div>
          </section>

          {/* PC Column */}
          <section className="flex flex-col lg:col-span-7">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Monitor className="h-4 w-4 text-[#F4B400]" />
                <span>PC (1280px)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => exportOne('pc', false)}
                  className="flex h-9 items-center gap-1.5 rounded-md bg-[#F4B400] px-3.5 text-xs font-semibold text-[#161412] hover:bg-[#FFC41F]"
                >
                  {saved.pc ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                  <span>{saved.pc ? 'Saved' : 'Download PC PNG'}</span>
                </button>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => exportOne('pc', true)}
                  className="flex h-9 items-center gap-1 rounded-md border border-white/15 px-3 text-xs hover:bg-white/10"
                >
                  <Expand className="h-3.5 w-3.5" />
                  <span>{lang === 'bn' ? 'দেখুন' : 'View'}</span>
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
              <div className="overflow-x-auto">
                <div className="w-[1280px] origin-top-left lg:scale-[0.58] xl:scale-[0.62] lg:mb-[-900px]">
                  <RahaShotCanvas mode="pc" target={target} karat={karat} lang={lang} theme={theme} />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Unscaled off-screen PC capture node */}
        <div aria-hidden="true" className="pointer-events-none fixed left-[-9999px] top-0">
          <div ref={pcRef} className="w-[1280px]">
            <RahaShotCanvas mode="pc" target={target} karat={karat} lang={lang} theme={theme} />
          </div>
        </div>
      </main>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#120D0B] px-5 py-3.5">
            <div className="text-sm font-semibold text-white">{lightbox.title}</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => triggerDownload(lightbox.dataUrl, lightbox.fileName)}
                className="flex h-9 items-center gap-1.5 rounded-md bg-[#F4B400] px-4 text-xs font-semibold text-[#161412]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{lang === 'bn' ? 'PNG সেভ' : 'Save PNG'}</span>
              </button>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white"
                aria-label="Close lightbox"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <img
              src={lightbox.dataUrl}
              alt={lightbox.title}
              className="mx-auto max-w-full rounded-xl border border-white/15 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
