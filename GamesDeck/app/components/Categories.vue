<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useMainStore } from "../stores/main";
import { useTwitchCategories } from "../composables/useTwitchCategories";
import CategoryCardSkeleton from "./CategoryCardSkeleton.vue";

const mainStore = useMainStore();
const { categories, loading, fetchCategories } = useTwitchCategories();
const gridContainer = ref<HTMLElement | null>(null);
const columnsInRow = ref(0);

const displayedCategories = computed(() => {
  return categories.value.slice(0, columnsInRow.value);
});

const getThumbnailUrl = (url: string): string => {
  return url.replace("{width}", "264").replace("{height}", "352");
};

const formatViewers = (count: number): string => {
  return Math.round((count || 0) / 1000).toString();
};

onMounted(async () => {
  fetchCategories();

  if (!gridContainer.value) return;

  const calculateColumns = () => {
    const gridElement = gridContainer.value?.querySelector("[data-grid]") as HTMLElement;
    if (!gridElement) return;

    const gridStyle = window.getComputedStyle(gridElement);
    const columnCount = gridStyle.gridTemplateColumns.split(" ").length;
    columnsInRow.value = columnCount;
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
  <section ref="gridContainer" class="w-full pb-3" aria-label="Game categories">
    <h2 class="text-lg font-semibold pl-4 pt-4 pb-3">
      <span class="text-primary">Categories </span>we think you'll like
    </h2>

    <div data-grid class="px-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
      <template v-if="loading">
        <CategoryCardSkeleton v-for="i in 7" :key="`skeleton-${i}`" />
      </template>
      <div
        v-for="category in displayedCategories"
        v-else
        :key="category.id"
        class="group cursor-pointer flex flex-col"
        role="button"
        tabindex="0"
        @click="$emit('select', category)"
        @keydown.enter="$emit('select', category)"
        @keydown.space="$emit('select', category)"
      >
        <div
          class="mb-1 flex-shrink-0 overflow-hidden transition-all hover:translate-x-1 hover:-translate-y-1 hover:border-l-[6px] hover:border-b-[6px] hover:border-primary rounded"
          style="aspect-ratio: 1 / 1.3"
        >
          <img
            :src="getThumbnailUrl(category.box_art_url)"
            :alt="category.name"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex flex-col gap-0.5">
          <h3 class="text-sm font-semibold truncate hover:text-primary">
            {{ category.name }}
          </h3>

          <p class="text-sm opacity-70">{{ formatViewers(category.viewer_count || 0) }}k viewers</p>
        </div>
      </div>
    </div>

    <div class="mt-6 px-4 pb-5">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-8 w-full">
        <div
          v-for="mainCat in mainStore.mainCategories"
          :key="mainCat.id"
          class="group cursor-pointer"
          role="button"
          tabindex="0"
          @click="$emit('select-main', mainCat)"
          @keydown.enter="$emit('select-main', mainCat)"
          @keydown.space="$emit('select-main', mainCat)"
        >
          <div
            class="px-4 rounded-lg transition-all hover:shadow-lg hover:opacity-70 flex items-start justify-between bg-primary h-12 relative overflow-visible"
          >
            <h4 class="text-lg font-bold text-main flex-1 self-center relative z-10 whitespace-normal">
              {{ mainCat.name }}
            </h4>
            <img :src="mainCat.icon" :alt="mainCat.name" class="w-16 h-16 self-center" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
