<script setup lang="ts">
defineProps<{
  title: string,
  id: string,
  isCompleted: boolean
}>()
</script>

<template>
    <div class="task">
        <div>
          <label class="round-checkbox">
            <input type="checkbox" isChecked="{{ isCompleted }}"/>
            <span class="checkmark"></span>
          </label>
          <span>{{ title }} </span>
        </div>
        <p><i>{{id}}</i></p>
      </div>
</template>