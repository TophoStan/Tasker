

<script>
import { ref, watchEffect } from 'vue';
import TheWelcome from '../components/TheWelcome.vue';
import TaskComponent from '../components/TaskComponent.vue';
import { useFetch } from '@/composable/fetch';

export default {
  components: {
    TheWelcome,
    TaskComponent
  },
  setup() {
    const url = ref('http://localhost:3000/task/');
    const { data, error } = useFetch(url);

    watchEffect(() => {
      if (error.value) {
        console.log('Error:', error.value);
      } else if (data.value) {
        console.log(data.value);
      } else {
        console.log('Loading');
      }
    });

    return {
      data,
      error
    };
  }
};
</script>

<style scoped>
/* Your styles here */
</style>

<template>
  <div>
    <ul>
      <li v-for="task in data" :key="task.id">
        <TaskComponent :isCompleted="task.isCompleted" :title="task.title" :id="task.id"/>
      </li>
    </ul>
  </div>
</template>