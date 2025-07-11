import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Izinkan Next.js untuk memuat gambar dari domain-domain ini.
    // Ini sangat penting untuk menampilkan foto profil Farcaster.
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'imagedelivery.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      // Anda bisa menambahkan domain lain jika diperlukan di sini
    ],
  },
  /* config options here */
};

export default nextConfig;
