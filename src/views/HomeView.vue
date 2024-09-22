

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
  }
  
};
</script>

<style scoped>
/* Your styles here */
</style>

<template>
  
  <ListComponent />
</template>