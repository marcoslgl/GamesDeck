interface TwitchStream {
  id: string;
  user_id: string;
  user_name: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
  profile_image_url?: string;
}

interface TwitchApiResponse {
  data: TwitchStream[];
  pagination: {
    cursor: string;
  };
}

interface TwitchUser {
  id: string;
  profile_image_url: string;
}

interface TwitchUsersResponse {
  data: TwitchUser[];
}

interface TokenResponse {
  accessToken: string;
}

export default defineEventHandler(async () => {
  try {
    const tokenResponse = await $fetch<TokenResponse>("/api/twitch/token", {
      baseURL: "http://localhost:3000",
    });

    if (!tokenResponse?.accessToken) {
      throw new Error("Failed to obtain access token");
    }

    const accessToken = tokenResponse.accessToken;
    const clientId = process.env.TWITCH_CLIENT_ID;

    if (!clientId) {
      throw new Error("Missing TWITCH_CLIENT_ID in environment");
    }

    const twitchResponse = await fetch("https://api.twitch.tv/helix/streams?first=20", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientId,
      },
    });

    if (!twitchResponse.ok) {
      const errorData = await twitchResponse.text();
      throw new Error(`Twitch API error: ${twitchResponse.status} - ${errorData}`);
    }

    const data = (await twitchResponse.json()) as TwitchApiResponse;

    const userIds = data.data.map((stream) => stream.user_id).join("&id=");

    let userAvatars: Record<string, string> = {};

    if (userIds) {
      const usersResponse = await fetch(`https://api.twitch.tv/helix/users?id=${userIds}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-ID": clientId,
        },
      });

      if (usersResponse.ok) {
        const usersData = (await usersResponse.json()) as TwitchUsersResponse;
        usersData.data.forEach((user) => {
          userAvatars[user.id] = user.profile_image_url;
        });
      }
    }

    const streams = data.data.map((stream) => ({
      id: stream.id,
      title: stream.title,
      thumbnail_url: stream.thumbnail_url,
      user_name: stream.user_name,
      user_id: stream.user_id,
      viewer_count: stream.viewer_count,
      game_name: stream.game_name,
      started_at: stream.started_at,
      profile_image_url: userAvatars[stream.user_id] || "/icon.svg",
    }));

    return {
      streams,
      count: streams.length,
    };
  } catch (error) {
    console.error("Error fetching Twitch streams:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch Twitch streams",
    });
  }
});
