<script setup lang="ts">
defineProps<{
  aspectRatio?: string;
  lines?: number;
}>();
</script>

<template>
  <div class="group cursor-pointer flex flex-col animate-pulse">
    <div
      class="flex-shrink-0 overflow-hidden rounded bg-bgTertiary mb-2"
      :style="{ aspectRatio: aspectRatio || '16 / 9' }"
    />
    <div class="flex flex-col gap-1 flex-1">
      <div
        v-for="i in lines || 2"
        :key="i"
        class="h-3 bg-bgTertiary rounded"
        :style="{ width: i === 1 ? '80%' : '60%' }"
      />
    </div>
  </div>
</template>
