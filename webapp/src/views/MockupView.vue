<template>
  <div class="grid">
      <LinearTasks />
      <CalendarView />
  </div>
</template>

<script lang="ts" setup>
import LinearTasks from './LinearTasks.vue';
import CalendarView from './CalendarView.vue';
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0;
  width: 400px;
  height: 300px;
  /* width: 3.66in; */
  /* height: 2.06in; */
  overflow: hidden;
}

.grid > * {
  min-width: 0;
}
</style>