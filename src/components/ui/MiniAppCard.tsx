// Lokasi file: src/components/ui/MiniAppCard.tsx

import { MiniApp } from '~/lib/miniAppsData';

interface MiniAppCardProps {
  app: MiniApp;
  onLaunch: (url: string) => void;
}

export const MiniAppCard = ({ app, onLaunch }: MiniAppCardProps) => {
  return (
    <div 
      className="group relative flex flex-col items-center justify-center text-center w-full aspect-square bg-neutral-800/60 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-neutral-700 p-3 cursor-pointer transition-all duration-300 ease-in-out hover:border-gold/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/10"
      onClick={() => onLaunch(app.url)}
    >
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shine"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <img
          className="w-14 h-14 rounded-xl object-cover mb-2 shadow-md transition-transform duration-300 group-hover:scale-110"
          src={app.iconUrl}
          alt={`Icon for ${app.name}`}
        />
        <p className="text-sm font-bold text-neutral-100 leading-tight">
          {app.name}
        </p>
        <p className="text-xs text-neutral-400 mt-1">{app.chain}</p>
      </div>
    </div>
  );
};
