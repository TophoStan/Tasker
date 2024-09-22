<script lang="ts">
import TaskComponent from '../components/TaskComponent.vue';
import { ref, watch } from 'vue';

export default {

    components: {
        TaskComponent
    },
    setup() {
        const tasks = ref([] as any[]);
        const isLoading = ref(true);


        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3000/task');
            const data = await response.json();

            isLoading.value = false;
            tasks.value = data;

        }
        fetchTasks();



        return { tasks, isLoading };
    },

}




</script>

<template>
    <div v-if="!isLoading">
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <TaskComponent :title="task.title" :id="task.id" :isCompleted="task.isCompleted" />
            </li>
        </ul>
    </div>
</template>