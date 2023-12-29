<script setup lang="ts">
  import { ref } from 'vue';
  import { getFirestore, collection, onSnapshot } from "firebase/firestore";
  
  const db = getFirestore();
  
  /**
   * A semi-complete interface for 
   * the Linear Issue object. 
   * Fields are added as they are needed 
   * in this front end application. 
   */
  interface Issue {
    id: string;
    title: string;
    state: {
      name:  "Backlog" | "Todo" | "In Progress" | "Done";
      type: 'completed' | 'started' | 'unstarted';
    };
    parentId?: string;
  }

  const issues = ref<Issue[]>([]);
  const issuesRef = collection(db, "issues");

  const unsubIssues = onSnapshot(issuesRef, (snap) => {
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
  });
</script>

<template>
  <ul>
    <li v-for="issue of issues" :key="issue.id" :class="{ 'completed': issue.state.type === 'completed' }">{{ issue.title }}</li>
  </ul>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
