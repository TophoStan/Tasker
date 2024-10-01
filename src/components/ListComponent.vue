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
        const isEmpty = ref(false);

        const completedTasks = ref([] as Task[]);
        const uncompletedTasks = ref([] as Task[]);

        const fetchTasks = async () => {
            const response = await fetch(`${"https://tasker-api-vwag.onrender.com"}/task`);
            const data = await response.json();

            tasks.value = data;
            completedTasks.value = data.filter((task: Task) => task.isCompleted);
            uncompletedTasks.value = data.filter((task: Task) => !task.isCompleted);

            isLoading.value = false;
            if (tasks.value.length === 0) {
                isEmpty.value = true;
                console.log('No tasks found');                
            } 
            console.log('Fetching finished');
        }
        fetchTasks();

        const ListenToUpdateTaskList = () => {
            fetchTasks();
        }

        return { completedTasks, uncompletedTasks, isLoading, tasks, ListenToUpdateTaskList, isEmpty };
    },

}




</script>

<template>
    <div v-if="!isLoading && !isEmpty">
        <div>
            <h2 class=" text-3xl text-primary font-medium" >To do:</h2>
            <ul class="mt-2">
                <template v-for="task in uncompletedTasks">
                    <li class="mb-2" v-if="!task.isOverdue" :key="task.id">
                        <TaskComponent :task="task" @updateTaskList="ListenToUpdateTaskList" />
                    </li>
                </template>
            </ul>
        </div>
        <div>
            <h2 class="text-3xl text-primary">Completed Tasks</h2>
            <ul class="mt-2">
                <template v-for="task in completedTasks">
                    <li  class="mb-2" v-if="!task.isOverdue" :key="task.id">
                        <TaskComponent :task="task" @updateTaskList="ListenToUpdateTaskList" />
                    </li>
                </template>
            </ul>
        </div>
    </div>
    <div v-if="isEmpty">
        <p>
            No tasks found
        </p>
    </div>
</template>