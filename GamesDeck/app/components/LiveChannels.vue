<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();
const showAll = ref(false);
const gridContainer = ref<HTMLElement | null>(null);
const columnsInRow = ref(0);
const isReady = ref(false);

const displayedStreams = computed(() => {
  return showAll.value ? mainStore.liveChannels : mainStore.liveChannels.slice(0, columnsInRow.value);
});

onMounted(async () => {
  if (!gridContainer.value) return;

  const calculateColumns = () => {
    const gridElement = gridContainer.value?.querySelector("[data-grid]") as HTMLElement;
    if (!gridElement) return;

    const gridStyle = window.getComputedStyle(gridElement);
    const columnCount = gridStyle.gridTemplateColumns.split(" ").length;
    columnsInRow.value = columnCount;
    isReady.value = true;
  };

  await nextTick();
  calculateColumns();

  const resizeObserver = new ResizeObserver(calculateColumns);
  resizeObserver.observe(gridContainer.value);

  onBeforeUnmount(() => {
    resizeObserver.disconnect();
  });
});
</script>

<template>
  <section ref="gridContainer" class="w-full" aria-label="Live channels">
    <h2 class="text-lg font-bold pl-6 pt-6 pb-4">
      <span class="text-primary">Live channels </span>we think you'll like
    </h2>

    <div data-grid class="px-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="stream in displayedStreams"
        :key="stream.id"
        class="group cursor-pointer flex flex-col"
        role="button"
        tabindex="0"
        @click="$emit('select', stream)"
        @keydown.enter="$emit('select', stream)"
        @keydown.space="$emit('select', stream)"
      >
        <div
          class="mb-3 flex-shrink-0 aspect-video overflow-hidden transition-all hover:translate-x-1 hover:-translate-y-1 hover:border-l-[6px] hover:border-b-[6px] hover:border-primary rounded"
        >
          <img
            :src="stream.thumbnail"
            :alt="`${stream.title} - ${stream.streamer} streaming ${stream.category}`"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex gap-3">
          <img
            :src="stream.streamerAvatar || '/icon.svg'"
            :alt="`${stream.streamer} avatar`"
            class="w-9 h-9 object-cover flex-shrink-0 rounded-full"
          />

          <div class="flex-1 min-w-0 flex flex-col gap-0.5">
            <h3 class="text-sm font-semibold truncate hover:text-primary">
              {{ stream.title }}
            </h3>

            <p class="text-sm opacity-70 truncate">{{ stream.streamer }}</p>

            <p class="text-sm pb-1 opacity-70 truncate hover:text-primary">{{ stream.category }}</p>

            <div v-if="stream.tags" class="flex gap-1 flex-nowrap overflow-hidden" role="list" aria-label="Stream tags">
              <span
                v-for="tag in stream.tags"
                :key="tag"
                role="listitem"
                class="text-xs bg-bgTertiary px-2 py-0.5 rounded-full flex-shrink-0 hover:bg-secondary transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!showAll && mainStore.liveChannels.length > columnsInRow"
      class="flex items-center justify-center gap-4 py-6"
    >
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
      <button
        @click="showAll = true"
        aria-expanded="false"
        aria-label="Show more live channels"
        class="text-primary hover:text-white hover:bg-bgTertiary p-2 rounded-full transition-colors text-sm font-medium whitespace-nowrap"
      >
        Show more
      </button>
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
    </div>

    <div v-if="showAll" class="flex items-center justify-center gap-4 py-6">
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
      <button
        @click="showAll = false"
        aria-expanded="true"
        aria-label="Show less live channels"
        class="text-primary hover:text-white hover:bg-bgTertiary p-2 rounded-full transition-colors text-sm font-medium whitespace-nowrap"
      >
        Show less
      </button>
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
    </div>
  </section>
</template>
