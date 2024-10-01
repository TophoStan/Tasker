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
  <div>
    <h1 class=" text-7xl font-bold">Today's job</h1>
    <div class="relative min-h-64">
      <ListComponent />

      <div class="absolute bottom-0 right-0">
        <a class="bg-primary rounded-lg px-3 pt-1 pb-2 text-2xl font-extrabold text-white hover:bg-secondary hover:text-primary" href="/create" @click="onClick">
          +
        </a>
      </div>
    </div>
  </div>
</template>