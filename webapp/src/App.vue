<script setup lang="ts">
import { ref } from 'vue';
import {RouterView } from 'vue-router'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, onSnapshot, where, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKuzb1iWc4F9fm0j7ZFxv8KYaPAt-SpVQ",
  authDomain: "family-dashboard-78ade.firebaseapp.com",
  projectId: "family-dashboard-78ade",
  storageBucket: "family-dashboard-78ade.appspot.com",
  messagingSenderId: "203738565993",
  appId: "1:203738565993:web:08b8373a39fa08758581f8",
  measurementId: "G-J11YSVF4PM"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const issues = ref<any[]>([]);

const issuesRef = collection(db, "issues");
const activeIssues = query(issuesRef, where("state.type", "!=", "completed"));

const unsub = onSnapshot(activeIssues, (snap) => {
  issues.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

</script>

<template>
  <ul>
    <li v-for="issue of issues" :key="issue.id">{{ issue.title }}</li>
  </ul>
  <RouterView />
</template>

<style scoped>
</style>
