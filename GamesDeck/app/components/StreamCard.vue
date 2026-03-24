<script setup lang="ts">
import type { Stream } from "../composables/useTwitch";

const props = defineProps<{
  stream: Stream & { game_name?: string; started_at?: string };
}>();

const formatViewers = (count: number): string => {
  return count.toLocaleString("es-ES");
};

const getThumbnailUrl = (url: string): string => {
  return url.replace("{width}", "320").replace("{height}", "180");
};
</script>
<template>
  <div class="group cursor-pointer flex flex-col">
    <div
      class="mb-3 flex-shrink-0 aspect-video overflow-hidden transition-all hover:translate-x-1 hover:-translate-y-1 hover:border-l-[6px] hover:border-b-[6px] hover:border-primary rounded"
    >
      <img
        :src="getThumbnailUrl(stream.thumbnail_url)"
        :alt="`${stream.title} - ${stream.user_name}`"
        loading="lazy"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex gap-3">
      <img
        :src="stream.profile_image_url"
        :alt="stream.user_name"
        class="w-9 h-9 object-cover flex-shrink-0 rounded-full"
      />

      <div class="flex-1 min-w-0 flex flex-col gap-0.5">
        <h3 class="text-sm font-semibold truncate hover:text-primary">
          {{ stream.title }}
        </h3>

        <p class="text-sm opacity-70 truncate">{{ stream.user_name }}</p>

        <p class="text-sm pb-1 opacity-70 truncate hover:text-primary">{{ stream.game_name }}</p>

        <div class="flex items-center gap-1 text-xs opacity-70">
          <img src="/icons/active.svg" alt="live" class="w-2 h-2" />
          {{ formatViewers(stream.viewer_count) }} watching
        </div>
      </div>
    </div>
  </div>
</template>
