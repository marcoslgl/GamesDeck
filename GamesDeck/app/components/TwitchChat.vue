<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface Props {
  channelName: string;
  isOpen: boolean;
  onToggle: () => void;
}

const props = defineProps<Props>();

const CHAT_URL_BASE = "https://www.twitch.tv/embed";
const hostname = ref("");

const chatIframeUrl = computed(() => {
  if (!props.channelName || !hostname.value) return "";
  return `${CHAT_URL_BASE}/${props.channelName}/chat?parent=${hostname.value}&darkpixel=on`;
});

onMounted(() => {
  hostname.value = window.location.hostname;
});
</script>

<template>
  <button
    v-if="!isOpen"
    @click="onToggle"
    class="fixed top-16 right-0 z-50 p-1 hover:opacity-70 rounded-full transition-colors"
    :aria-label="'Open chat'"
  >
    <img src="/icons/arrow.svg" alt="Open chat" class="w-5 h-5" />
  </button>

  <aside
    :class="[
      'bg-bgTertiary border-l border-secondary flex flex-col w-96 transition-all duration-300',
      'lg:static lg:h-[calc(100vh-3.5rem)]',
      'max-lg:fixed max-lg:top-14 max-lg:right-0 max-lg:h-[calc(100vh-3.5rem)] max-lg:z-40',
      { 'max-lg:translate-x-full': !isOpen },
      { hidden: !isOpen },
    ]"
  >
    <div class="flex items-center justify-between p-2 border-b border-secondary flex-shrink-0">
      <button
        @click="onToggle"
        class="p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0"
        :aria-label="'Toggle chat'"
      >
        <img src="/icons/arrow.svg" alt="Toggle chat" class="w-5 h-5 rotate-180" />
      </button>
      <h3 class="text-sm font-bold text-center uppercase">Stream Chat</h3>
    </div>

    <div class="flex-1 overflow-hidden">
      <iframe
        :key="`chat-${channelName}`"
        :src="chatIframeUrl"
        width="100%"
        height="100%"
        style="border: none"
        allow="autoplay"
        allowfullscreen
        :title="`Chat for ${channelName}`"
      ></iframe>
    </div>
  </aside>
</template>
