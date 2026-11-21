import { useState } from 'react';
import { Gem } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTone?: 'light' | 'dark' | 'warm';
  label?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTone = 'warm',
  label,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const toneClasses =
      fallbackTone === 'dark'
        ? 'bg-gradient-to-br from-[#1C1A19] via-[#26221E] to-[#121110] text-[#D4AF37]/80'
        : fallbackTone === 'light'
          ? 'bg-gradient-to-br from-[#F5F3F0] via-[#EDEAE4] to-[#E5E0D8] text-[#6B1D2F]/70'
          : 'bg-gradient-to-br from-[#F3ECE2] via-[#EAE0D0] to-[#DFD3C0] text-[#9E7438]/80';

    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-6 text-center ${toneClasses} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gem className="h-7 w-7 stroke-[1.4]" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide opacity-85">{label || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
