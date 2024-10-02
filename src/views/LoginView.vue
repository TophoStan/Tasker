<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import router from '@/router';

const token = ref();
token.value = localStorage.getItem('token');


const email = ref('');
const password = ref('');

const onSubmit = (values: any) => {

    let mail = values.email;
    let pass = values.password;

    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail,
            password: pass
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        token.value = data.token;

        router.push('/');
    }).catch(error => {
        console.error(error);
    });
}


</script>

<template>
    <div>
        <h1 class=" text-5xl font-bold">Login</h1>
        <div class="bg-white p-4 rounded-lg border-secondary border-4">
            <Form @submit="onSubmit">
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
                <div>
                    <router-link to="register" class="pointer text-xs text-blue-300 hover:text-blue-600">Not registered
                        yet?</router-link>
                </div>
                <div class="mt-4">
                    <button
                        class="bg-primary rounded-lg px-3 pt-1 pb-2 text-md font-medium text-white hover:bg-secondary hover:text-primary">Log
                        in</button>
                </div>
            </Form>


        </div>

    </div>
</template>