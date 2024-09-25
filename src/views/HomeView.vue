<script>
import { ref, watchEffect } from 'vue';
import TaskComponent from '../components/TaskComponent.vue';
import { useFetch } from '@/composable/fetch';
import ListComponent from '@/components/ListComponent.vue';
import TheWelcome from '@/components/TheWelcome.vue';

export default {
  components: {
    TheWelcome,
    ListComponent
  },
  setup() {

    const onAddTask = () => {
      console.log('Button clicked');
    }
    return { onClick: onAddTask }
  }

};
</script>

<style scoped>
/* Your styles here */
</style>

<template>
  <h1>Tasks for today</h1>
  <div>
    <ListComponent />

    <div>
      <a href="/create" @click="onClick">
        +
      </a>
    </div>
  </div>
</template>