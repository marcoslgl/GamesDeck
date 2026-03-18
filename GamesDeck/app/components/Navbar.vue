<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("Searching for:", searchQuery.value);
    // Aquí puedes agregar la lógica de búsqueda
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};
</script>

<template>
  <nav class="bg-bgSecondary px-4 py-2 flex justify-between items-center gap-6">
    <div class="flex items-center gap-2">
      <div class="text-xl font-bold">GamesDeck</div>
      <div class="bg-bgSecondary rounded-full p-2 hover:bg-bgTertiary transition-colors cursor-pointer">
        <img src="/icons/dots.svg" alt="Menu" class="w-4 h-4" />
      </div>
    </div>

    <div class="flex-1 px-3 flex justify-center hidden md:flex">
      <div
        class="border border-bgTertiary rounded-l-md px-3 py-2 flex items-center gap-2 hover:bg-opacity-80 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary w-full relative max-w-sm"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="bg-transparent outline-none text-sm text-white placeholder-gray-400 flex-1"
          @keydown="handleKeyDown"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition-colors text-xl leading-none"
        >
          ✕
        </button>
      </div>
      <button
        :disabled="!searchQuery.trim()"
        @click="handleSearch"
        class="bg-bgTertiary opacity-70 rounded-r-md px-2 border-l-0 hover:bg-opacity-80 transition-all bg-opacity-0 hover:bg-bgTertiary flex items-center justify-center disabled:cursor-not-allowed"
      >
        <img src="/icons/search.svg" alt="Search" class="w-4 h-4" />
      </button>
    </div>

    <div class="flex items-center space-x-4">
      <div class="bg-bgSecondary rounded-full p-2 hover:bg-bgTertiary transition-colors cursor-pointer">
        <img src="/icons/crown.svg" alt="info" class="w-4 h-4" />
      </div>
      <NuxtLink to="/" class="bg-bgTertiary py-1 px-2 rounded hover:brightness-125 transition-all">Log In</NuxtLink>
      <NuxtLink to="/" class="bg-primary py-1 px-2 rounded hover:opacity-70 transition-opacity">Sign Up</NuxtLink>
      <div class="bg-bgSecondary rounded-full p-2 hover:bg-bgTertiary transition-colors cursor-pointer">
        <img src="/icons/user.svg" alt="Menu" class="w-4 h-4" />
      </div>
    </div>
  </nav>
</template>
