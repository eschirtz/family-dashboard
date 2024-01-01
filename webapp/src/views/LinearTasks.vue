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
      const issue = { id: doc.id, ...doc.data() } as Issue;
      
      if (issue.parentId) {
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

<template>
  <ul class="pa-2 pl-2">
    <li v-for="issue of issues" :key="issue.id" :class="{ 'completed': issue.state.type === 'completed' }">{{ issue.title }}</li>
  </ul>
  <div class="ruler"></div>
</template>

<style scoped>
.completed {  
  color: var(--text-secondary);
  text-decoration: line-through;
  font-style: italic;
}

.completed::before {
  content: '';
  padding-right: 16px;
}

.ruler {
  border-bottom: 1px solid var(--text-secondary);
  margin: 0 0 8px 0;
  width: 3.66in;
}

ul {
    list-style-type: none; /* Removes default bullets */
    margin: 0;
    font-size: 12px;
}

ul li::before {
    font-size: 10px;
    content: '▢'; /* Checkbox character */
    text-decoration: none !important;;
    padding-right: 6px;
    /* Additional styling as needed */
}

/* Optional: Style for the list items */
ul li {
    /* Add your styles here */
}
</style>
