<template>
  <div class="calendar d-flex flex-column">
    <CalendarMonth label="January" />
    <CalendarDay v-for="day of days" :key="day.date" :date="day.date" :events="day.events" :is-workday="day.isWorkday" />
  </div>
</template>

<script lang="ts" setup>
import type { Event } from '@/components/CalendarDay.vue';
import CalendarDay from '@/components/CalendarDay.vue';
import CalendarMonth from '@/components/CalendarMonth.vue';

const days: { date: number, events: Event[], isWorkday: boolean }[] = [
  {    
    date: 26,
    events: [
      {
        title: "Hannah",
        subtitle: "8-6 GP"
      },
      {
        title: "Eric",
        subtitle: "In L.A."
      }
    ],
    isWorkday: true,
  },
  {    
    date: 27,
    events: [
      {
        title: "Hannah",
        subtitle: "10-8 Surgery"
      },
      {
        title: "Eric",
        subtitle: "In L.A."
      }
    ],
    isWorkday: true,
  },
  {    
    date: 28,
    events: [],
    isWorkday: false,
  },
  {    
    date: 29,
    events: [],
    isWorkday: false,
  },
  {    
    date: 30,
    events: [
      {
        title: "Hannah",
        subtitle: "10-8 GP"
      }
    ],
    isWorkday: true,
  },
  {    
    date: 31,
    events: [
      {
        title: "Hannah",
        subtitle: "8-6 GP"
      }
    ],
    isWorkday: true,
  },
  {    
    date: 1,
    events: [
      {
        title: "Hannah",
        subtitle: "8-6 Urgent cared"
      },
      {
        title: "Eric",
        subtitle: "In rehab you know"
      }
    ],
    isWorkday: true,
  },
]
</script>

<style scoped>
.calendar {
  background: black;
  color: white;
}

@media (prefers-color-scheme: dark) {
  .calendar {    
    background: white;    
    color: black;
  }  
}
</style>