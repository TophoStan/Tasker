<script setup lang="ts">
import type { Task } from '@/domain/Task.obj';
import { ref } from 'vue';

const emit = defineEmits(['updateTaskList'])


const props = defineProps<{
  task: Task
}>()

let isCompleted = props.task.isCompleted
let DateTimeToBeCompletedBy = props.task.DateTimeToBeCompletedBy

const TimeUntillEndOfDayInHoursAndSeconds = () => {
  const now = new Date()
  const endOfDay = new Date(DateTimeToBeCompletedBy)
  const timeLeft = endOfDay.getTime() - now.getTime()
  const hours = Math.floor(timeLeft / 1000 / 60 / 60)
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return `${hours} hours, ${minutes} minutes and ${seconds} seconds`
}

setInterval(() => {
  currentTimeLeft.value = TimeUntillEndOfDayInHoursAndSeconds()
}, 1000)

const currentTimeLeft = ref(TimeUntillEndOfDayInHoursAndSeconds())


const isUpdating = ref(false)
const updateTaskStatus = () => {
  console.log('Updating task status');


  isCompleted = !isCompleted

  //Update the task status
  fetch(`${import.meta.env.VITE_API_URL}/task/${props.task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: props.task.id,
      isCompleted: isCompleted,
      title: props.task.title
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Successful update')
      emit('updateTaskList');
    })
    .catch(error => console.log('Error:', error));

}

</script>

<template>
  <div class="task  bg-secondary-light rounded-lg p-3">
    <div v-if="!props.task.isOverdue">

      <label class="round-checkbox mb-[-4px]">
        <input class="task" type="checkbox" :checked="isCompleted" v-on:click="updateTaskStatus" />
        <span class="checkmark"></span>
      </label>
      <span class=" text-base font-medium">{{ props.task.title }} </span>
      <p v-if="!isCompleted" class=" text-xs ml-10"><i>Time left: {{ currentTimeLeft }}</i></p>
    </div>
  </div>
</template>