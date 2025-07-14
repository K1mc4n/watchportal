// Lokasi file: src/components/ui/SponsorBanner.tsx
"use client";

interface SponsorBannerProps {
  name: string;
  logoUrl: string;
  description: string;
  learnMoreLink: string;
}

export const SponsorBanner = ({ name, logoUrl, description, learnMoreLink }: SponsorBannerProps) => {
  return (
    // Mengganti efek neon dengan efek glow emas
    <div className="relative p-px rounded-xl bg-black shadow-gold-glow">
      <a 
        href={learnMoreLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative flex items-center gap-3 p-3 rounded-lg bg-black border border-gold/50 h-full"
      >
        {/* Ukuran logo diperkecil */}
        <div className="flex-shrink-0 w-14 h-14 bg-white rounded-md flex items-center justify-center p-1">
          <img 
            src={logoUrl} 
            alt={`${name} logo`} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-grow">
          {/* Ukuran font diperkecil */}
          <p className="text-white text-sm font-medium">
            {description}{' '}
            <span className="font-bold text-gold uppercase hover:underline">
              Learn More
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};
