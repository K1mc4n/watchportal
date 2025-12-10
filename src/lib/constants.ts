export const APP_URL = process.env.NEXT_PUBLIC_URL!;
export const APP_NAME = process.env.NEXT_PUBLIC_MINI_APP_NAME;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_MINI_APP_DESCRIPTION;
export const APP_PRIMARY_CATEGORY = process.env.NEXT_PUBLIC_MINI_APP_PRIMARY_CATEGORY;
export const APP_TAGS = process.env.NEXT_PUBLIC_MINI_APP_TAGS?.split(',');
export const APP_ICON_URL = `${APP_URL}/icon.png`;
export const APP_OG_IMAGE_URL = `${APP_URL}/og-image.png`;
export const APP_SPLASH_URL = `${APP_URL}/splash.png`;
export const APP_SPLASH_BACKGROUND_COLOR = "#111111";
export const APP_BUTTON_TEXT = process.env.NEXT_PUBLIC_MINI_APP_BUTTON_TEXT;
export const APP_WEBHOOK_URL = process.env.NEYNAR_API_KEY && process.env.NEYNAR_CLIENT_ID 
    ? `https://api.neynar.com/f/app/${process.env.NEYNAR_CLIENT_ID}/event`
    : `${APP_URL}/api/webhook`;
export const USE_WALLET = process.env.NEXT_PUBLIC_USE_WALLET === 'true';

// Farcaster Frame Configuration
export const FARCASTER_CONFIG = {
  accountAssociation: {
    header: process.env.FARCASTER_ACCOUNT_ASSOCIATION_HEADER,
    payload: process.env.FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD,
    signature: process.env.FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE,
  },
  frame: {
    version: "1",
    name: APP_NAME,
    iconUrl: APP_ICON_URL,
    homeUrl: APP_URL,
    imageUrl: APP_OG_IMAGE_URL,
    buttonTitle: APP_BUTTON_TEXT || "Launch Portal",
    splashImageUrl: APP_SPLASH_URL,
    splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
    webhookUrl: APP_WEBHOOK_URL,
  },
  baseBuilder: {
    allowedAddresses: process.env.BASE_BUILDER_ALLOWED_ADDRESSES?.split(',') || [],
  },
};
