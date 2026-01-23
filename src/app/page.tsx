import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { SponsorBanner } from "@/components/ui/SponsorBanner";
import { MiniAppCard } from "@/components/ui/MiniAppCard";
import { NewsCard } from "@/components/ui/NewsCard";
import { miniAppsData } from "@/lib/miniAppsData";

/* ================= TYPES ================= */

type Article = {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage: string;
};

/* ================= PAGE ================= */

export default function HomePage() {
  const handleLaunchApp = (app: any) => {
    if (app?.url) {
      window.open(app.url, "_blank");
    }
  };

  const featuredArticle: Article = {
    title: "Base Ecosystem Is Growing Fast 🚀",
    summary:
      "The Base ecosystem continues to expand with new builders, mini apps, and Farcaster integrations going live every week.",
    url: "https://base.org",
    source: "Base",
    publishedAt: new Date().toISOString(),
    urlToImage:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9",
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== SPONSOR ===== */}
      <section className="px-4 mt-6">
        <SponsorBanner
          name="Base"
          logoUrl="https://avatars.githubusercontent.com/u/108554348?s=200&v=4"
          description="The fastest growing Ethereum L2 ecosystem."
          learnMoreLink="https://base.org"
        />
      </section>

      {/* ===== MINI APPS ===== */}
      <section className="px-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Mini Apps</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {miniAppsData.map((app) => (
            <MiniAppCard
              key={app.id}
              app={app}
              onLaunch={handleLaunchApp}
            />
          ))}
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="px-4 mt-10">
        <h2 className="text-xl font-bold mb-4">Latest News</h2>

        <NewsCard article={featuredArticle} />
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </main>
  );
}
