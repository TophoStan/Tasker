<script lang="ts">
import type { Task } from '@/domain/Task.obj';
import TaskComponent from '../components/TaskComponent.vue';
import { ref, watch } from 'vue';

export default {

    components: {
        TaskComponent
    },
    setup() {
        const tasks = ref([] as Task[]);
        const isLoading = ref(true);

        const completedTasks = ref([] as Task[]);
        const uncompletedTasks = ref([] as Task[]);

        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3000/task');
            const data = await response.json();

            tasks.value = data;
            completedTasks.value = data.filter((task: Task) => task.isCompleted);
            uncompletedTasks.value = data.filter((task: Task) => !task.isCompleted);

            
            
            
            isLoading.value = false;
            console.log('Fetching finished');
        }
        fetchTasks();

        const ListenToUpdateTaskList = () => {
            fetchTasks();
        }

        // setInterval(() => {
        //     fetchTasks();
        // }, 5000);

        return { completedTasks, uncompletedTasks, isLoading, tasks, ListenToUpdateTaskList };
    },

}




</script>

<template>
    <div v-if="!isLoading">
        <div>
            <h2>To be completed</h2>
            <ul>
                <li v-for="task in uncompletedTasks" :key="task.id">
                    <TaskComponent :task="task"
                        @updateTaskList="ListenToUpdateTaskList"
                        />
                </li>
            </ul>
        </div>
        <div>
            <h2>Completed Tasks</h2>
            <ul>
                <li v-for="task  in completedTasks" :key="task.id">
                    <TaskComponent :task="task"
                        @updateTaskList="ListenToUpdateTaskList"
                        />
                </li>
            </ul>
        </div>
    </div>
</template>