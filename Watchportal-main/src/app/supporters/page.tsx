// src/app/supporters/page.tsx
"use client";

import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';

export default function SupportersPage() {
  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-gold">Hall of Fame</h1>
          <p className="text-gray-400 my-8">
            This feature is currently under construction. Check back soon!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
