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

        const validateDueDate = (value) => {
            if (!value) {
                return '!';
            }
            return true;
        }

        return { title, createTask, dueTo, disabledDates, onSubmit, validateTitle, disabledTimes, validateDueDate }
    }

}


</script>

<template>
    <div class="bg-white p-4 rounded-lg border-secondary border-4">
        <Form @submit="onSubmit">
            <div>
                <div>
                    <label class=" font-semibold" for="title">Task<span class="warning">*</span></label>

                </div>
                <div>
                    <Field class=" rounded border-spacing-0 px-2 bg-white border-secondary border-2 w-full" name="title"
                        v-model="title" placeholder="Clean the room for once" :rules="validateTitle" />
                </div>
                <ErrorMessage name="title" class="warning text-sm" />
            </div>
            <div>
                <Field name="dueDate" v-model="dueTo.date" class="invisible" :rules="validateDueDate" />
            </div>
            <div>
                <div>
                    <label class=" font-semibold" for="due">Due date<span class="warning">*</span></label>
                </div>
                <VDatePicker v-model="dueTo.date" mode="dateTime" is-required :disabled-dates="disabledDates"
                    :rules="disabledTimes" is24hr />
                <ErrorMessage name="dueDate" class="warning" />
            </div>
            <div class="mt-2">
                <button
                    class="bg-primary rounded-lg px-3 pt-1 pb-2 text-xl font-medium text-white hover:bg-secondary hover:text-primary">Create
                    Task</button>

            </div>
        </Form>
    </div>
</template>