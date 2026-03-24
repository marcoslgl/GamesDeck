<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTwitch } from "../composables/useTwitch";

const { streams, loading, fetchStreams } = useTwitch();
const isCollapsedState = ref(false);

const toggleSidebar = () => {
  isCollapsedState.value = !isCollapsedState.value;
};

const isCollapsed = computed(() => isCollapsedState.value);

const recommendedStreams = computed(() => streams.value.slice(0, 8));

onMounted(() => {
  fetchStreams();
});
</script>

<template>
  <aside
    :class="[
      'bg-bgTertiary border-r border-bgTertiary transition-all duration-300 overflow-x-hidden flex flex-col',
      'w-14',
      { 'lg:w-64': !isCollapsed },
    ]"
  >
    <div class="p-4 flex items-center justify-end">
      <div v-if="!isCollapsed" class="text-sm font-bold uppercase hidden lg:block flex-1">Recommended channels</div>
      <button
        @click="toggleSidebar"
        class="p-2 hover:bg-secondary rounded-full transition-colors hidden lg:block flex-shrink-0"
      >
        <img src="/icons/arrow.svg" alt="Toggle" class="w-5 h-5" :class="{ 'rotate-180': isCollapsed }" />
      </button>
    </div>
    <ul class="space-y-3" role="list" aria-label="Canales recomendados">
      <li v-for="streamer in recommendedStreams" :key="streamer.id">
        <NuxtLink
          :to="`/${streamer.user_name}`"
          class="flex items-center gap-3 p-2 cursor-pointer relative group w-full"
          :class="{ 'justify-center': isCollapsed }"
        >
          <div class="flex-shrink-0">
            <img
              :src="streamer.profile_image_url"
              :alt="streamer.user_name"
              class="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div v-if="!isCollapsed" class="flex-1 min-w-0">
            <p class="text-md opacity-70 truncate">{{ streamer.user_name }}</p>
            <p class="text-sm opacity-70 truncate">{{ streamer.game_name }}</p>
          </div>
          <div v-if="!isCollapsed" class="flex items-center gap-1 text-xs flex-shrink-0">
            <img src="/icons/active.svg" alt="Live" class="w-2 h-2" />
            <span class="whitespace-nowrap opacity-70">{{ streamer.viewer_count.toLocaleString("es-ES") }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>
