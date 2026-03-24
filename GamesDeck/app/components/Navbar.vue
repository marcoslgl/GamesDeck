<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
const showSearchDropdown = ref(false);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("Searching for:", searchQuery.value);
    // Aquí puedes agregar la lógica de búsqueda
    showSearchDropdown.value = false;
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};

const toggleSearchDropdown = () => {
  showSearchDropdown.value = !showSearchDropdown.value;
};
</script>

<template>
  <header class="sticky top-0 z-40 bg-bgSecondary overflow-hidden">
    <nav class="px-4 py-2 flex justify-between items-center gap-3" role="navigation" aria-label="Navegación principal">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="text-xl font-bold">GamesDeck</NuxtLink>
        <div class="bg-bgSecondary p-2 rounded-full hover:bg-bgTertiary transition-colors cursor-pointer">
          <img src="/icons/dots.svg" alt="Menu" class="w-4 h-4" />
        </div>
      </div>

      <div class="flex-1 justify-center hidden md:flex">
        <div
          class="border border-main rounded-l-md px-3 py-2 flex items-center gap-2 hover:bg-opacity-80 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary w-full relative max-w-sm"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="bg-transparent outline-none text-sm text-main placeholder-secondary flex-1"
            @keydown="handleKeyDown"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 hover:text-main transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <button
          :disabled="!searchQuery.trim()"
          @click="handleSearch"
          class="bg-bgTertiary rounded-r-md px-2 h-10 border-l-0 flex items-center justify-center disabled:cursor-not-allowed flex-shrink-0"
        >
          <img src="/icons/search.svg" alt="Search" class="w-4 h-4" />
        </button>
      </div>

      <div class="flex items-center space-x-3 relative">
        <div class="relative">
          <button
            @click="toggleSearchDropdown"
            class="bg-bgSecondary w-10 h-10 rounded-full hover:bg-bgTertiary transition-colors cursor-pointer flex items-center justify-center md:hidden"
          >
            <img src="/icons/search.svg" alt="Search" class="w-4 h-4" />
          </button>

          <div v-if="showSearchDropdown" class="absolute top-12 right-0 z-50 md:hidden flex">
            <div
              class="border border-main rounded-l-md px-3 py-2 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary w-48 relative focus-ring-3sides bg-bgSecondary"
            >
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="bg-transparent outline-none text-sm text-main placeholder-secondary flex-1"
                @keydown="handleKeyDown"
                autofocus
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-12 top-1/2 -translate-y-1/2 hover:text-main transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <button
              :disabled="!searchQuery.trim()"
              @click="handleSearch"
              class="bg-bgTertiary opacity-70 rounded-r-md px-2 h-10 border-l-0 flex items-center justify-center disabled:cursor-not-allowed flex-shrink-0"
            >
              <img src="/icons/search.svg" alt="Search" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          class="bg-bgSecondary w-10 h-10 rounded-full hover:bg-bgTertiary transition-colors cursor-pointer flex items-center justify-center"
        >
          <img src="/icons/crown.svg" alt="info" class="w-4 h-4" />
        </div>
        <NuxtLink
          to="/"
          class="bg-bgTertiary py-1 px-3 rounded-full hover:bg-secondary transition-all whitespace-nowrap flex-shrink-0"
          >Log In</NuxtLink
        >
        <NuxtLink
          to="/"
          class="bg-primary py-1 px-3 rounded-full hover:opacity-70 transition-opacity whitespace-nowrap flex-shrink-0"
          >Sign Up</NuxtLink
        >
        <div
          class="bg-bgSecondary w-10 h-10 rounded-full hover:bg-bgTertiary transition-colors cursor-pointer flex items-center justify-center"
        >
          <img src="/icons/user.svg" alt="Menu" class="w-4 h-4" />
        </div>
      </div>
    </nav>
  </header>
</template>
