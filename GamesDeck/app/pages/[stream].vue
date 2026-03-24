<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useTwitch } from "../composables/useTwitch";

const TIMER_INTERVAL = 1000;
const STREAM_URL_BASE = "https://player.twitch.tv/";

const route = useRoute();
const streamId = route.params.stream as string;
const { streams, fetchStreams } = useTwitch();

const hostname = ref("");
const streamDuration = ref("00:00:00");
let timerInterval: number | null = null;

const stream = computed(() => {
  return streams.value.find((s) => s.user_name === streamId);
});

const iframeUrl = computed(() => {
  if (!stream.value || !hostname.value) return "";
  return `${STREAM_URL_BASE}?channel=${stream.value.user_name}&parent=${hostname.value}&autoplay=true&muted=true`;
});

onMounted(() => {
  fetchStreams();
  hostname.value = window.location.hostname;
  startStreamTimer();
});

onUnmounted(() => {
  stopStreamTimer();
});

watch(
  () => stream.value?.started_at,
  (startedAt) => {
    if (startedAt) {
      streamDuration.value = calculateStreamDuration(startedAt);
    }
  },
);

const startStreamTimer = () => {
  timerInterval = window.setInterval(() => {
    if (stream.value?.started_at) {
      streamDuration.value = calculateStreamDuration(stream.value.started_at);
    }
  }, TIMER_INTERVAL);
};

const stopStreamTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const formatViewers = (count: number): string => {
  return count.toLocaleString("en-US");
};

const calculateStreamDuration = (startedAt: string): string => {
  const start = new Date(startedAt);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const pad = (num: number): string => String(num).padStart(2, "0");
  return `${hours}:${pad(minutes)}:${pad(seconds)}`;
};
</script>

<template>
  <div class="w-full">
    <article v-if="stream" class="w-full">
      <section class="w-full bg-black flex justify-center">
        <div class="w-full max-w-7xl aspect-video">
          <iframe
            :key="`iframe-${stream.user_name}`"
            :src="iframeUrl"
            width="100%"
            height="100%"
            style="border: none"
            allow="autoplay; fullscreen; encrypted-media"
            allowfullscreen
            :title="`Live stream of ${stream.user_name}`"
          ></iframe>
        </div>
      </section>

      <section class="px-4 py-6">
        <header class="flex items-start gap-6">
          <figure class="flex-shrink-0">
            <img
              :src="stream.profile_image_url"
              :alt="`${stream.user_name} profile picture`"
              class="w-16 h-16 rounded-full object-cover"
            />
            <figcaption class="sr-only">{{ stream.user_name }} profile</figcaption>
          </figure>

          <div class="flex-1">
            <h1 class="text-lg font-semibold mb-2">{{ stream.user_name }}</h1>
            <h2 class="text-base font-bold mb-1">{{ stream.title }}</h2>
            <p class="text-sm text-primary">{{ stream.game_name }}</p>
          </div>

          <aside class="flex flex-col gap-3 flex-shrink-0 items-end">
            <nav class="flex gap-3" aria-label="Stream actions">
              <button
                class="flex items-center bg-primary gap-2 px-3 py-1.5 rounded-full hover:opacity-70 transition-colors"
                aria-label="Follow streamer"
              >
                <img src="/icons/follow.svg" alt="" class="w-4 h-4" />
                Follow
              </button>
              <button
                class="flex items-center bg-bgTertiary gap-2 px-3 py-1.5 rounded-full hover:bg-secondary transition-colors"
                aria-label="Subscribe to streamer"
              >
                <img src="/icons/star.svg" alt="" class="w-4 h-4" />
                Subscribe
                <img src="/icons/down.svg" alt="" class="w-3 h-3" />
              </button>
            </nav>

            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <img src="/icons/redUser.svg" alt="" class="w-5 h-5" aria-hidden="true" />
                <span class="text-md font-semibold text-accent">{{ formatViewers(stream.viewer_count) }}</span>
              </div>
              <time class="text-sm text-text-secondary" :datetime="`PT${streamDuration}S`">
                {{ streamDuration }}
              </time>
              <button class="p-2 rounded-full hover:bg-bgTertiary transition-colors" aria-label="Share stream">
                <img src="/icons/upload.svg" alt="" class="w-5 h-5" aria-hidden="true" />
              </button>
              <button class="p-2 rounded-full hover:bg-bgTertiary transition-colors" aria-label="More options">
                <img src="/icons/dots.svg" alt="" class="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </aside>
        </header>
        <footer class="mt-6">
          <div v-if="stream.description" class="bg-bgTertiary rounded-lg p-4">
            <h2 class="text-lg font-bold mb-4">About {{ stream.user_name }}</h2>
            <p class="text-sm text-text-secondary">{{ stream.description }}</p>
            <div class="w-[80%] border-t border-secondary" aria-hidden="true"></div>
            <p>hola</p>
          </div>
        </footer>
      </section>
    </article>
  </div>
</template>
