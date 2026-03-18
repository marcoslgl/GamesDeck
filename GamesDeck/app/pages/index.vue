<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const showAll = ref(false);
const gridContainer = ref<HTMLElement | null>(null);
const columnsInRow = ref(4);

const displayedStreams = computed(() => {
  if (showAll.value) return streams;
  return streams.slice(0, columnsInRow.value);
});

onMounted(() => {
  if (!gridContainer.value) return;

  const resizeObserver = new ResizeObserver(() => {
    if (!gridContainer.value) return;

    const gridElement = gridContainer.value.querySelector("[data-grid]") as HTMLElement;
    if (!gridElement) return;

    const gridStyle = window.getComputedStyle(gridElement);
    const gridTemplateColumns = gridStyle.gridTemplateColumns;
    const columnCount = gridTemplateColumns.split(" ").length;

    columnsInRow.value = columnCount;
  });

  resizeObserver.observe(gridContainer.value);

  onBeforeUnmount(() => {
    resizeObserver.disconnect();
  });
});

const streams = [
  {
    id: 5,
    title: "Sesión de debugging en vivo",
    streamer: "Valkyrae",
    streamerAvatar: "/github.png",
    category: "Elden Ring",
    thumbnail: "/ejemplo.png",
    tags: ["Español", "DropsActivados"],
  },
  {
    id: 6,
    title: "Directo competitivo ranked",
    streamer: "Doublelift",
    streamerAvatar: "/github.png",
    category: "League of Legends",
    thumbnail: "/ejemplo.png",
    tags: ["English", "DropsActivados"],
  },
  {
    id: 7,
    title: "Entrevista con creadores",
    streamer: "Tfue",
    streamerAvatar: "/github.png",
    category: "Just Chatting",
    thumbnail: "/ejemplo.png",
    tags: ["English", "DropsActivados"],
  },
  {
    id: 8,
    title: "Competitive Valorant Pro Play",
    streamer: "Sentinels",
    streamerAvatar: "/github.png",
    category: "Valorant",
    thumbnail: "/ejemplo.png",
    tags: ["English", "Torneo"],
  },
  {
    id: 9,
    title: "Speedrun World Record Attempt",
    streamer: "SummoningSalt",
    streamerAvatar: "/github.png",
    category: "Fortnite",
    thumbnail: "/ejemplo.png",
    tags: ["English", "DropsActivados"],
  },
  {
    id: 10,
    title: "Late night gaming session",
    streamer: "Corpse",
    streamerAvatar: "/github.png",
    category: "Just Chatting",
    thumbnail: "/ejemplo.png",
    tags: ["English", "DropsActivados"],
  },
  {
    id: 11,
    title: "Ranked grind hasta master",
    streamer: "NetEase",
    streamerAvatar: "/github.png",
    category: "League of Legends",
    thumbnail: "/ejemplo.png",
    tags: ["Español", "DropsActivados"],
  },
  {
    id: 12,
    title: "Tournament Final Match",
    streamer: "G2 Esports",
    streamerAvatar: "/github.png",
    category: "Valorant",
    thumbnail: "/ejemplo.png",
    tags: ["English", "Torneo"],
  },
  {
    id: 13,
    title: "Ranked grind hasta master",
    streamer: "NetEase",
    streamerAvatar: "/github.png",
    category: "League of Legends",
    thumbnail: "/ejemplo.png",
    tags: ["Español", "DropsActivados"],
  },
  {
    id: 14,
    title: "Tournament Final Match",
    streamer: "G2 Esports",
    streamerAvatar: "/github.png",
    category: "Valorant",
    thumbnail: "/ejemplo.png",
    tags: ["English", "Torneo"],
  },
];
</script>

<template>
  <div ref="gridContainer" class="w-full">
    <div class="text-lg font-bold pl-6 pt-6 pb-4">
      <span class="text-primary">Live channels </span>we think you'll like
    </div>

    <div data-grid class="px-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="stream in displayedStreams" :key="stream.id" class="group cursor-pointer flex flex-col">
        <div
          class="mb-3 flex-shrink-0 aspect-video overflow-hidden transition-all hover:translate-x-1 hover:-translate-y-1 hover:border-l-[6px] hover:border-b-[6px] hover:border-primary"
        >
          <img :src="stream.thumbnail" :alt="stream.title" class="w-full h-full object-cover" />
        </div>

        <div class="flex gap-3">
          <img :src="stream.streamerAvatar" :alt="stream.streamer" class="w-9 h-9 object-cover flex-shrink-0" />

          <div class="flex-1 min-w-0 flex flex-col gap-0.5">
            <p class="text-md font-semibold truncate hover:text-primary">
              {{ stream.title }}
            </p>

            <p class="text-sm opacity-70 truncate">{{ stream.streamer }}</p>

            <p class="text-sm pb-1 opacity-70 truncate hover:text-primary">{{ stream.category }}</p>

            <div class="flex gap-1 flex-nowrap overflow-hidden">
              <span
                v-for="tag in stream.tags"
                :key="tag"
                class="text-xs bg-bgTertiary px-2 py-0.5 rounded-full flex-shrink-0 hover:bg-secondary"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!showAll && streams.length > columnsInRow" class="text-center py-6">
      <button @click="showAll = true" class="text-primary hover:text-white transition-colors text-sm font-medium">
        Show more
      </button>
    </div>

    <div v-if="showAll" class="text-center py-6">
      <button @click="showAll = false" class="text-primary hover:text-white transition-colors text-sm font-medium">
        Show less
      </button>
    </div>
  </div>
</template>
