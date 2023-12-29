<script setup lang="ts">
import {RouterView } from 'vue-router'
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAKuzb1iWc4F9fm0j7ZFxv8KYaPAt-SpVQ",
  authDomain: "family-dashboard-78ade.firebaseapp.com",
  projectId: "family-dashboard-78ade",
  storageBucket: "family-dashboard-78ade.appspot.com",
  messagingSenderId: "203738565993",
  appId: "1:203738565993:web:08b8373a39fa08758581f8",
  measurementId: "G-J11YSVF4PM"
};

initializeApp(firebaseConfig);

</script>

<template>
  <main :class="{ ['pi-400x300']: true }">
    <RouterView />
  </main>
</template>

<style scoped>
.pi-400x300 {
  width: 400px;
  height: 300px;
}
</style>
