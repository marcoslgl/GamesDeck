<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useMainStore } from "../stores/main";
import { useTwitch } from "../composables/useTwitch";
import StreamCard from "./StreamCard.vue";

const mainStore = useMainStore();
const { streams, loading, fetchStreams } = useTwitch();
const showAll = ref(false);
const gridContainer = ref<HTMLElement | null>(null);
const columnsInRow = ref(0);
const isReady = ref(false);

const displayedStreams = computed(() => {
  return showAll.value ? streams.value : streams.value.slice(0, columnsInRow.value);
});

onMounted(async () => {
  fetchStreams();

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
      <button v-for="stream in displayedStreams" :key="stream.id" class="text-left" @click="$emit('select', stream)">
        <StreamCard :stream="stream" />
      </button>
    </div>

    <div v-if="!showAll && streams.length > columnsInRow" class="flex items-center justify-center gap-4 py-6">
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
      <button
        @click="showAll = true"
        aria-expanded="false"
        aria-label="Show more live channels"
        class="flex items-center gap-2 text-primary hover:text-white hover:bg-bgTertiary p-2 rounded-full transition-colors text-sm font-medium whitespace-nowrap"
      >
        Show more
        <img src="/icons/down.svg" alt="" class="w-4 h-4" />
      </button>
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
    </div>

    <div v-if="showAll" class="flex items-center justify-center gap-4 py-6">
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
      <button
        @click="showAll = false"
        aria-expanded="true"
        aria-label="Show less live channels"
        class="flex items-center gap-2 text-primary hover:text-white hover:bg-bgTertiary p-2 rounded-full transition-colors text-sm font-medium whitespace-nowrap"
      >
        Show less
        <img src="/icons/down.svg" alt="" class="w-4 h-4 rotate-180" />
      </button>
      <div class="w-[40%] border-t border-bgTertiary" aria-hidden="true"></div>
    </div>
  </section>
</template>
