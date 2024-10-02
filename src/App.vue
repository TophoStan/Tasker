<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';

const token = ref();
token.value = localStorage.getItem('token');


const email = ref('');
const password = ref('');

const onSubmit = (values: any) => {

  console.log(values);

}


</script>



<template>

  <main>
    <RouterView />
  </main>
</template>