<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <RouterLink  class="navbar-brand" to="/">Navbar</RouterLink >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
             aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item " v-if="!state.user">
                    <RouterLink class="nav-link" to="/register">REGISTER </RouterLink>
                </li>
                <li class="nav-item" v-if="!state.user">
                    <RouterLink  class="nav-link" to="/login">LOGIN</RouterLink >
                </li>
                <li class="nav-item" v-if="state.user">
                    <RouterLink  class="nav-link" to=""  @click.prevent="logout">LOGOUT</RouterLink >
                </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router';
export default {
    name:'headerCompo',
    setup() {
        let state =  reactive({
            user:'',

        });
        onMounted(()=>{
            console.log("localStorage.activeUser",localStorage.activeUser);
            if(localStorage.activeUser){
                let activeUser = localStorage.activeUser;
                state.user = JSON.parse(activeUser);
            console.log("mounted called", state.user);

            }

        })

        const router = useRouter();
        function logout(){
            localStorage.removeItem('activeUser'); // remove active user
            router.push('/login'); // redirect to login page
            window.location.reload(); // to refresh page
        }
        return{
            state,
            logout
        }
    },
}
</script>
