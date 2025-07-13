// Lokasi file: src/components/ui/NewsCard.tsx
"use client";

import { ShareButton } from './Share';
import { APP_NAME } from '~/lib/constants';

// Tipe data ini bisa diimpor dari file lain jika sudah ada
export interface Article {
  source: { name: string };
  title: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const castConfig = {
    text: `Interesting read from ${APP_NAME}:\n\n"${article.title}"`,
    embeds: [article.url, 'https://watchportal.vercel.app/'] as [string, string],
  };

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="block w-full mb-6 group">
      <div className="relative bg-neutral-800/70 rounded-xl overflow-hidden border border-neutral-700 hover:border-gold/50 transition-all duration-300">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="text-xs font-bold text-gold uppercase">{article.source.name}</span>
          <h3 className="mt-1 text-md font-semibold text-white leading-tight group-hover:underline">
            {article.title}
          </h3>
        </div>
        <div className="absolute top-2 right-2">
            <ShareButton 
                buttonText="" 
                cast={castConfig} 
                variant="secondary" 
                size="icon" 
                className="w-8 h-8 bg-black/30 backdrop-blur-sm"
            />
        </div>
      </div>
    </a>
  );
};
