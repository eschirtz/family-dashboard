<template>
  <div class="d-flex flex-column container">
    <div class="d-flex align-center" style="height: 100%; overflow-x: hidden;">
      <div class="date d-flex align-center justify-center ml-3 mr-4 no-shrink" :class="{ 'filled': isWorkday }">
        <b>{{ date }}</b>
      </div>
      <div v-for="(event, i) in events" :key="i" class="mr-4 no-shrink">
        <h6 class="pb-1 my-0">
          {{ event.title }}
        </h6>
        <p class="my-0">
          <b>{{ event.subtitle  }}</b>
        </p>      
      </div>
    </div>
    <div class="border-bottom mt-2"></div>
  </div>
</template>

<script lang="ts" setup>
export type Event = {
  title: string; 
  subtitle: string; 
}
  defineProps({
    date: Number,
    events: Array as () => Event[],
    isWorkday: Boolean
  });
</script>

<style scoped>
.container {
  height: 39px;
  font-size: 12px;
  line-height: normal;
}

h6 {
  font-size: 12px;
}

.border-bottom {
  border-bottom: 1px solid black;
  width: 100%;
}

.date {
  width: 26px;
  height: 26px;
  text-align: center;
  border-radius: 100%;
}

.date.filled {
  background-color: black;
  color: white;
}

.no-shrink {
  flex-shrink: 0;
}
</style>