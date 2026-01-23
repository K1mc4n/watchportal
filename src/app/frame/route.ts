export async function GET() {
  const imageUrl = "https://watchportal.vercel.app/og.png";

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />

    <meta property="fc:frame:button:1" content="Open Watchcoin" />
    <meta property="fc:frame:post_url" content="https://watchportal.vercel.app/frame/action" />

    <meta property="og:title" content="Watchcoin Portal" />
    <meta property="og:description" content="Your portal to crypto news & onchain data" />
  </head>
  <body></body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
