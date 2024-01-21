<template>
  <div class="container">
  <ul class="px-2 py-2">
    <li v-for="issue of issues" :key="issue.id" :class="{ 'completed': issue.isCompleted }" class="d-flex align-center mb-1">
      <div>{{ issue.isCompleted ? '✓' : '☐' }}</div>
      <span class="truncate">{{ issue.title }}</span>
    </li>
  </ul>
  </div>
</template>

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
    isCompleted: boolean;
    title: string;    
    state: {
      name:  "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled";
      type: 'completed' | 'started' | 'unstarted' | 'canceled';
    };
    priority?: number;
    parentId?: string;
  }

  const issues = ref<Issue[]>([]);
  const issuesRef = collection(db, "issues");

  const unsubIssues = onSnapshot(issuesRef, (snap) => {
    const _issues: Issue[] = [];
    const docs = snap.docs;

    // Filter
    for(let i=0; i < docs.length; i++) {
      const doc = docs[i];
      const issue = { 
        id: doc.id, 
        isCompleted: doc.data().state.type === "completed",
        ...doc.data() 
      } as Issue;
      
      if (issue.parentId || issue.state.type === "canceled") {
        continue;
      }
      _issues.push(issue);
    }    

    _issues.sort((a, b) => {
      if (a.state.type === "started" && b.state.type !== "started") {
        return 1;
      } 
      if (a.state.type === "unstarted" && b.state.type !== "unstarted") {
        return -1;
      }
      if (a.state.type === "completed" && b.state.type !== "completed") {
        return 1;
      }

      const NO_PRIORITY = 5;

      const aPriority = a.priority || NO_PRIORITY;
      const bPriority = b.priority || NO_PRIORITY;

      return aPriority - bPriority;
    })

    issues.value = _issues;
    
  });
</script>

<style scoped>
li {
  height: 18px;
}

li div {
  font-size: 16px;  
  padding-right: 6px;
  width: 12px;
  text-align: center;
}

.completed span {
  text-decoration: line-through;
}

.completed div {
  font-size: 12px;
}

ul {
    list-style-type: none; /* Removes default bullets */
    margin: 0;
    font-size: 12px;
}

.truncate {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container {
  background: white;
}

@media (prefers-color-scheme: dark) {
  .container {
    background: black;
    color: white;
  }  
}
</style>
