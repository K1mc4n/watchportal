// Lokasi file: src/components/HomeClient.tsx
"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AppLoading from '~/components/AppLoading';
import { APP_NAME } from '~/lib/constants';
import { miniAppsData, type MiniApp } from '~/lib/miniAppsData';

const ThemedFeed = dynamic(() => import('~/components/Demo'), {
  ssr: false,
  loading: () => <AppLoading />, 
});

export default function HomeClient() {
  const [apps, setApps] = useState<MiniApp[]>(miniAppsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedData = async () => {
      setIsLoading(true);
      try {
        const appsRes = await fetch('/api/apps/approved');

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          const existingUrls = new Set(miniAppsData.map(app => app.url));
          const newApps = (appsData.apps || []).filter((app: MiniApp) => !existingUrls.has(app.url));
          setApps(prev => [...prev, ...newApps]);
        }
      } catch (error) {
        console.error("Failed to fetch community apps", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedData();
  }, []);

  return <ThemedFeed title={APP_NAME} apps={apps} isLoading={isLoading} />;
}
