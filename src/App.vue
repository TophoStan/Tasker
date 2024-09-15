<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'

</script>



<template>
  <h1>Tasks for today</h1>
  <main>
    <RouterView />
  </main>
</template>