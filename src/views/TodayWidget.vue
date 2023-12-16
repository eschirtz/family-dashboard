<template>
  <div>
    <h1>Today is {{ day }}</h1>
    <h2>{{ time }}</h2>
  </div>
</template>

<script lang="ts" setup>
  function getCurrentDay() {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }

  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes}${period}`;
  }

  const day = getCurrentDay();
  const time = getCurrentTime();
</script>

<style scoped>

</style>
