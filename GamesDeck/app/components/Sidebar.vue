<script setup lang="ts">
import { ref, computed } from "vue";

const isCollapsedState = ref(false);

const toggleSidebar = () => {
  isCollapsedState.value = !isCollapsedState.value;
};

const isCollapsed = computed(() => isCollapsedState.value);

const streamers = [
  {
    id: 1,
    name: "xQcOW",
    category: "Just Chatting",
    image: "/github.png",
    viewers: 15200,
  },
  {
    id: 2,
    name: "Sykkuno",
    category: "League of Legends",
    image: "/github.png",
    viewers: 8900,
  },
  {
    id: 3,
    name: "Pokimane",
    category: "Valorant",
    image: "/github.png",
    viewers: 12500,
  },
  {
    id: 4,
    name: "Myth",
    category: "Fortnite",
    image: "/github.png",
    viewers: 5600,
  },
  {
    id: 5,
    name: "Valkyrae",
    category: "Elden Ring",
    image: "/github.png",
    viewers: 7800,
  },
];
</script>

<template>
  <aside
    :class="[
      'bg-bgTertiary border-r border-bgTertiary transition-all duration-300 overflow-y-auto flex flex-col',
      'w-16',
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
    <ul class="space-y-3 px-2">
      <li v-for="streamer in streamers" :key="streamer.id">
        <div
          class="flex items-center gap-3 p-2 cursor-pointer relative group w-full"
          :class="{ 'justify-center': isCollapsed }"
        >
          <div class="flex-shrink-0">
            <img :src="streamer.image" :alt="streamer.name" class="w-10 h-10 rounded-full object-cover" />
          </div>
          <div v-if="!isCollapsed" class="flex-1 min-w-0">
            <p class="text-md opacity-70 truncate">{{ streamer.name }}</p>
            <p class="text-sm opacity-70 truncate">{{ streamer.category }}</p>
          </div>
          <div v-if="!isCollapsed" class="flex items-center gap-1 text-xs flex-shrink-0">
            <img src="/icons/active.svg" alt="Live" class="w-2 h-2" />
            <span class="whitespace-nowrap opacity-70">{{ streamer.viewers.toLocaleString() }}</span>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>
