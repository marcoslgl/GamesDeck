<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
