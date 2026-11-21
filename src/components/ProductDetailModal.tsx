import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, Phone, X } from 'lucide-react';
import {
  buildMessengerOrderUrl,
  computeKaratPricing,
  copyTextToClipboard,
  formatBDT,
  getFullProductCode,
  JewelleryProduct,
  KARAT_LIST,
  KARAT_TIERS,
  KaratGrade,
  LangMode,
  RAHA_BRAND,
} from '../data/rahaCatalog';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: JewelleryProduct | null;
  initialKarat: KaratGrade;
  lang: LangMode;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  initialKarat,
  lang,
  onClose,
}: ProductDetailModalProps) {
  const [karat, setKarat] = useState<KaratGrade>(initialKarat);
  const [size, setSize] = useState<string>('');
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (product) {
      setKarat(initialKarat);
      setSize(product.sizes[0] ?? 'Standard');
      setCopiedId(false);
    }
  }, [product, initialKarat]);

  if (!product) return null;

  const pricing = computeKaratPricing(product, karat);
  const tierSpec = KARAT_TIERS[karat];
  const fullCode = getFullProductCode(product, karat);
  const messengerUrl = buildMessengerOrderUrl(product, karat, size || product.sizes[0], lang);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <div className="relative grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-t-2xl border border-[#E7E2D8] bg-white text-[#161412] shadow-2xl dark:border-[#D8AF56]/25 dark:bg-[#15100D] dark:text-[#F5EDE0] sm:grid-cols-12 sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          aria-label="Close product details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: Studio Image */}
        <div className="aspect-[4/3] bg-[#F5F2EC] dark:bg-[#1F1814] sm:col-span-6 sm:aspect-auto sm:min-h-[480px]">
          <ResilientImage
            src={product.image}
            alt={lang === 'bn' ? product.nameBn : product.nameEn}
            fallbackTone="warm"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: Info & Direct Messenger Order Module with Live Karat UID */}
        <div className="flex flex-col p-5 sm:col-span-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6258] dark:text-[#A89B8C] tabular-nums">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#161412] dark:text-[#E8C46D]">
                ID: {fullCode}
              </span>
              <button
                type="button"
                onClick={async () => {
                  const ok = await copyTextToClipboard(fullCode);
                  if (ok) {
                    setCopiedId(true);
                    window.setTimeout(() => setCopiedId(false), 1800);
                  }
                }}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                  copiedId
                    ? 'bg-emerald-700 text-white'
                    : 'border border-[#DDD6C9] bg-[#FAF8F4] text-[#161412] hover:border-[#F4B400] dark:border-[#D8AF56]/30 dark:bg-[#0E0B09] dark:text-[#E8C46D]'
                }`}
              >
                {copiedId ? (
                  <>
                    <Check className="h-3 w-3" aria-hidden="true" />
                    <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" aria-hidden="true" />
                    <span>{lang === 'bn' ? 'আইডি কপি' : 'Copy ID'}</span>
                  </>
                )}
              </button>
            </div>
            <span>
              {product.weightGrams}g ({product.weightTraditionalBn}) ·{' '}
              {lang === 'bn' ? product.statusBn : product.statusEn}
            </span>
          </div>

          <h2
            id="product-detail-title"
            className="font-noir-display mt-1.5 text-2xl font-semibold leading-tight text-[#161412] dark:text-[#F5EDE0]"
          >
            {lang === 'bn' ? product.nameBn : product.nameEn}
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-[#5F574E] dark:text-[#C2B6A8]">
            {lang === 'bn' ? product.descriptionBn : product.descriptionEn}
          </p>

          {/* 4-Grade Karat Selector (Live-updates both Price & Product ID) */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#161412] dark:text-[#F5EDE0]">
                {lang === 'bn' ? 'ক্যারেট বেছে নিন (24K – 18K)' : 'Choose Karat Purity (24K – 18K)'}
              </span>
              <span className="font-medium text-[#9A6B00] dark:text-[#D8AF56]">
                {tierSpec.purityCode}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {KARAT_LIST.map((grade) => {
                const p = computeKaratPricing(product, grade);
                const active = karat === grade;
                return (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setKarat(grade)}
                    className={`rounded-lg border p-2 text-left transition-colors ${
                      active
                        ? 'border-[#F4B400] bg-[#F4B400]/18 text-[#161412] dark:border-[#D8AF56] dark:bg-[#D8AF56]/15 dark:text-[#F5EDE0]'
                        : 'border-[#E5DEC9] bg-[#FAF8F4] text-[#5F574E] hover:border-[#F4B400] dark:border-white/12 dark:bg-[#0E0B09] dark:text-[#A89B8C] dark:hover:border-white/25'
                    }`}
                  >
                    <div className="text-xs font-bold tabular-nums">{grade}</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-[#9A6B00] dark:text-[#E8C46D] tabular-nums">
                      {formatBDT(p.finalPrice)}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-[#6B6258] dark:text-[#A89B8C]">
              {lang === 'bn' ? tierSpec.rateNoteBn : tierSpec.rateNoteEn}
            </p>
          </div>

          {/* Transparent Pricing Breakdown */}
          <div className="mt-4 rounded-lg border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 text-xs tabular-nums space-y-1.5 dark:border-[#D8AF56]/15 dark:bg-[#0E0B09]">
            <div className="flex justify-between text-[#5F574E] dark:text-[#A89B8C]">
              <span>{lang === 'bn' ? 'ডিজাইন ও কারুকাজ (বেস)' : 'Artisan Craft Base'}</span>
              <span>{formatBDT(pricing.craftBase)}</span>
            </div>
            <div className="flex justify-between text-[#5F574E] dark:text-[#A89B8C]">
              <span>
                {lang === 'bn'
                  ? `${karat} গোল্ড গ্রেড ও ফিনিশ`
                  : `${karat} Gold Grade & Finish`}
              </span>
              <span>{formatBDT(pricing.goldFinishValue)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-[#E5DEC9] pt-2 dark:border-white/10">
              <span className="font-semibold text-[#161412] dark:text-[#F5EDE0]">
                {lang === 'bn' ? 'মোট মূল্য' : 'Total Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-[#9A6B00] dark:text-[#E8C46D]">
                  {formatBDT(pricing.finalPrice)}
                </span>
                <span className="text-[11px] text-[#8E857B] line-through">
                  {formatBDT(pricing.comparePrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-4">
            <span className="block text-xs font-semibold text-[#161412] dark:text-[#F5EDE0]">
              {lang === 'bn' ? product.sizeLabelBn : product.sizeLabelEn}
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-9 rounded-md border px-3 text-xs font-medium transition-colors ${
                    size === s
                      ? 'border-[#161412] bg-[#161412] text-white dark:border-[#D8AF56] dark:bg-[#D8AF56] dark:text-[#120D0A]'
                      : 'border-[#DFD8CC] bg-white text-[#5A534A] hover:border-[#161412]/40 dark:border-white/15 dark:bg-[#0E0B09] dark:text-[#C8BCAE] dark:hover:border-white/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Facebook Messenger Order CTA */}
          <div className="mt-5 space-y-2">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                void copyTextToClipboard(fullCode);
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#F4B400] px-4 text-xs sm:text-sm font-semibold text-[#161412] transition-colors hover:bg-[#E2A500] dark:bg-[#D8AF56] dark:hover:bg-[#E7C26E] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {lang === 'bn'
                  ? `মেসেঞ্জারে অর্ডার করুন (${formatBDT(pricing.finalPrice)})`
                  : `Order on Messenger (${formatBDT(pricing.finalPrice)})`}
              </span>
            </a>
            <p className="text-center text-[11px] text-[#6B6258] dark:text-[#A89B8C] tabular-nums">
              {lang === 'bn'
                ? `ক্লিক করলে মেসেঞ্জার ওপেন হবে এবং আইডি (${fullCode}) অটো কপি হয়ে যাবে`
                : `Opens Messenger directly and auto-copies ID (${fullCode})`}
            </p>
          </div>

          {/* Direct Call & Craft Spec */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#E7E2D8] pt-3.5 text-[11px] text-[#6B6258] dark:border-white/10 dark:text-[#A89B8C]">
            <span>{lang === 'bn' ? product.finishNoteBn : product.finishNoteEn}</span>
            <a
              href={`tel:${RAHA_BRAND.phone}`}
              className="inline-flex items-center gap-1 font-semibold text-[#9A6B00] dark:text-[#D8AF56] hover:underline whitespace-nowrap tabular-nums"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              <span>{RAHA_BRAND.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
