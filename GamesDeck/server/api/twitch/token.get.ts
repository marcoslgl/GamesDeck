interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export default defineEventHandler(async (event) => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing Twitch credentials in environment variables",
    });
  }

  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return {
      accessToken: tokenCache.accessToken,
    };
  }

  try {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }).toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Twitch OAuth error: ${response.status} - ${errorData}`);
    }

    const data = (await response.json()) as {
      access_token: string;
      expires_in: number;
    };

    const expiresInMs = (data.expires_in - 300) * 1000;
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + expiresInMs,
    };

    return {
      accessToken: data.access_token,
    };
  } catch (error) {
    console.error("Error obtaining Twitch token:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to obtain Twitch token",
    });
  }
});
