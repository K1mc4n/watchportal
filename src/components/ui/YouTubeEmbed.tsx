// Lokasi file: src/components/ui/YouTubeEmbed.tsx
"use client";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export const YouTubeEmbed = ({ videoId, title = "YouTube video player" }: YouTubeEmbedProps) => {
  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-neutral-800 shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 h-full w-full"
        ></iframe>
      </div>
    </div>
  );
};
