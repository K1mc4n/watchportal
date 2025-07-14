// Lokasi file: tailwind.config.ts

import type { Config } from "tailwindcss";

export default {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
        'gold': '#E6B325',
        // --- TAMBAHKAN WARNA INI ---
        'neon-pink': '#f000b8',
        'brand': {
            'light': '#F0C43E',
            'dark': '#C89B1C'
        },
        'neutral': {
          '50': '#f8f8f8',
          '100': '#e5e5e5',
          '200': '#cccccc',
          '300': '#a1a1a1',
          '400': '#8a8a8a',
          '500': '#6b6b6b',
          '600': '#525252',
          '700': '#3a3a3a',
          '800': '#1c1c1c',
          '900': '#121212',
          '950': '#0a0a0a',
        },
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      // --- TAMBAHKAN BAGIAN INI UNTUK EFEK GLOW ---
      boxShadow: {
        'neon-pink': '0 0 5px theme(colors.neon-pink), 0 0 10px theme(colors.neon-pink / 0.8), 0 0 15px theme(colors.neon-pink / 0.6)',
      },
      // ------------------------------------------
      keyframes: {
        "shine-effect": {
          "0%": { transform: "translateX(-100%) translateY(-100%) rotate(30deg)" },
          "100%": { transform: "translateX(100%) translateY(100%) rotate(30deg)" },
        },
      },
      animation: {
        "shine": "shine-effect 1s forwards",
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
