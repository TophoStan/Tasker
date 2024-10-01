import './assets/main.css'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import { ErrorMessage, Field, Form } from 'vee-validate';
import 'v-calendar/style.css';
//Tailwind
import './index.css'

// Use plugin defaults (optional)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


// Use plugin with optional defaults
app.use(createPinia())
app.use(setupCalendar, {})
app.use(router)

//Custom calender component
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

// Vee validate
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage)


app.mount('#app')
