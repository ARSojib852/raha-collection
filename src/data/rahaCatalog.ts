export type CategoryId =
  | 'bangles'
  | 'earrings'
  | 'bracelets'
  | 'necklaces'
  | 'rings'
  | 'combos'
  | 'anklets'
  | 'clutches';

export type CollectionId = 'hot-sale' | 'new-arrivals' | 'signature';
export type KaratGrade = '24K' | '22K' | '21K' | '18K';
export type LangMode = 'bn' | 'en';
export type ThemeMode = 'light' | 'dark';

export interface KaratTierSpec {
  grade: KaratGrade;
  labelBn: string;
  labelEn: string;
  purityCode: string;
  multiplier: number;
  rateNoteBn: string;
  rateNoteEn: string;
}

export interface HeroBannerSlide {
  id: string;
  image: string;
  isOfficialBanner?: boolean;
  kickerBn: string;
  kickerEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  ctaBn: string;
  ctaEn: string;
  targetType: 'category' | 'collection';
  targetId: CategoryId | CollectionId;
}

export interface CategoryMeta {
  id: CategoryId;
  codePrefix: string;
  nameBn: string;
  nameEn: string;
  subtitleBn: string;
  subtitleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  image: string;
  startingPrice: number;
}

export interface CollectionMeta {
  id: CollectionId;
  nameBn: string;
  nameEn: string;
  kickerBn: string;
  kickerEn: string;
  descriptionBn: string;
  descriptionEn: string;
}

export interface JewelleryProduct {
  id: string;
  sku: string;
  categoryId: CategoryId;
  nameBn: string;
  nameEn: string;
  image: string;
  defaultKarat: KaratGrade;
  availableKarats: KaratGrade[];
  /** Base price at 18K tier; 21K, 22K, and 24K scale transparently via KARAT_TIERS */
  basePrice18K: number;
  weightGrams: number;
  weightTraditionalBn: string;
  sizes: string[];
  sizeLabelBn: string;
  sizeLabelEn: string;
  finishNoteBn: string;
  finishNoteEn: string;
  descriptionBn: string;
  descriptionEn: string;
  statusBn: string;
  statusEn: string;
  isHotSale?: boolean;
  isNewArrival?: boolean;
  isSignature?: boolean;
}

export interface RahaOrder {
  orderId: string;
  customerName: string;
  phone: string;
  zone: string;
  address: string;
  total: number;
  itemCount: number;
  statusBn: string;
  statusEn: string;
  placedAt: string;
}

export interface RahaReview {
  id: string;
  author: string;
  location: string;
  item: string;
  quoteBn: string;
  quoteEn: string;
}

export const RAHA_BRAND = {
  name: 'RaHa Collection',
  phone: '01406-552933',
  /** Replace with your exact Facebook Page username (the part after facebook.com/ or m.me/) */
  messengerUsername: 'RaHaCollectionBD',
  messengerUrl: 'https://m.me/RaHaCollectionBD',
  welcomeBn: 'RaHa Collection-এ আপনাকে স্বাগতম',
  welcomeEn: 'Welcome to RaHa Collection',
  taglineBn: 'আপনার বিশ্বাসই আমাদের সবচেয়ে বড় অর্জন',
  taglineEn: 'Your trust is our greatest achievement',
  promiseBn: 'পণ্য হাতে পেয়ে পেমেন্ট · পছন্দ না হলে রিটার্ন',
  promiseEn: 'Pay on delivery · Return if you do not love it',
  addressBn: 'হাউজ ১৮, রোড ০৭, ধানমন্ডি, ঢাকা-১২০৯ · প্রতিদিন সকাল ১০টা – রাত ১০টা',
  addressEn: 'House 18, Road 07, Dhanmondi, Dhaka-1209 · Open Daily 10 AM – 10 PM',
  bannerImage: '/assets/raha-banner.png',
};

export const HERO_SLIDES: HeroBannerSlide[] = [
  {
    id: 'slide-official',
    image: '/assets/raha-banner.png',
    isOfficialBanner: true,
    kickerBn: 'অফিশিয়াল কালেকশন · ২০২৬',
    kickerEn: 'Official Showcase · 2026',
    titleBn: 'রয়্যাল গোল্ড ও ব্রাইডাল জুয়েলারি হাউস',
    titleEn: 'Royal Gold & Bridal Jewellery House',
    subtitleBn: 'চুড়ি, কানের দুল, ব্রেসলেট, নেকলেস, আংটি ও ব্রাইডাল কম্বো — পূর্ণ ক্যাশ অন ডেলিভারি।',
    subtitleEn: 'Bangles, Earrings, Bracelets, Necklaces, Rings & Bridal Combos — Full Cash on Delivery.',
    ctaBn: 'হট সেল দেখুন',
    ctaEn: 'Shop Hot Sale',
    targetType: 'collection',
    targetId: 'hot-sale',
  },
  {
    id: 'slide-bridal-combo',
    image: '/src/assets/images/banner_bridal_combo_offer_1795200323944.jpg',
    kickerBn: 'ব্রাইডাল কম্বো বান্ডেল অফার · সেভ ৳১,২০০',
    kickerEn: 'Bridal Combo Bundle Offer · Save ৳1,200',
    titleBn: 'নেকলেস + ৬টি বালা + ঝুমকা একসাথে ভেলভেট বক্সে',
    titleEn: 'Necklace + 6 Bangles + Jhumkas Velvet Box Combo',
    subtitleBn: 'সম্পূর্ণ বিয়ের সাজ এক বান্ডেলে — ২৪K ও ২২K ফিনিশ, সাথে সারা দেশে ফ্রি ডেলিভারি।',
    subtitleEn: 'Complete wedding ensemble in one curated bundle with 24K & 22K finish and free nationwide delivery.',
    ctaBn: 'ব্রাইডাল কম্বো দেখুন',
    ctaEn: 'Explore Bridal Combos',
    targetType: 'category',
    targetId: 'combos',
  },
  {
    id: 'slide-festive-bundle',
    image: '/src/assets/images/banner_festive_bangles_combo_1795200327146.jpg',
    kickerBn: 'ফেস্টিভ বান্ডেল সেল · ২০% পর্যন্ত ছাড়',
    kickerEn: 'Festive Bundle Sale · Up to 20% Off',
    titleBn: 'এনামেল চুড়ি, আংটি ও জারদৌসি ক্লাচ কম্বো',
    titleEn: 'Enamel Bangles, Statement Rings & Zardozi Clutch Bundle',
    subtitleBn: 'ঈদ, হলুদ ও দাওয়াতের জন্য ম্যাচিং গহনা ও ক্লাচ একসাথে — হাতে পেয়ে চেক করে পেমেন্ট।',
    subtitleEn: 'Matched festive bangles, filigree rings, and silk clutch bundles with pay-on-delivery assurance.',
    ctaBn: 'নিউ অ্যারাইভালস দেখুন',
    ctaEn: 'View New Arrivals',
    targetType: 'collection',
    targetId: 'new-arrivals',
  },
  {
    id: 'slide-signature-24k',
    image: '/src/assets/images/hero_noir_velvet_jewelry_1795106716075.jpg',
    kickerBn: '২৪ ক্যারেট সিগনেচার এডিট',
    kickerEn: '24 Karat Signature Edit',
    titleBn: 'মহারানী ব্রাইডাল চোকার ও নকশি বালা সেট',
    titleEn: 'Maharani Bridal Choker & Carved Bala Collection',
    subtitleBn: 'আপনার পছন্দের ক্যারেট (২৪K / ২২K / ২১K / ১৮K) বেছে নিয়ে সাথে সাথে দাম দেখুন।',
    subtitleEn: 'Select your preferred 24K, 22K, 21K, or 18K grade and view transparent live pricing.',
    ctaBn: 'সিগনেচার কালেকশন',
    ctaEn: 'Signature Collection',
    targetType: 'collection',
    targetId: 'signature',
  },
];

export const KARAT_TIERS: Record<KaratGrade, KaratTierSpec> = {
  '24K': {
    grade: '24K',
    labelBn: '২৪ ক্যারেট (24K)',
    labelEn: '24 Karat (24K)',
    purityCode: '999 Pure Tone',
    multiplier: 1.5,
    rateNoteBn: 'সর্বোচ্চ খাঁটি ২৪K গোল্ড লুক — এক্সক্লুসিভ ব্রাইডাল গ্রেড',
    rateNoteEn: 'Deepest 999 gold radiance crafted for flagship bridal wear',
  },
  '22K': {
    grade: '22K',
    labelBn: '২২ ক্যারেট (22K)',
    labelEn: '22 Karat (22K)',
    purityCode: '916 Royal Gold',
    multiplier: 1.32,
    rateNoteBn: 'জনপ্রিয় ৯১৬ ঐতিহ্যবাহী সোনালি আভা — বিয়ে ও উৎসবের সেরা পছন্দ',
    rateNoteEn: 'Most popular 916 heirloom richness for weddings & celebrations',
  },
  '21K': {
    grade: '21K',
    labelBn: '২১ ক্যারেট (21K)',
    labelEn: '21 Karat (21K)',
    purityCode: '875 Classic Gold',
    multiplier: 1.16,
    rateNoteBn: 'ঐতিহ্যবাহী উজ্জ্বলতা ও দীর্ঘস্থায়ী টেকসই ফিনিশের ব্যালেন্স',
    rateNoteEn: 'Balanced 875 brilliance with everyday festive durability',
  },
  '18K': {
    grade: '18K',
    labelBn: '১৮ ক্যারেট (18K)',
    labelEn: '18 Karat (18K)',
    purityCode: '750 Modern Tone',
    multiplier: 1.0,
    rateNoteBn: 'আধুনিক, হালকা ও প্রতিদিনের ব্যবহারের জন্য বাজেট-ফ্রেন্ডলি গ্রেড',
    rateNoteEn: 'Sleek contemporary 750 finish designed for daily elegance',
  },
};

export const KARAT_LIST: KaratGrade[] = ['24K', '22K', '21K', '18K'];

export function computeKaratPricing(product: JewelleryProduct, karat: KaratGrade) {
  const tier = KARAT_TIERS[karat];
  const craftBase = Math.round(product.basePrice18K * 0.4);
  const goldFinishValue = Math.round((product.basePrice18K - craftBase) * tier.multiplier);
  const finalPrice = Math.round((craftBase + goldFinishValue) / 10) * 10;
  const comparePrice = Math.round((finalPrice * 1.16) / 10) * 10;
  return {
    craftBase,
    goldFinishValue,
    finalPrice,
    comparePrice,
    savingsPercent: Math.round(((comparePrice - finalPrice) / comparePrice) * 100),
  };
}

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-IN')}`;
}

/** Dynamic bot-ready Product UID including selected Karat tier, e.g. S-1001-22K */
export function getFullProductCode(product: JewelleryProduct, karat: KaratGrade): string {
  return `${product.sku}-${karat}`;
}

/**
 * Builds a Facebook Messenger deep link carrying both:
 * 1) `ref` parameter (auto-captured by ManyChat Ref URL / Meta Messenger Webhook referral events)
 * 2) `text` parameter (pre-fills the exact UID & details in the chat box for instant bot matching)
 */
export function buildMessengerOrderUrl(
  product: JewelleryProduct,
  karat: KaratGrade,
  size?: string,
  lang: LangMode = 'bn'
): string {
  const fullCode = getFullProductCode(product, karat);
  const pricing = computeKaratPricing(product, karat);
  const sizePart = size ? ` | ${lang === 'bn' ? 'সাইজ' : 'Size'}: ${size}` : '';
  const text =
    lang === 'bn'
      ? `আসসালামু আলাইকুম, আমি এই প্রোডাক্টটি অর্ডার করতে চাই:\nID: ${fullCode}\nনাম: ${product.nameBn} (${karat})${sizePart}\nদাম: ${formatBDT(pricing.finalPrice)}`
      : `Hello, I want to order this product:\nID: ${fullCode}\nItem: ${product.nameEn} (${karat})${sizePart}\nPrice: ${formatBDT(pricing.finalPrice)}`;

  return `https://m.me/${RAHA_BRAND.messengerUsername}?ref=${encodeURIComponent(fullCode)}&text=${encodeURIComponent(text)}`;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below for iframe clipboard restrictions
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export const RAHA_COLLECTIONS: Record<CollectionId, CollectionMeta> = {
  'hot-sale': {
    id: 'hot-sale',
    nameBn: 'হট সেল কালেকশন',
    nameEn: 'Hot Sale Collection',
    kickerBn: 'সর্বোচ্চ বিক্রিত ও ক্রেতাদের প্রথম পছন্দ',
    kickerEn: 'Most Ordered & Top-Rated Pieces',
    descriptionBn:
      'যে গহনাগুলো আমাদের ক্রেতারা সবচেয়ে বেশি অর্ডার করছেন—যেকোনো ক্যাটাগরি, ক্যারেট (২৪K–১৮K) ও দাম অনুযায়ী বেছে নিন।',
    descriptionEn:
      'Our fastest-moving jewellery across all 8 departments. Filter by category, karat tier, and price range.',
  },
  'new-arrivals': {
    id: 'new-arrivals',
    nameBn: 'নিউ অ্যারাইভালস',
    nameEn: 'New Arrivals',
    kickerBn: 'এই সপ্তাহের নতুন সব ডিজাইন একসাথে',
    kickerEn: 'Latest Season Releases Across Every Category',
    descriptionBn:
      'চুড়ি, নেকলেস, আংটি, কানের দুল, ব্রেসলেট ও ব্রাইডাল কম্বোতে কী কী নতুন এসেছে—নিচ থেকে ক্যাটাগরি সিলেক্ট করে দেখুন।',
    descriptionEn:
      'Every freshly landed design in one unified view. Switch categories below to explore what is new in necklaces, rings, bangles, and combos.',
  },
  signature: {
    id: 'signature',
    nameBn: 'সিগনেচার কালেকশন',
    nameEn: 'Signature Collection',
    kickerBn: 'RaHa-এর রাজকীয় ও লিমিটেড এডিশন',
    kickerEn: 'RaHa Flagship & Heirloom Limited Editions',
    descriptionBn:
      'বিশেষ বিয়ের অনুষ্ঠান ও আভিজাত্যপূর্ণ সাজের জন্য আমাদের সেরা কারুকার্যময় সিগনেচার গহনার সংকলন।',
    descriptionEn:
      'Museum-inspired bridal sets, heavy filigree kadas, and heirloom zardozi accessories finished to our highest standard.',
  },
};

export const RAHA_CATEGORIES: CategoryMeta[] = [
  {
    id: 'bangles',
    codePrefix: 'S',
    nameBn: 'চুড়ি',
    nameEn: 'Bangles',
    subtitleBn: 'নকশি বালা, এনামেল ও পার্ল চুড়ি',
    subtitleEn: 'Carved balas, enamel & pearl sets',
    descriptionBn:
      'ঐতিহ্যবাহী নকশি বালা, গ্লসি এনামেল ট্রায়ো ও মুক্তা খচিত ব্রাইডাল চুড়ি—২৪K, ২২K, ২১K ও ১৮K ক্যারেট প্রাইসিংয়ে।',
    descriptionEn:
      'Hand-carved balas, glazed enamel trios, and pearl bridal sets available across 24K, 22K, 21K, and 18K tiers.',
    image: '/src/assets/images/product_cocoa_enamel_bangles_1795106714198.jpg',
    startingPrice: 1250,
  },
  {
    id: 'earrings',
    codePrefix: 'E',
    nameBn: 'কানের দুল',
    nameEn: 'Earrings',
    subtitleBn: 'ফিলিগ্রি ঝুমকা, কানপাশা ও পার্ল ড্রপ',
    subtitleEn: 'Filigree jhumkas, chandbalis & drops',
    descriptionBn:
      'হালকা ওজনের সূক্ষ্ম ফিলিগ্রি ঝুমকা, পান্না-মুক্তার দুল ও ব্রাইডাল কানপাশার এক্সক্লুসিভ কালেকশন।',
    descriptionEn:
      'Featherweight antique jhumkas, emerald drops, and wedding chandbalis balanced for all-day comfort.',
    image: '/src/assets/images/product_radiance_earrings_1795106766208.jpg',
    startingPrice: 950,
  },
  {
    id: 'bracelets',
    codePrefix: 'B',
    nameBn: 'ব্রেসলেট',
    nameEn: 'Bracelets',
    subtitleBn: 'হিঞ্জ গোল্ড কাফ ও পার্ল ব্রেসলেট',
    subtitleEn: 'Hinged gold cuffs & pearl links',
    descriptionBn:
      'সহজ হিঞ্জ-লক গোল্ড কাফ, স্লিম এনামেল ব্রেসলেট ও অ্যান্টিক মুক্তার রিস্ট পিস।',
    descriptionEn:
      'Sculpted hinged gold cuffs, slim enamel wrist bands, and delicate linked pearl bracelets.',
    image: '/src/assets/images/product_gold_bracelet_cuff_1795200328549.jpg',
    startingPrice: 1120,
  },
  {
    id: 'necklaces',
    codePrefix: 'Y',
    nameBn: 'নেকলেস',
    nameEn: 'Necklaces',
    subtitleBn: 'সীতাহার, পোলকি চোকার ও ব্রাইডাল হার',
    subtitleEn: 'Layered sitahars & polki chokers',
    descriptionBn:
      'বাঙালি ঐতিহ্যের সীতাহার, পোলকি চোকার এবং রয়্যাল ৩-লেয়ার ব্রাইডাল নেকলেস সেট।',
    descriptionEn:
      'Multi-layered Bengali sitahars, uncut polki collars, and flagship bridal necklaces.',
    image: '/src/assets/images/product_layered_sitahar_necklace_1795200341472.jpg',
    startingPrice: 1450,
  },
  {
    id: 'rings',
    codePrefix: 'R',
    nameBn: 'আংটি',
    nameEn: 'Rings',
    subtitleBn: 'জালি রিং, মীনাকারি ও ক্লাসিক ব্যান্ড',
    subtitleEn: 'Filigree domes, meenakari & bands',
    descriptionBn:
      'অ্যাডজাস্টেবল ব্রাইডাল জালি আংটি, মুনস্টোন মীনাকারি ও প্রতিদিনের ক্লাসিক গোল্ড ব্যান্ড।',
    descriptionEn:
      'Adjustable filigree cocktail rings, moonstone meenakari statement pieces, and mirror-polished bands.',
    image: '/src/assets/images/product_regal_rings_duo_1795106714448.jpg',
    startingPrice: 780,
  },
  {
    id: 'combos',
    codePrefix: 'C',
    nameBn: 'ব্রাইডাল কম্বো',
    nameEn: 'Bridal Combos',
    subtitleBn: 'ভেলভেট বক্সে সম্পূর্ণ গহনার বান্ডেল',
    subtitleEn: 'Complete velvet-box jewellery bundles',
    descriptionBn:
      'নেকলেস, চুড়ি, ঝুমকা ও আংটির সাশ্রয়ী কম্বো বান্ডেল—বিয়ে, বউভাত ও গিফটিংয়ের জন্য দারুণ অফার।',
    descriptionEn:
      'Value-packed bridal and festive jewellery bundles uniting necklaces, bangles, jhumkas, and clutches.',
    image: '/src/assets/images/banner_bridal_combo_offer_1795200323944.jpg',
    startingPrice: 3650,
  },
  {
    id: 'anklets',
    codePrefix: 'P',
    nameBn: 'নূপুর ও পায়েল',
    nameEn: 'Anklets & Payel',
    subtitleBn: 'ঘুঙুর ও মুক্তার ঐতিহ্যবাহী পায়েল',
    subtitleEn: 'Ghungroo & pearl heritage payels',
    descriptionBn:
      'মৃদু ঘুঙুর ও মুক্তার ঝালর দেওয়া অ্যান্টিক গোল্ড পায়েল এবং স্লিম ডেইলি নূপুর জোড়া।',
    descriptionEn:
      'Delicate miniature ghungroo payels and pearl-accented antique gold anklets sold in matched pairs.',
    image: '/src/assets/images/product_royal_payel_anklets_1795200330234.jpg',
    startingPrice: 1080,
  },
  {
    id: 'clutches',
    codePrefix: 'G',
    nameBn: 'ক্লাচ ও গিফট',
    nameEn: 'Clutches & Gifts',
    subtitleBn: 'জারদৌসি সিল্ক ক্লাচ ও গিফট বক্স',
    subtitleEn: 'Zardozi silk clutches & gift sets',
    descriptionBn:
      'খাঁটি সিল্কের উপর হাতে করা জারদৌসি কাজের ইভিনিং ক্লাচ এবং প্রিমিয়াম ভেলভেট গিফট সেট।',
    descriptionEn:
      'Hand-embroidered zardozi raw silk clutches and curated keepsake gift sets for weddings.',
    image: '/src/assets/images/product_signature_clutch_1795106751324.jpg',
    startingPrice: 2180,
  },
];

export const RAHA_PRODUCTS: JewelleryProduct[] = [
  // ==================== 1. চুড়ি (BANGLES) ====================
  {
    id: 'bn-royal-carved-bala',
    sku: 'S-1001',
    categoryId: 'bangles',
    nameBn: 'রয়্যাল নকশি গোল্ড বালা জোড়া',
    nameEn: 'Royal Nakshi Carved Bala Pair',
    image: '/src/assets/images/hero_noir_velvet_jewelry_1795106716075.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1850,
    weightGrams: 18.4,
    weightTraditionalBn: '১ ভরি ৯ আনা',
    sizes: ['2.4"', '2.6"', '2.8"'],
    sizeLabelBn: 'চুড়ির সাইজ',
    sizeLabelEn: 'Bangle Size',
    finishNoteBn: 'হাতে খোদাই করা অ্যান্টিক ফুলকারি নকশা ও মুক্তার কাজ',
    finishNoteEn: 'Hand-carved floral relief with micro seed-pearl inlay',
    descriptionBn:
      'বিয়ে ও রিসেপশনের সাজের জন্য ঐতিহ্যবাহী নকশি কাজের ভারী বালা জোড়া। দীর্ঘস্থায়ী সোনালি পালিশ।',
    descriptionEn:
      'Heirloom bridal bala pair featuring deep floral carving and smooth interior comfort fit.',
    statusBn: 'হট সেল',
    statusEn: 'Hot Sale',
    isHotSale: true,
    isSignature: true,
  },
  {
    id: 'bn-cocoa-ivory-trio',
    sku: 'S-1002',
    categoryId: 'bangles',
    nameBn: 'কোকো আইভরি এনামেল চুড়ি ট্রায়ো',
    nameEn: 'Cocoa Ivory Enamel Bangle Trio',
    image: '/src/assets/images/product_cocoa_enamel_bangles_1795106714198.jpg',
    defaultKarat: '21K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1250,
    weightGrams: 12.2,
    weightTraditionalBn: '১ ভরি ১ আনা',
    sizes: ['2.4"', '2.6"', '2.8"'],
    sizeLabelBn: 'চুড়ির সাইজ',
    sizeLabelEn: 'Bangle Size',
    finishNoteBn: 'হ্যান্ড-গ্লেজড এনামেল ও সূক্ষ্ম মিলগ্রেইন গোল্ড বর্ডার',
    finishNoteEn: 'Hand-glazed gloss enamel with fine milgrain gold rim',
    descriptionBn:
      'কোকো ব্রাউন ও আইভরি এনামেলের ৩টি চুড়ির সেট, যা শাড়ি ও কামিজ উভয়ের সাথেই দারুণ মানায়।',
    descriptionEn:
      'Three graduated enamel bangles finished in espresso cocoa and porcelain ivory with fine gold-beaded edges.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isHotSale: true,
    isNewArrival: true,
  },
  {
    id: 'bn-amber-pearl-quartet',
    sku: 'S-1003',
    categoryId: 'bangles',
    nameBn: 'অ্যাম্বার ও মুক্তা হেরিটেজ ৪-পিস সেট',
    nameEn: 'Amber & Pearl Heritage Quartet',
    image: '/src/assets/images/product_amber_heritage_stack_1795106767229.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1580,
    weightGrams: 15.6,
    weightTraditionalBn: '১ ভরি ৫ আনা',
    sizes: ['2.4"', '2.6"', '2.8"'],
    sizeLabelBn: 'চুড়ির সাইজ',
    sizeLabelEn: 'Bangle Size',
    finishNoteBn: 'ফ্রেশওয়াটার পার্ল বর্ডার ও ব্রাশড অ্যান্টিক গোল্ড কংকন',
    finishNoteEn: 'Freshwater seed pearl trim paired with brushed antique gold',
    descriptionBn:
      'চারটি চুড়ির নিখুঁত স্ট্যাক—অ্যান্টিক গোল্ড কংকন, অ্যাম্বার গ্লস ব্যান্ড ও মুক্তার চিকন চুড়ি।',
    descriptionEn:
      'Curated four-bangle wrist stack pairing hand-set freshwater pearls with warm amber and carved matte gold.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isNewArrival: true,
  },
  {
    id: 'bn-atelier-filigree-stack',
    sku: 'S-1004',
    categoryId: 'bangles',
    nameBn: 'মীনাকারি ফ্লোরাল চুড়ি কালেকশন',
    nameEn: 'Meenakari Floral Artisan Stack',
    image: '/src/assets/images/hero_atelier_ivory_bangles_1795106729452.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1420,
    weightGrams: 14.0,
    weightTraditionalBn: '১ ভরি ৩ আনা',
    sizes: ['2.4"', '2.6"', '2.8"'],
    sizeLabelBn: 'চুড়ির সাইজ',
    sizeLabelEn: 'Bangle Size',
    finishNoteBn: 'সূক্ষ্ম ফ্লোরাল এনামেল ও স্ক্র্যাচ-রেজিস্ট্যান্ট গোল্ড কোট',
    finishNoteEn: 'Hand-painted floral meenakari with scratch-resistant finish',
    descriptionBn:
      'উৎসব ও দাওয়াতের জন্য হাতে আঁকা ফ্লোরাল মীনাকারি কাজের ৪ পিসের এক্সক্লুসিভ চুড়ি সেট।',
    descriptionEn:
      'Four artisan bangles with miniature hand-painted floral motifs framed in warm satin gold.',
    statusBn: 'সিগনেচার',
    statusEn: 'Signature',
    isSignature: true,
  },

  // ==================== 2. কানের দুল (EARRINGS) ====================
  {
    id: 'er-emerald-filigree-jhumka',
    sku: 'E-1001',
    categoryId: 'earrings',
    nameBn: 'এমেরাল্ড ফিলিগ্রি ঝুমকা দুল',
    nameEn: 'Emerald Filigree Dome Jhumkas',
    image: '/src/assets/images/product_radiance_earrings_1795106766208.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1050,
    weightGrams: 9.4,
    weightTraditionalBn: '১৩ আনা',
    sizes: ['Push-Back Post'],
    sizeLabelBn: 'লক সিস্টেম',
    sizeLabelEn: 'Closure',
    finishNoteBn: 'পান্না-কাট স্টোন, ফিলিগ্রি ডোম ও মুক্তার ঝালর',
    finishNoteEn: 'Emerald-cut stone inlay, pierced gold dome & seed pearl fringe',
    descriptionBn:
      'ঐতিহ্যবাহী নকশার হালকা ওজনের ফিলিগ্রি ঝুমকা, পান্না রঙের পাথর এবং নিচে সূক্ষ্ম মুক্তার ঝালরসহ।',
    descriptionEn:
      'Intricately pierced antique gold jhumkas accented with deep emerald stones and tiered pearl chimes.',
    statusBn: 'হট সেল',
    statusEn: 'Hot Sale',
    isHotSale: true,
    isSignature: true,
  },
  {
    id: 'er-bridal-pearl-jhumka',
    sku: 'E-1002',
    categoryId: 'earrings',
    nameBn: 'ব্রাইডাল মুক্তা-ঝালর রাজকীয় ঝুমকা',
    nameEn: 'Bridal Pearl-Chandelier Jhumkas',
    image: '/src/assets/images/hero_katha_gallery_editorial_1795106715280.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1180,
    weightGrams: 11.2,
    weightTraditionalBn: '১৫ আনা',
    sizes: ['Push-Back + Support Chain'],
    sizeLabelBn: 'লক সিস্টেম',
    sizeLabelEn: 'Closure',
    finishNoteBn: 'রুবি-ড্রপ টপ ও ৩ স্তরের মুক্তার ঝালর',
    finishNoteEn: 'Ruby drop stud top with triple-tier ivory pearl tassels',
    descriptionBn:
      'ব্রাইডাল বা পার্টি শাড়ির সাথে দারুণ মানানসই ৩ স্তরের মুক্তা-ঝালর ঝুমকা।',
    descriptionEn:
      'Statement wedding jhumkas crowned with a ruby-accented teardrop stud and cascading pearl tiers.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isNewArrival: true,
  },
  {
    id: 'er-nawab-polki-drops',
    sku: 'E-1003',
    categoryId: 'earrings',
    nameBn: 'নবাবী পোলকি ও পার্ল ড্রপ দুল',
    nameEn: 'Nawabi Polki & Baroque Pearl Drops',
    image: '/src/assets/images/product_crown_necklace_set_1795106715479.jpg',
    defaultKarat: '21K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1120,
    weightGrams: 8.6,
    weightTraditionalBn: '১২ আনা',
    sizes: ['Push-Back Post'],
    sizeLabelBn: 'লক সিস্টেম',
    sizeLabelEn: 'Closure',
    finishNoteBn: 'আনকাট পোলকি স্টোন ও মিডনাইট মীনাকারি ডিটেইল',
    finishNoteEn: 'Uncut polki stone setting with midnight meenakari petals',
    descriptionBn:
      'পোলকি পাথর এবং বড় মুক্তার ড্রপ দেওয়া রাজকীয় কানের দুল—গাঢ় রঙের শাড়ির সাথে অনন্য।',
    descriptionEn:
      'Regal polki floral drops suspended with lustrous ivory pearls for evening glamour.',
    statusBn: 'স্টকে আছে',
    statusEn: 'In Stock',
  },
  {
    id: 'er-everyday-gold-studs',
    sku: 'E-1004',
    categoryId: 'earrings',
    nameBn: 'ডেইলি ওয়্যার ক্লাসিক গোল্ড স্টাড',
    nameEn: 'Everyday Filigree Gold Studs',
    image: '/src/assets/images/product_layered_sitahar_necklace_1795200341472.jpg',
    defaultKarat: '18K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 950,
    weightGrams: 5.2,
    weightTraditionalBn: '৭ আনা',
    sizes: ['Push-Back Post'],
    sizeLabelBn: 'লক সিস্টেম',
    sizeLabelEn: 'Closure',
    finishNoteBn: 'হালকা ওজন, অ্যান্টি-অ্যালার্জিক পোস্ট ও ১৮K ফিনিশ',
    finishNoteEn: 'Featherweight skin-safe posts with satin 18K tone finish',
    descriptionBn:
      'অফিস বা প্রতিদিনের ব্যবহারের জন্য ছিমছাম ও মার্জিত সোনালি স্টাড কানের দুল।',
    descriptionEn:
      'Understated filigree studs designed for comfortable daily wear with hypoallergenic posts.',
    statusBn: 'হট সেল',
    statusEn: 'Hot Sale',
    isHotSale: true,
  },

  // ==================== 3. ব্রেসলেট (BRACELETS) ====================
  {
    id: 'br-filigree-hinged-cuff',
    sku: 'B-1001',
    categoryId: 'bracelets',
    nameBn: 'ফিলিগ্রি পার্ল হিঞ্জ গোল্ড কাফ',
    nameEn: 'Filigree Pearl Hinged Gold Cuff',
    image: '/src/assets/images/product_gold_bracelet_cuff_1795200328549.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1560,
    weightGrams: 13.8,
    weightTraditionalBn: '১ ভরি ৩ আনা',
    sizes: ['Free Size (Hinge Lock)', 'Medium (2.5")'],
    sizeLabelBn: 'রিস্ট সাইজ',
    sizeLabelEn: 'Wrist Fit',
    finishNoteBn: 'গভীর ফ্লোরাল ফিলিগ্রি, দুই পাশে মুক্তার সারি ও হিঞ্জ লক',
    finishNoteEn: 'Pierced botanical filigree bordered by double ivory pearl rows',
    descriptionBn:
      'সহজ হিঞ্জ-লক সিস্টেমের রাজকীয় গোল্ড কাফ ব্রেসলেট—এক হাতেই আভিজাত্যপূর্ণ লুক এনে দেয়।',
    descriptionEn:
      'Sculpted hinged cuff featuring openwork floral goldsmithing and twin freshwater pearl rails.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isHotSale: true,
    isNewArrival: true,
    isSignature: true,
  },
  {
    id: 'br-pearl-gold-cuff',
    sku: 'B-1002',
    categoryId: 'bracelets',
    nameBn: 'মুক্তা-অ্যাম্বার রয়্যাল রিস্ট ব্রেসলেট',
    nameEn: 'Amber & Pearl Royal Wrist Bracelet',
    image: '/src/assets/images/product_amber_heritage_stack_1795106767229.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1380,
    weightGrams: 11.4,
    weightTraditionalBn: '১৫ আনা',
    sizes: ['Free Size (Hinge Lock)', 'Medium (2.5")'],
    sizeLabelBn: 'রিস্ট সাইজ',
    sizeLabelEn: 'Wrist Fit',
    finishNoteBn: 'ঘড়ির সাথে বা একা পরার জন্য হালকা হিঞ্জ ব্রেসলেট',
    finishNoteEn: 'Concealed hinge clasp designed to stack seamlessly with a watch',
    descriptionBn:
      'অ্যান্টিক গোল্ড ও মুক্তা বসানো ব্রেসলেট, ঘড়ির সাথে বা একা পরার জন্য দারুণ।',
    descriptionEn:
      'Hinged antique gold bracelet accented with natural seed pearls for effortless wrist styling.',
    statusBn: 'স্টকে আছে',
    statusEn: 'In Stock',
  },
  {
    id: 'br-cocoa-enamel-cuff',
    sku: 'B-1003',
    categoryId: 'bracelets',
    nameBn: 'স্লিম এনামেল গোল্ড কাফ ব্রেসলেট',
    nameEn: 'Slim Enamel Gold Cuff Bracelet',
    image: '/src/assets/images/product_cocoa_enamel_bangles_1795106714198.jpg',
    defaultKarat: '18K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1120,
    weightGrams: 8.8,
    weightTraditionalBn: '১২ আনা',
    sizes: ['Adjustable Cuff'],
    sizeLabelBn: 'রিস্ট সাইজ',
    sizeLabelEn: 'Wrist Fit',
    finishNoteBn: 'মিনিমাল গ্লস এনামেল ইনলে ও ১৮K সোনালি এজ',
    finishNoteEn: 'Minimal gloss enamel inlay framed in brushed gold',
    descriptionBn:
      'আধুনিক মিনিমাল ডিজাইনের স্লিম এনামেল ব্রেসলেট, অফিস বা ক্যাজুয়াল আউটিংয়ের জন্য।',
    descriptionEn:
      'Contemporary slim open cuff featuring smooth ivory-cocoa enamel inlay and fine beaded gold trim.',
    statusBn: 'মডার্ন এডিট',
    statusEn: 'Modern Edit',
  },

  // ==================== 4. নেকলেস (NECKLACES) ====================
  {
    id: 'nk-bengali-layered-sitahar',
    sku: 'Y-1001',
    categoryId: 'necklaces',
    nameBn: 'বাঙালি ঐতিহ্যবাহী নকশি সীতাহার সেট',
    nameEn: 'Traditional Bengali Layered Sitahar Set',
    image: '/src/assets/images/product_layered_sitahar_necklace_1795200341472.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 2890,
    weightGrams: 36.2,
    weightTraditionalBn: '৩ ভরি ২ আনা',
    sizes: ['22" Adjustable + Matching Studs'],
    sizeLabelBn: 'সেটের মাপ',
    sizeLabelEn: 'Set Spec',
    finishNoteBn: '৩ স্তরের গোল্ড বল চেইন, রুবি-পান্না লকেট ও ম্যাচিং কানের দুলসহ',
    finishNoteEn: 'Triple-strand gold bead haram with filigree pendant & matching studs',
    descriptionBn:
      'বাঙালি বিয়ের চিরন্তন ঐতিহ্য—সূক্ষ্ম নকশি কাজের সীতাহার ও ম্যাচিং দুল, কাতান বা বেনারসির সাথে অনন্য।',
    descriptionEn:
      'Classic Bengali bridal sitahar with ornate filigree locket and matching ruby-center studs.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isHotSale: true,
    isNewArrival: true,
    isSignature: true,
  },
  {
    id: 'nk-maharani-bridal-haram',
    sku: 'Y-1002',
    categoryId: 'necklaces',
    nameBn: 'মহারানী ব্রাইডাল পার্ল ও গোল্ড চোকার',
    nameEn: 'Maharani Bridal Pearl & Gold Choker',
    image: '/src/assets/images/hero_noir_velvet_jewelry_1795106716075.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 3250,
    weightGrams: 42.0,
    weightTraditionalBn: '৩ ভরি ৯ আনা',
    sizes: ['Adjustable Silk Dori'],
    sizeLabelBn: 'নেক ফিট',
    sizeLabelEn: 'Neck Fit',
    finishNoteBn: '২২K/২৪K ব্রাইডাল গোল্ড টোন, পান্না-রুবি ও মুক্তার ঝালর',
    finishNoteEn: 'Heirloom gold filigree with emerald-ruby stones & pearl drops',
    descriptionBn:
      'আমাদের ফ্ল্যাগশিপ ব্রাইডাল কালেকশন—মুক্তা ও সূক্ষ্ম ফিলিগ্রি কাজের রাজকীয় ব্রাইডাল নেকলেস সেট।',
    descriptionEn:
      'Flagship bridal collar sculpted in intricate gold filigree, crowned with emerald accents and luminous pearl drops.',
    statusBn: 'হট সেল',
    statusEn: 'Hot Sale',
    isHotSale: true,
    isSignature: true,
  },
  {
    id: 'nk-noir-polki-choker',
    sku: 'Y-1003',
    categoryId: 'necklaces',
    nameBn: 'নয়্যার পেটাল পোলকি চোকার নেকলেস',
    nameEn: 'Noir Petal Polki Choker Necklace',
    image: '/src/assets/images/product_crown_necklace_set_1795106715479.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 2450,
    weightGrams: 28.5,
    weightTraditionalBn: '২ ভরি ৭ আনা',
    sizes: ['Adjustable Dori'],
    sizeLabelBn: 'নেক ফিট',
    sizeLabelEn: 'Neck Fit',
    finishNoteBn: 'মিডনাইট এনামেল পাপড়ি, পোলকি পাথর ও ব্যারোক পার্ল',
    finishNoteEn: 'Midnight enamel petals, uncut polki stones & baroque pearls',
    descriptionBn:
      'গলায় নিখুঁতভাবে বসে থাকা মিডনাইট এনামেল ও পোলকি পাথরের অভিজাত চোকার নেকলেস।',
    descriptionEn:
      'Contoured statement choker uniting deep midnight enamel florals with glowing uncut polki stones.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isNewArrival: true,
  },

  // ==================== 5. আংটি (RINGS) ====================
  {
    id: 'rg-moonstone-meenakari',
    sku: 'R-1001',
    categoryId: 'rings',
    nameBn: 'মুনস্টোন মীনাকারি রাজকীয় আংটি',
    nameEn: 'Moonstone Meenakari Cocktail Ring',
    image: '/src/assets/images/product_regal_rings_duo_1795106714448.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 920,
    weightGrams: 6.8,
    weightTraditionalBn: '৯ আনা',
    sizes: ['Adjustable Band', 'Size 6', 'Size 7', 'Size 8'],
    sizeLabelBn: 'আংটির সাইজ',
    sizeLabelEn: 'Ring Size',
    finishNoteBn: 'ক্যাবোশন মুনস্টোন ও হাতে আঁকা মীনাকারি বর্ডার',
    finishNoteEn: 'Cabochon rainbow moonstone framed in kiln-fired meenakari',
    descriptionBn:
      'উজ্জ্বল মুনস্টোন পাথরের চারপাশে সূক্ষ্ম মীনাকারি কাজের রাজকীয় স্টেটমেন্ট আংটি।',
    descriptionEn:
      'Sculpted statement cocktail ring uniting glowing rainbow moonstone with hand-enamelled detailing.',
    statusBn: 'হট সেল',
    statusEn: 'Hot Sale',
    isHotSale: true,
    isNewArrival: true,
  },
  {
    id: 'rg-bridal-jali-crown',
    sku: 'R-1002',
    categoryId: 'rings',
    nameBn: 'ব্রাইডাল জালি-নকশা স্টেটমেন্ট আংটি',
    nameEn: 'Bridal Filigree Jali Statement Ring',
    image: '/src/assets/images/banner_festive_bangles_combo_1795200327146.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 860,
    weightGrams: 5.9,
    weightTraditionalBn: '৮ আনা',
    sizes: ['Adjustable Band', 'Size 6', 'Size 7', 'Size 8'],
    sizeLabelBn: 'আংটির সাইজ',
    sizeLabelEn: 'Ring Size',
    finishNoteBn: 'আমাদের ব্যানারের জনপ্রিয় জালি-কাট গোল্ড রিং',
    finishNoteEn: 'Intricate lattice filigree dome inspired by bridal heirlooms',
    descriptionBn:
      'পুরো আঙুলে মানিয়ে যাওয়া সূক্ষ্ম জালি-কাট নকশার ব্রাইডাল গোল্ড আংটি, হালকা ও আরামদায়ক।',
    descriptionEn:
      'Airy filigree dome ring crafted for wedding occasions with comfortable adjustable sizing.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isNewArrival: true,
  },
  {
    id: 'rg-classic-band-ring',
    sku: 'R-1003',
    categoryId: 'rings',
    nameBn: 'ক্লাসিক পলিশড গোল্ড ব্যান্ড আংটি',
    nameEn: 'Classic Polished Dome Gold Band',
    image: '/src/assets/images/product_cocoa_enamel_bangles_1795106714198.jpg',
    defaultKarat: '21K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 780,
    weightGrams: 4.5,
    weightTraditionalBn: '৬ আনা',
    sizes: ['Size 6', 'Size 7', 'Size 8', 'Size 9'],
    sizeLabelBn: 'আংটির সাইজ',
    sizeLabelEn: 'Ring Size',
    finishNoteBn: 'মিরর পলিশ ও কমফোর্ট-ফিট রাউন্ডেড ব্যান্ড',
    finishNoteEn: 'Mirror-burnished comfort-fit rounded gold band',
    descriptionBn:
      'প্রতিদিনের ব্যবহারের জন্য ছিমছাম ও টেকসই ক্লাসিক গোল্ড ব্যান্ড আংটি।',
    descriptionEn:
      'Timeless rounded dome band with warm mirror polish for daily wear or ring stacking.',
    statusBn: 'ডেইলি ওয়্যার',
    statusEn: 'Daily Wear',
  },

  // ==================== 6. ব্রাইডাল কম্বো (BRIDAL COMBOS) ====================
  {
    id: 'cb-grand-velvet-bridal',
    sku: 'C-1001',
    categoryId: 'combos',
    nameBn: 'গ্র্যান্ড ভেলভেট বক্স ব্রাইডাল কম্বো (৯ পিস)',
    nameEn: 'Grand Velvet Box Bridal Combo (9 Pieces)',
    image: '/src/assets/images/banner_bridal_combo_offer_1795200323944.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 4850,
    weightGrams: 68.5,
    weightTraditionalBn: '৫ ভরি ১৪ আনা',
    sizes: ['Bangle 2.4" Set', 'Bangle 2.6" Set', 'Bangle 2.8" Set'],
    sizeLabelBn: 'ব্যাঙ্গেল সাইজ',
    sizeLabelEn: 'Bangle Size',
    finishNoteBn: '২-লেয়ার নেকলেস + ৬টি বালা + ঝুমকা জোড়া — ভেলভেট গিফট বক্স ফ্রি',
    finishNoteEn: 'Double bridal necklace + 6 carved bangles + jhumkas in emerald velvet keepsake box',
    descriptionBn:
      'বিয়ে ও বউভাতের সম্পূর্ণ গহনার প্যাকেজ একসাথে! আলাদা কিনলে যা পড়ত তার চেয়ে ৳১,২০০ সাশ্রয়।',
    descriptionEn:
      'Complete 9-piece wedding box combining bridal necklaces, 6 heritage bangles, and jhumkas—saving ৳1,200.',
    statusBn: 'কম্বো অফার',
    statusEn: 'Bundle Offer',
    isHotSale: true,
    isNewArrival: true,
    isSignature: true,
  },
  {
    id: 'cb-festive-bangles-clutch',
    sku: 'C-1002',
    categoryId: 'combos',
    nameBn: 'ফেস্টিভ চুড়ি, আংটি ও জারদৌসি ক্লাচ কম্বো',
    nameEn: 'Festive Bangles, Rings & Zardozi Clutch Combo',
    image: '/src/assets/images/banner_festive_bangles_combo_1795200327146.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 3650,
    weightGrams: 44.0,
    weightTraditionalBn: '৩ ভরি ১২ আনা',
    sizes: ['Bangle 2.4" Bundle', 'Bangle 2.6" Bundle', 'Bangle 2.8" Bundle'],
    sizeLabelBn: 'বান্ডেল সাইজ',
    sizeLabelEn: 'Bundle Size',
    finishNoteBn: 'মীনাকারি চুড়ি স্ট্যাক + ২টি রিং + গোল্ড জারদৌসি ক্লাচ',
    finishNoteEn: 'Meenakari bangle stack + 2 statement rings + gold zardozi evening clutch',
    descriptionBn:
      'যেকোনো উৎসব বা পার্টিতে ম্যাচিং সাজের জন্য চুড়ি, আংটি ও জারদৌসি ক্লাচের দারুণ কম্বো।',
    descriptionEn:
      'Coordinated festive bundle pairing glazed enamel bangles, two filigree rings, and a hand-embroidered clutch.',
    statusBn: 'হট কম্বো',
    statusEn: 'Hot Bundle',
    isHotSale: true,
    isNewArrival: true,
  },

  // ==================== 7. নূপুর ও পায়েল (ANKLETS & PAYEL) ====================
  {
    id: 'ak-royal-ghungroo-payel',
    sku: 'P-1001',
    categoryId: 'anklets',
    nameBn: 'রয়্যাল ঘুঙুর ও মুক্তার ব্রাইডাল পায়েল জোড়া',
    nameEn: 'Royal Ghungroo & Pearl Bridal Payel Pair',
    image: '/src/assets/images/product_royal_payel_anklets_1795200330234.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1280,
    weightGrams: 16.4,
    weightTraditionalBn: '১ ভরি ৬ আনা',
    sizes: ['Standard 10" Pair', '10.5" Adjustable Pair'],
    sizeLabelBn: 'পায়েলের মাপ',
    sizeLabelEn: 'Anklet Length',
    finishNoteBn: 'মৃদু শব্দের গোল্ড ঘুঙুর, রুবি-পান্না স্টোন ও মুক্তার ঝালর',
    finishNoteEn: 'Soft-chime miniature ghungroo bells, stone accents & ivory pearl drops',
    descriptionBn:
      'হলুদ, বিয়ে ও উৎসবের জন্য সূক্ষ্ম ঘুঙুর এবং মুক্তা বসানো ঐতিহ্যবাহী অ্যান্টিক গোল্ড পায়েল জোড়া।',
    descriptionEn:
      'Handcrafted antique gold bridal payel pair detailed with tiny ghungroo bells and pearl droplets.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isNewArrival: true,
    isSignature: true,
  },
  {
    id: 'ak-slim-pearl-nupur',
    sku: 'P-1002',
    categoryId: 'anklets',
    nameBn: 'স্লিম মুক্তা ও সোনালি চেইন নূপুর',
    nameEn: 'Slim Pearl & Gold Chain Nupur Pair',
    image: '/src/assets/images/product_royal_payel_anklets_1795200330234.jpg',
    defaultKarat: '18K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 1080,
    weightGrams: 9.8,
    weightTraditionalBn: '১৩ আনা',
    sizes: ['Standard 10" Pair'],
    sizeLabelBn: 'নূপুরের মাপ',
    sizeLabelEn: 'Length',
    finishNoteBn: 'হালকা ওজন, এস-হুক সিকিউর লক ও কমফোর্ট চেইন',
    finishNoteEn: 'Featherweight flexible link chain with secure S-hook clasp',
    descriptionBn:
      'প্রতিদিন বা হালকা অনুষ্ঠানে পরার জন্য ছিমছাম ও নাজুক ডিজাইনের নূপুর জোড়া।',
    descriptionEn:
      'Delicate everyday gold-tone nupur pair with subtle pearl drops and smooth flexible links.',
    statusBn: 'স্টকে আছে',
    statusEn: 'In Stock',
  },

  // ==================== 8. ক্লাচ ও গিফট (CLUTCHES & GIFTS) ====================
  {
    id: 'cl-champagne-zardozi-clutch',
    sku: 'G-1001',
    categoryId: 'clutches',
    nameBn: 'শ্যাম্পেইন সিল্ক জারদৌসি ব্রাইডাল ক্লাচ',
    nameEn: 'Champagne Silk Zardozi Bridal Clutch',
    image: '/src/assets/images/product_signature_clutch_1795106751324.jpg',
    defaultKarat: '22K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 2180,
    weightGrams: 185,
    weightTraditionalBn: 'গোল্ড চেইনসহ',
    sizes: ['Standard (Fits All Phones)'],
    sizeLabelBn: 'সাইজ',
    sizeLabelEn: 'Capacity',
    finishNoteBn: 'খাঁটি শ্যাম্পেইন র-সিল্ক, হাতে করা জারদৌসি ও ব্রাশড গোল্ড ক্ল্যাপ',
    finishNoteEn: 'Raw champagne silk, artisan dabka zardozi & brushed gold clasp',
    descriptionBn:
      'ফোন ও প্রয়োজনীয় জিনিস অনায়াসে ধরে এমন স্ট্রাকচার্ড ব্রাইডাল ক্লাচ, সাথে ডিটাচেবল গোল্ড চেইন স্ট্র্যাপ।',
    descriptionEn:
      'Structured raw silk minaudiere with botanical zardozi embroidery and detachable fine gold chain.',
    statusBn: 'হট সেল',
    statusEn: 'Hot Sale',
    isHotSale: true,
    isSignature: true,
  },
  {
    id: 'cl-burgundy-royal-clutch',
    sku: 'G-1002',
    categoryId: 'clutches',
    nameBn: 'রয়্যাল বারগান্ডি ভেলভেট জারদৌসি ক্লাচ',
    nameEn: 'Royal Burgundy Velvet Zardozi Clutch',
    image: '/src/assets/images/hero_katha_gallery_editorial_1795106715280.jpg',
    defaultKarat: '24K',
    availableKarats: ['24K', '22K', '21K', '18K'],
    basePrice18K: 2290,
    weightGrams: 190,
    weightTraditionalBn: 'গোল্ড চেইনসহ',
    sizes: ['Standard (Fits All Phones)'],
    sizeLabelBn: 'সাইজ',
    sizeLabelEn: 'Capacity',
    finishNoteBn: 'ডিপ বারগান্ডি ভেলভেট ও সোনালি-মুক্তার হ্যান্ডওয়ার্ক',
    finishNoteEn: 'Deep burgundy velvet embroidered with antique gold thread and pearls',
    descriptionBn:
      'লাল বা মেরুন বেনারসির সাথে পারফেক্ট ম্যাচিংয়ের জন্য হাতে করা জারদৌসি ভেলভেট ক্লাচ।',
    descriptionEn:
      'Opulent deep burgundy bridal clutch hand-worked in antique gold florals and seed pearls.',
    statusBn: 'নিউ অ্যারাইভাল',
    statusEn: 'New Arrival',
    isNewArrival: true,
  },
];

export const RAHA_REVIEWS: RahaReview[] = [
  {
    id: 'rr-1',
    author: 'সাবরিনা ইসলাম',
    location: 'উত্তরা, ঢাকা',
    item: 'গ্র্যান্ড ভেলভেট বক্স ব্রাইডাল কম্বো (24K)',
    quoteBn:
      'কম্বো অফারটা অর্ডার করেছিলাম—ভেলভেট বক্সে দারুণ প্যাকিং হয়ে ২৪ ঘণ্টায় হাতে পেয়েছি। পছন্দ না হলে রিটার্ন সুবিধা থাকায় নিশ্চিন্তে নিয়েছি।',
    quoteEn:
      'Ordered the bridal velvet box combo—arrived in 24 hours with zero advance payment and museum-grade finishing.',
  },
  {
    id: 'rr-2',
    author: 'নুসরাত জাহান',
    location: 'আগ্রাবাদ, চট্টগ্রাম',
    item: 'বাঙালি ঐতিহ্যবাহী নকশি সীতাহার (22K)',
    quoteBn:
      '২৪K আর ২২K ক্যারেট সিলেক্ট করে বাজেট অনুযায়ী দাম দেখে নিতে পেরে খুব ভালো লেগেছে। সবাই আসল সোনার সীতাহার ভেবেছিল।',
    quoteEn:
      'Comparing 24K and 22K pricing right on the page made choosing effortless. Everyone at the wedding thought it was solid gold.',
  },
  {
    id: 'rr-3',
    author: 'ফারজানা আক্তার',
    location: 'জিন্দাবাজার, সিলেট',
    item: 'রয়্যাল ঘুঙুর ও মুক্তার পায়েল (22K)',
    quoteBn:
      'ফোনে সাইটটা ব্যবহার করা খুব সহজ, আর পায়েল ও ঝুমকা দুটোই ছবির চেয়েও সুন্দর হয়েছে।',
    quoteEn:
      'Super smooth to browse on my phone, and both the payel and jhumkas looked even richer in person.',
  },
];

export const INITIAL_RAHA_ORDERS: RahaOrder[] = [
  {
    orderId: 'RH-4028',
    customerName: 'সাবরিনা ইসলাম',
    phone: '01711-224028',
    zone: 'ঢাকা মেট্রো',
    address: 'সেক্টর ৭, উত্তরা, ঢাকা',
    total: 5240,
    itemCount: 2,
    statusBn: 'ডেলিভারির পথে আছে',
    statusEn: 'Out for Delivery',
    placedAt: 'আজ, সকাল ১০:৩০',
  },
  {
    orderId: 'RH-4015',
    customerName: 'নুসরাত জাহান',
    phone: '01819-334015',
    zone: 'ঢাকার বাইরে (চট্টগ্রাম)',
    address: 'আগ্রাবাদ সি/এ, চট্টগ্রাম',
    total: 3580,
    itemCount: 1,
    statusBn: 'কুরিয়ারে হ্যান্ডওভার হয়েছে',
    statusEn: 'Dispatched via Courier',
    placedAt: 'গতকাল, বিকাল ৫:১৫',
  },
];
