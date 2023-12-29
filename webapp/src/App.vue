<script setup lang="ts">
import { ref } from 'vue';
import {RouterView } from 'vue-router'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, onSnapshot, where, query, orderBy, limit } from "firebase/firestore";

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

/**
 * A semi-complete interface for 
 * the Linear Issue object. 
 * Fields are added as they are needed 
 * in this front end application. 
 */
interface Issue {
  id: string;
  state: {
    name:  "Backlog" | "Todo" | "In Progress" | "Done";
    type: 'completed' | 'started' | 'unstarted';
  };
  parentId?: string;
}
const issues = ref<Issue[]>([]);

const issuesRef = collection(db, "issues");
// const activeIssues = query(issuesRef, where("state.type", "!=", "completed"));
// const completedIssues = query(issuesRef, where("state.type", "==", "completed"), orderBy("timeCompleted", "desc"), limit(10));

const unsubIssues = onSnapshot(issuesRef, (snap) => {
  // const subissues: { [parentId: string]: { complete: number; incomplete: number }} = {}
  const _issues: Issue[] = [];
  const docs = snap.docs;
  for(let i=0; i < docs.length; i++) {
    const doc = docs[i];
    const issue = { id: doc.id, ...doc.data() } as Issue;
    
    if (issue.parentId) {
      continue;
    }
    _issues.push(issue);
  }
  issues.value = _issues;
  // issues.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});
</script>

<template>
  <ul>
    <li v-for="issue of issues" :key="issue.id" :class="{ 'completed': issue.state.type === 'completed' }">{{ issue.title }}</li>
  </ul>
  <RouterView />
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
