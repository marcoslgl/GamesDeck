export interface Stream {
  id: string;
  title: string;
  thumbnail_url: string;
  user_name: string;
  user_id: string;
  viewer_count: number;
  game_name?: string;
  started_at?: string;
  profile_image_url?: string;
  description?: string;
}

interface StreamsResponse {
  streams: Stream[];
  count: number;
}

export const useTwitch = () => {
  const streams = ref<Stream[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchStreams = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<StreamsResponse>("/api/twitch/streams");
      streams.value = data.streams || [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch streams";
      console.error("Error fetching Twitch streams:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    streams: readonly(streams),
    loading: readonly(loading),
    error: readonly(error),
    fetchStreams,
  };
};
