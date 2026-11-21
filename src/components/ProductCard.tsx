import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import {
  buildMessengerOrderUrl,
  computeKaratPricing,
  copyTextToClipboard,
  formatBDT,
  getFullProductCode,
  JewelleryProduct,
  KARAT_LIST,
  KaratGrade,
  LangMode,
} from '../data/rahaCatalog';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: JewelleryProduct;
  lang: LangMode;
  forcedKarat?: KaratGrade | null;
  compact?: boolean;
  onOpenDetail: (product: JewelleryProduct, initialKarat: KaratGrade) => void;
}

export function ProductCard({
  product,
  lang,
  forcedKarat = null,
  compact = false,
  onOpenDetail,
}: ProductCardProps) {
  const [selectedKarat, setSelectedKarat] = useState<KaratGrade>(
    forcedKarat ?? product.defaultKarat
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (forcedKarat) {
      setSelectedKarat(forcedKarat);
    }
  }, [forcedKarat]);

  const pricing = computeKaratPricing(product, selectedKarat);
  const fullCode = getFullProductCode(product, selectedKarat);
  const messengerUrl = buildMessengerOrderUrl(product, selectedKarat, product.sizes[0], lang);

  const handleCopyId = async () => {
    const ok = await copyTextToClipboard(fullCode);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E7E2D8] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E5A500] hover:shadow-[0_10px_28px_rgba(22,20,18,0.08)] dark:border-[#D8AF56]/15 dark:bg-[#16110E] dark:hover:border-[#D8AF56]/45 dark:hover:shadow-none">
      {/* Uniform 4:3 Studio Photo */}
      <button
        type="button"
        onClick={() => onOpenDetail(product, selectedKarat)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#F5F2EC] dark:bg-[#1F1814] text-left"
      >
        <ResilientImage
          src={product.image}
          alt={lang === 'bn' ? product.nameBn : product.nameEn}
          fallbackTone="warm"
          label={lang === 'bn' ? product.nameBn : product.nameEn}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* Dynamic Karat-Encoded Product UID Strip Directly Under Photo (e.g. S-1001-22K) */}
      <div className="flex items-center justify-between gap-1 border-b border-[#EFECE5] bg-[#FAF8F4] px-2.5 py-1.5 dark:border-white/8 dark:bg-[#120D0B]">
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-[#5C544B] dark:text-[#C8BCAE] tabular-nums truncate">
          ID: <strong className="text-[#161412] dark:text-[#E8C46D]">{fullCode}</strong>
        </span>
        <button
          type="button"
          onClick={handleCopyId}
          aria-label={lang === 'bn' ? `${fullCode} কপি করুন` : `Copy ${fullCode}`}
          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
            copied
              ? 'bg-emerald-700 text-white'
              : 'border border-[#DDD6C9] bg-white text-[#161412] hover:border-[#F4B400] hover:bg-[#FFFBF0] dark:border-[#D8AF56]/30 dark:bg-[#1A1411] dark:text-[#E8C46D] dark:hover:bg-[#D8AF56]/15'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-2.5 w-2.5" aria-hidden="true" />
              <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
            </>
          ) : (
            <>
              <Copy className="h-2.5 w-2.5" aria-hidden="true" />
              <span>{lang === 'bn' ? 'কপি' : 'Copy'}</span>
            </>
          )}
        </button>
      </div>

      {/* Clean Card Content — Zero Pill Badges, Unboxed Metadata */}
      <div className={`flex flex-1 flex-col ${compact ? 'p-3' : 'p-3.5 sm:p-4'}`}>
        <div className="flex items-center gap-1.5 text-[11px] text-[#6B6258] dark:text-[#A89B8C] truncate tabular-nums">
          <span className="font-semibold text-[#9A6B00] dark:text-[#D8AF56]">{selectedKarat}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{product.weightTraditionalBn}</span>
          {!compact && (
            <>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <span className="hidden sm:inline truncate">
                {lang === 'bn' ? product.statusBn : product.statusEn}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpenDetail(product, selectedKarat)}
          className={`mt-1 text-left font-semibold leading-snug text-[#161412] hover:text-[#9A6B00] dark:text-[#F5EDE0] dark:hover:text-[#E8C46D] transition-colors line-clamp-2 ${
            compact ? 'text-[13px]' : 'text-[13px] sm:text-[15px]'
          }`}
        >
          {lang === 'bn' ? product.nameBn : product.nameEn}
        </button>

        {/* Interactive 4-Grade Karat Selector (Updates Price & Product UID Live) */}
        <div
          className="mt-2.5 grid grid-cols-4 gap-0.5 rounded-md border border-[#E7E2D8] bg-[#F7F5F0] p-0.5 dark:border-white/8 dark:bg-[#0E0B09]"
          role="group"
          aria-label={lang === 'bn' ? 'ক্যারেট বেছে নিন' : 'Select karat purity'}
        >
          {KARAT_LIST.map((karat) => {
            const active = selectedKarat === karat;
            return (
              <button
                key={karat}
                type="button"
                onClick={() => setSelectedKarat(karat)}
                className={`h-7 rounded text-[10px] font-semibold transition-colors tabular-nums whitespace-nowrap ${
                  active
                    ? 'bg-[#F4B400] text-[#161412] dark:bg-[#D8AF56] dark:text-[#120D0A]'
                    : 'text-[#5C544B] hover:text-[#161412] dark:text-[#A89B8C] dark:hover:text-[#F5EDE0]'
                }`}
              >
                {karat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tabular Price */}
        <div className="mt-2.5 flex items-baseline gap-1.5 tabular-nums">
          <span className="text-sm font-bold text-[#161412] dark:text-[#E8C46D] sm:text-base">
            {formatBDT(pricing.finalPrice)}
          </span>
          <span className="text-[11px] text-[#8E857B] dark:text-[#8D8071] line-through">
            {formatBDT(pricing.comparePrice)}
          </span>
          {!compact && (
            <span className="ml-auto hidden sm:inline text-[11px] font-semibold text-[#9A6B00] dark:text-[#CBB898]">
              -{pricing.savingsPercent}%
            </span>
          )}
        </div>

        {/* Direct Messenger Order CTA + Details */}
        <div className="mt-auto flex items-center gap-1.5 pt-3">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void copyTextToClipboard(fullCode);
            }}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md bg-[#161412] px-2 text-[11px] sm:text-xs font-semibold text-white transition-colors hover:bg-[#2C2723] dark:bg-[#D8AF56] dark:text-[#120D0A] dark:hover:bg-[#E7C26E] whitespace-nowrap"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Order Now'}</span>
          </a>

          {!compact && (
            <button
              type="button"
              onClick={() => onOpenDetail(product, selectedKarat)}
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-md border border-[#DDD6C9] bg-[#FAF8F4] px-3 text-xs font-medium text-[#161412] transition-colors hover:border-[#161412]/40 dark:border-[#D8AF56]/25 dark:bg-transparent dark:text-[#E8DCC8] dark:hover:bg-[#D8AF56]/10 whitespace-nowrap shrink-0"
            >
              {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
