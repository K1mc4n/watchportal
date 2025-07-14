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
    <div className="relative p-1 rounded-xl bg-black shadow-neon-pink h-full">
      <a 
        href={learnMoreLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative flex items-center gap-4 p-4 rounded-lg bg-black border border-neon-pink/50 h-full"
      >
        <div className="flex-shrink-0 w-20 h-20 bg-white rounded-md flex items-center justify-center p-1">
          <img 
            src={logoUrl} 
            alt={`${name} logo`} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-grow">
          <p className="text-white font-medium">
            {description}{' '}
            <span className="font-bold text-neon-pink uppercase hover:underline">
              Learn More
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};
