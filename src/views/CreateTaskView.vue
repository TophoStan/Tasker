<script>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const title = ref('')
        const dueTo = ref({ date: new Date(new Date().setHours(23, 59, 59, 999)) })

        const router = useRouter()
        const createTask = () => {
            fetch(`${import.meta.env.VITE_API_URL}/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.value,
                    isCompleted: false,
                    DateTimeToBeCompletedBy: dueTo.value.date
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    router.push('/')
                })
                .catch(error => console.error('Error:', error))
        }

        const disabledDates = ref([
            //Every date before today is disabled
            {
                end: new Date(new Date().setHours(0, 0, 0, 0) - 1)
            }
        ])

        const disabledTimes = ref({
            hours: {
                min: new Date().getHours() + 1
            }
        })

        const onSubmit = (values) => {

            console.log(values);

            createTask();
        }


        const validateTitle = (value) => {
            if (!value) {
                return 'Title is required';
            }
            return true;
        }

        return { title, createTask, dueTo, disabledDates, onSubmit, validateTitle, disabledTimes }
    }

}


</script>

<template>
    <div>
        <Form @submit="onSubmit">
            <div>
                <label for="title">Title: </label>
                <Field name="title" v-model="title" placeholder="edit me" :rules="validateTitle" />
                <ErrorMessage name="title" />
            </div>
            <div>
                <Field name="dueDate" v-model="dueTo.date" class="invisible"/>
            </div>
            <div>
                <label for="due"></label>
                <VDatePicker v-model="dueTo.date" mode="dateTime" is-required :disabled-dates="disabledDates" :rules="disabledTimes" is24hr/>
            </div>
            <button>Create Task</button>
        </Form>
    </div>
</template>