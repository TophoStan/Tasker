<script setup lang="ts">
const props = defineProps<{
  title: string,
  id: string,
  isCompleted: boolean
}>()

let isCompleted = props.isCompleted

const updateTaskStatus = () => {
  isCompleted = !isCompleted
  //Update the task status
  fetch(`http://localhost:3000/task/${props.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: props.id,
      isCompleted: isCompleted,
      title: props.title
    })
  })
    .then(response => response.json())
    .then(data => console.log(`${data.isCompleted ? 'Task completed' : 'Task not completed'}`))
    .catch(error => console.log('Error:', error));
} 

</script>

<template>
    <div class="task">
        <div>
          <label class="round-checkbox">
            <input type="checkbox" isChecked="{{ isCompleted }}" v-on:click="updateTaskStatus"/>
            <span class="checkmark"></span>
          </label>
          <span>{{ title }} </span>
        </div>
        <p><i>{{id}}</i></p>
      </div>
</template>