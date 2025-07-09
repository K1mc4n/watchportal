// src/app/news/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { type Article, NewsArticleCard } from '~/components/ui/NewsArticleCard';
import { NewsArticleCardSkeleton } from '~/components/ui/NewsArticleCardSkeleton';

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <h1 className="text-2xl font-bold text-center mb-6">Web3 & Farcaster News</h1>
        
        <div>
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => <NewsArticleCardSkeleton key={i} />)}
            </>
          )}
          {error && <div className="text-center py-10 text-red-500">{error}</div>}
          {!isLoading && !error && (
            articles.length > 0 ? (
              articles.map((article, index) => (
                <NewsArticleCard key={`${article.url}-${index}`} article={article} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No news articles found.
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
