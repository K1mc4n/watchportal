// src/lib/neynar.ts

export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY as string;

export const NEYNAR_BASE_URL = "https://api.neynar.com/v2";

if (!NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is missing in environment variables");
}export async function sendNeynarMiniAppNotification({
  fid,
  title,
  body,
}: {
  fid: number;
  title: string;
  body: string;
}): Promise<SendMiniAppNotificationResult> {
  try {
    const client = getNeynarClient();
    const targetFids = [fid];
    const notification = {
      title,
      body,
      target_url: APP_URL,
    };

    const result = await client.publishFrameNotifications({
      targetFids,
      notification,
    });

    if (result.notification_deliveries.length > 0) {
      return { state: "success" };
    } else if (result.notification_deliveries.length === 0) {
      return { state: "no_token" };
    } else {
      return { state: "error", error: result || "Unknown error" };
    }
  } catch (error) {
    return { state: "error", error };
  }
}
