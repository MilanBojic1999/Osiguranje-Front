import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SimpleTypeahead from 'vue3-simple-typeahead';
import {createPinia} from "pinia";

const app = createApp(App)

app.use(router)
app.use(SimpleTypeahead);
app.use(createPinia());

app.mount('#app')

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
