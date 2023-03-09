import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

//reference: learntocode youtubechannel
// https://github.com/learntocode71/vuejs-local-storage 
// to add admin info for admin
if(localStorage.users === undefined){
    let users = [
        {
            username: "admin",
            email: "admin@gmail.com",
            password: "admin"
        }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

const app = createApp(App)

app.use(router)

app.mount('#app')

