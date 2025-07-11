// src/components/HomeClient.tsx
"use client";

import dynamic from 'next/dynamic';
import AppLoading from '~/components/AppLoading';
import { APP_NAME } from '~/lib/constants';

// Komponen <Demo> diimpor secara dinamis di sini, di dalam sebuah Client Component.
const Demo = dynamic(() => import('~/components/Demo'), {
  ssr: false,
  loading: () => <AppLoading />, 
});

// Komponen ini hanyalah sebuah wrapper yang merender <Demo>.
export default function HomeClient() {
  return <Demo title={APP_NAME} />;
}
