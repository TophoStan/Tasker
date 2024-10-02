<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import router from '@/router';

const token = ref();
token.value = localStorage.getItem('token');


const email = ref('');
const password = ref('');
const username = ref('');

const onSubmit = (values: any) => {

    let mail = values.email;
    let pass = values.password;
    let user = values.username;

    fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail,
            password: pass,
            username: user
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(data => {
        console.log(data);
        router.push('/login');
    }).catch(error => {
        console.error(error);
    });
}


</script>

<template>
    <div>
        <h1 class=" text-5xl font-bold">Register</h1>
        <div class="bg-white p-4 rounded-lg border-secondary border-4">
            <Form @submit="onSubmit">
                <div>
                    <div>
                        <label for="username">Your username:</label>
                    </div>
                    <Field class="rounded border-spacing-0 px-2 bg-white border-secondary border-2 w-full"
                        name="username" v-model="username" placeholder="Prince william" type="username" />
                </div>
                <div>
                    <div>
                        <label for="email">Email address:</label>
                    </div>
                    <Field class="rounded border-spacing-0 px-2 bg-white border-secondary border-2 w-full" name="email"
                        v-model="email" placeholder="Mail@example.com" type="email" />
                </div>
                <div>
                    <div>
                        <label for="password">Password:</label>
                    </div>
                    <Field class="rounded border-spacing-0 px-2 bg-white border-secondary border-2 w-full"
                        name="password" v-model="password" type="password" placeholder="Secret123" />
                </div>
                <div class="mt-4">
                    <button
                        class="bg-primary rounded-lg px-3 pt-1 pb-2 text-md font-medium text-white hover:bg-secondary hover:text-primary">Register</button>
                </div>
            </Form>


        </div>

    </div>
</template>