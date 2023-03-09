<template>
    <div class="dashboard">
        <p> DASHBOARD</p>
        <h1> Welcome {{state.user.username}} </h1>
        <div class="table-responsive" v-if="state.user.username === 'admin'">
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>ID:</th>
                        <th>User name:</th>
                        <th>Email:</th>
                    </tr>
                </thead>  
                <tbody>
                    <tr v-for="(item,index) in state.users" :key="item.username">
                        <td>{{index + 1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.email}}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
export default {
    setup() {
        let state = reactive({
            user:'',
            users:[],
        });
        onMounted(()=>{
            if(localStorage.activeUser){
                //get users list from local storage
                let lsUsers = localStorage.users;
                state.users = JSON.parse(lsUsers);
                // for active user
                let activeUser = localStorage.activeUser;
                state.user = JSON.parse(activeUser);
            }
        })

        return{
            state,

        }
    },
}
</script>