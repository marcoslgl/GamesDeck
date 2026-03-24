interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
}

interface TwitchStream {
  game_id: string;
  viewer_count: number;
}

interface TwitchGamesResponse {
  data: TwitchGame[];
}

interface TwitchStreamsResponse {
  data: TwitchStream[];
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

    const gamesResponse = await fetch("https://api.twitch.tv/helix/games/top?first=30", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientId,
      },
    });

    if (!gamesResponse.ok) {
      const errorData = await gamesResponse.text();
      throw new Error(`Twitch API error: ${gamesResponse.status} - ${errorData}`);
    }

    const gamesData = (await gamesResponse.json()) as TwitchGamesResponse;

    const streamsResponse = await fetch("https://api.twitch.tv/helix/streams?first=100", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientId,
      },
    });

    let viewersByGame: Record<string, number> = {};

    if (streamsResponse.ok) {
      const streamsData = (await streamsResponse.json()) as TwitchStreamsResponse;
      streamsData.data.forEach((stream) => {
        if (stream.game_id) {
          viewersByGame[stream.game_id] = (viewersByGame[stream.game_id] || 0) + stream.viewer_count;
        }
      });
    }

    const categories = gamesData.data.map((game) => ({
      id: game.id,
      name: game.name,
      box_art_url: game.box_art_url,
      viewer_count: viewersByGame[game.id] || 0,
    }));

    return {
      categories,
      count: categories.length,
    };
  } catch (error) {
    console.error("Error fetching Twitch categories:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch Twitch categories",
    });
  }
});
