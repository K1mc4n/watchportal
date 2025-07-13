// Lokasi file: src/components/HomeClient.tsx
"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AppLoading from '~/components/AppLoading';
import { APP_NAME } from '~/lib/constants';
import { miniAppsData, type MiniApp } from '~/lib/miniAppsData';
import { type Article } from '~/components/ui/NewsCard';

// Ganti nama impor dari Demo menjadi ThemedFeed
const ThemedFeed = dynamic(() => import('~/components/Demo'), {
  ssr: false,
  loading: () => <AppLoading />, 
});

export default function HomeClient() {
  const [apps, setApps] = useState<MiniApp[]>(miniAppsData);
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedData = async () => {
      setIsLoading(true);
      try {
        const [appsRes, newsRes] = await Promise.all([
          fetch('/api/apps/approved'),
          fetch('/api/news')
        ]);

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          const existingUrls = new Set(miniAppsData.map(app => app.url));
          const newApps = (appsData.apps || []).filter((app: MiniApp) => !existingUrls.has(app.url));
          setApps(prev => [...prev, ...newApps]);
        }
        
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          // Filter berita yang tidak memiliki judul atau gambar untuk menjaga kebersihan UI
          const validArticles = (newsData.articles || []).filter((article: Article) => article.title && article.urlToImage);
          setNews(validArticles);
        }

      } catch (error) {
        console.error("Failed to fetch feed data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedData();
  }, []);

  // Pastikan props yang dikirim sesuai dengan interface ThemedFeedProps
  return <ThemedFeed title={APP_NAME} apps={apps} news={news} isLoading={isLoading} />;
}
