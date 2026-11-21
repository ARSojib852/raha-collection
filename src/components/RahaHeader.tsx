import { Images, MessageCircle, Moon, Phone, Sun } from 'lucide-react';
import { CollectionId, LangMode, RAHA_BRAND, ThemeMode } from '../data/rahaCatalog';

interface RahaHeaderProps {
  lang: LangMode;
  theme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onGoHome: () => void;
  onGoCategories: () => void;
  onOpenCollection: (id: CollectionId) => void;
  onOpenShots: () => void;
  activeNav: 'home' | 'category' | 'hot-sale' | 'new-arrivals' | 'signature';
}

export function RahaHeader({
  lang,
  theme,
  onToggleLang,
  onToggleTheme,
  onGoHome,
  onGoCategories,
  onOpenCollection,
  onOpenShots,
  activeNav,
}: RahaHeaderProps) {
  return (
    <div className="sticky top-0 z-40">
      {/* Slim Top Assurance & Mode Bar (White Mode = Vibrant Golden Amber + Dark Ink; Black Mode = Deep Obsidian) */}
      <div className="border-b border-[#D99D00]/30 bg-[#F4B400] text-[#161412] dark:border-[#D8AF56]/15 dark:bg-[#16110E] dark:text-[#E8DCC8] transition-colors">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between gap-2 px-3 text-[11px] sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="truncate font-medium">
              {lang === 'bn' ? RAHA_BRAND.promiseBn : RAHA_BRAND.promiseEn}
            </span>
            <span className="hidden md:inline opacity-45" aria-hidden="true">
              ·
            </span>
            <a
              href={`tel:${RAHA_BRAND.phone}`}
              className="hidden md:inline-flex items-center gap-1 font-semibold text-[#161412] dark:text-[#D8AF56] hover:underline whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              <span>{RAHA_BRAND.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dual Theme Switcher: White Mode <-> Black Mode */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-6 items-center gap-1 rounded bg-[#161412] px-2 text-[10px] font-semibold text-[#F4B400] transition-colors hover:bg-[#2A2521] dark:bg-[#D8AF56]/15 dark:text-[#E8C46D] dark:hover:bg-[#D8AF56]/25 whitespace-nowrap shrink-0"
              aria-label="Toggle between White Mode and Black Mode"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-3 w-3" aria-hidden="true" />
                  <span>{lang === 'bn' ? 'ব্ল্যাক মোড' : 'Black Mode'}</span>
                </>
              ) : (
                <>
                  <Sun className="h-3 w-3" aria-hidden="true" />
                  <span>{lang === 'bn' ? 'হোয়াইট মোড' : 'White Mode'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenShots}
              className="hidden sm:inline-flex items-center gap-1 font-semibold hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
            >
              <Images className="h-3 w-3" aria-hidden="true" />
              <span>{lang === 'bn' ? 'ইমেজ' : 'PNG'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleLang}
              className="font-semibold hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
              aria-label="Switch language between Bengali and English"
            >
              {lang === 'bn' ? 'EN' : 'বাংলা'}
            </button>
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="border-b border-[#E7E2D8] bg-white/95 backdrop-blur-md dark:border-[#D8AF56]/15 dark:bg-[#0C0908]/95 transition-colors">
        <div className="mx-auto flex h-14 sm:h-16 max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={onGoHome}
            className="font-noir-display text-xl font-bold tracking-tight text-[#161412] dark:text-[#E8C46D] sm:text-2xl whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4B400]"
          >
            {RAHA_BRAND.name}
          </button>

          {/* Zone 2: 4 Clean Single-Line Text Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A534A] dark:text-[#C8BCAE]"
          >
            <button
              type="button"
              onClick={onGoHome}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#161412] dark:hover:text-[#F5EDE0] ${
                activeNav === 'home' ? 'font-semibold text-[#161412] dark:text-[#E8C46D]' : ''
              }`}
            >
              {lang === 'bn' ? 'হোম' : 'Home'}
            </button>
            <button
              type="button"
              onClick={onGoCategories}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#161412] dark:hover:text-[#F5EDE0] ${
                activeNav === 'category' ? 'font-semibold text-[#9A6B00] dark:text-[#E8C46D]' : ''
              }`}
            >
              {lang === 'bn' ? '৮টি ক্যাটাগরি' : 'Categories'}
            </button>
            <button
              type="button"
              onClick={() => onOpenCollection('hot-sale')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#161412] dark:hover:text-[#F5EDE0] ${
                activeNav === 'hot-sale' ? 'font-semibold text-[#9A6B00] dark:text-[#E8C46D]' : ''
              }`}
            >
              {lang === 'bn' ? 'হট সেল' : 'Hot Sale'}
            </button>
            <button
              type="button"
              onClick={() => onOpenCollection('new-arrivals')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#161412] dark:hover:text-[#F5EDE0] ${
                activeNav === 'new-arrivals'
                  ? 'font-semibold text-[#9A6B00] dark:text-[#E8C46D]'
                  : ''
              }`}
            >
              {lang === 'bn' ? 'নিউ অ্যারাইভালস' : 'New Arrivals'}
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action — Direct Messenger Inbox */}
          <div className="flex items-center shrink-0">
            <a
              href={RAHA_BRAND.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 sm:h-10 items-center gap-1.5 rounded-md bg-[#161412] px-3 sm:px-4 text-xs font-semibold text-white transition-colors hover:bg-[#2C2723] dark:bg-[#D8AF56] dark:text-[#120D0A] dark:hover:bg-[#E7C26E] whitespace-nowrap shrink-0"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{lang === 'bn' ? 'মেসেঞ্জার' : 'Messenger'}</span>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
