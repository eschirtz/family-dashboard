<template>
  <div class="container px-2 d-flex align-center">
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    label: String,
  });
</script>

<style scoped>
.container {
  height: 28px;
  background: white;
  font-size: 12px;
}

@media (prefers-color-scheme: dark) {
  .container {
    background: black;
    color: white;
  }  
}
</style>