import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mnemonicToAccount } from 'viem/accounts';
import {
  APP_BUTTON_TEXT,
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_IMAGE_URL,
  APP_PRIMARY_CATEGORY,
  APP_SPLASH_BACKGROUND_COLOR,
  APP_TAGS,
  APP_URL,
  APP_WEBHOOK_URL,
  APP_SPLASH_URL,
} from './constants';

interface MiniAppMetadata {
  version: string;
  name: string;
  iconUrl: string;
  homeUrl: string;
  imageUrl?: string;
  buttonTitle?: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
  webhookUrl?: string;
  description?: string;
  primaryCategory?: string;
  tags?: string[];
}

interface MiniAppManifest {
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  frame: MiniAppMetadata;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSecretEnvVars() {
  const seedPhrase = process.env.SEED_PHRASE;
  const fid = process.env.FID;

  if (!seedPhrase || !fid) {
    return null;
  }

  return { seedPhrase, fid };
}

/* ===============================
   FRAME METADATA UNTUK EMBED
   =============================== */
export function getMiniAppEmbedMetadata() {
  return {
    frame: {
      version: "1",
      name: "Watchcoin",
      iconUrl: "https://watchportal.vercel.app/icon.png",
      homeUrl: "https://watchportal.vercel.app",
      imageUrl: "https://watchportal.vercel.app/og-image.png",
      buttonTitle: "Open Watchcoin",
      splashImageUrl: "https://watchportal.vercel.app/splash.png",
      splashBackgroundColor: "#111111",
      tags: ["watchcoin", "crypto", "farcaster", "miniapp"],
      primaryCategory: "social",
      ogTitle: "Watchcoin",
      ogImageUrl: "https://watchportal.vercel.app/og-image.png",
    },
  };
}

/* ===============================
   FARCASTER MANIFEST SIGNED
   =============================== */
export async function getFarcasterMetadata(): Promise<MiniAppManifest> {
  if (process.env.MINI_APP_METADATA) {
    try {
      const metadata = JSON.parse(process.env.MINI_APP_METADATA);
      console.log('Using pre-signed mini app metadata from environment');
      return metadata;
    } catch (error) {
      console.warn('Failed to parse MINI_APP_METADATA from environment:', error);
    }
  }

  if (!APP_URL) {
    throw new Error('NEXT_PUBLIC_URL not configured');
  }

  const domain = new URL(APP_URL).hostname;
  console.log('Using domain for manifest:', domain);

  const secretEnvVars = getSecretEnvVars();
  if (!secretEnvVars) {
    console.warn('No seed phrase or FID found -- generating unsigned metadata');
  }

  let accountAssociation;
  if (secretEnvVars) {
    const account = mnemonicToAccount(secretEnvVars.seedPhrase);
    const custodyAddress = account.address;

    const header = {
      fid: parseInt(secretEnvVars.fid),
      type: 'custody',
      key: custodyAddress,
    };
    const encodedHeader = Buffer.from(JSON.stringify(header), 'utf-8').toString('base64');

    const payload = { domain };
    const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64url');

    const signature = await account.signMessage({
      message: `${encodedHeader}.${encodedPayload}`,
    });
    const encodedSignature = Buffer.from(signature, 'utf-8').toString('base64url');

    accountAssociation = {
      header: encodedHeader,
      payload: encodedPayload,
      signature: encodedSignature,
    };
  }

  return {
    accountAssociation,
    frame: {
      version: "1",
      name: APP_NAME ?? "Watchcoin",
      iconUrl: APP_ICON_URL ?? "https://watchportal.vercel.app/icon.png",
      homeUrl: APP_URL,
      imageUrl: APP_OG_IMAGE_URL ?? "https://watchportal.vercel.app/og-image.png",
      buttonTitle: APP_BUTTON_TEXT ?? "Open Watchcoin",
      splashImageUrl: APP_SPLASH_URL ?? "https://watchportal.vercel.app/splash.png",
      splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR ?? "#111111",
      webhookUrl: APP_WEBHOOK_URL,
      description: APP_DESCRIPTION ?? "Watchcoin Mini App",
      primaryCategory: APP_PRIMARY_CATEGORY ?? "social",
      tags: APP_TAGS ?? ["watchcoin", "crypto", "farcaster"],
    },
  };
}
