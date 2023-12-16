<script setup lang="ts">
import TodayWidget from './TodayWidget.vue';
</script>

<template>
  <main class="grid">
    <TodayWidget />
    <div>
      Widget 2
    </div>
    <div>
      Widget 3
    </div>
  </main>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
</style>