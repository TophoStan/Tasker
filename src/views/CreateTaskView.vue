<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const title = ref('')
        const isDaily = ref(false)

        const router = useRouter()
        const createTask = () => {
            fetch('http://localhost:3000/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.value,
                    isCompleted: false,
                    isDaily: isDaily.value,
                    DateTimeToBeCompletedBy: (isDaily.value) ?  new Date(new Date().setHours(23, 59, 59, 999)) : null
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    router.push('/')
                })
                .catch(error => console.error('Error:', error))
        }

        return { title, isDaily, createTask }
    }

}


</script>

<template>
    <div>
        <div>
            <label for="title">Title: </label>
            <input v-model="title" placeholder="edit me" />
        </div>
        <div>
            <label for="isDaily">Should this task be repeated every day?</label>
            <input type="checkbox" v-model="isDaily">
        </div>
        <button @click="createTask">Create Task</button>
    </div>
</template>