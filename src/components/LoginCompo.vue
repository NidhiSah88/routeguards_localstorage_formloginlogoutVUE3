<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title"> Login User</div>
                    </div>
                    <div class="card-body">
                        <form novalidate @submit.prevent="loginUser()">
                             <div class="form-group">
                                <input type="text"
                                 :class="`form-control ${state.errors.username ? 'is-invalid' : ''}`" 
                                 v-model="state.username"
                                 placeholder="Username">
                                 <div class="invalid-feedback"> {{state.errors.username}}</div>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" 
                                :class="`form-control ${state.errors.password ? 'is-invalid' : ''}`" 
                                v-model="state.password"
                                placeholder="Password">
                                <div class="invalid-feedback">{{state.errors.password}}</div>
                            </div>
                            
                            <button class="btn btn-outline-success form-control"> Login </button>
                        </form>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import validateLoginInput from "../validation/validateLoginInput";
import { useRouter} from 'vue-router';
export default {
    name:"LoginCompo",
    setup() {
        let state = reactive({
            username:'',
            password:'',
            errors:{},

        });
        const router = useRouter();

        function loginUser(){
            console.log('login function called');
            let credentials = {
                username: state.username,
                password: state.password
            };
            const {isInvalid,errors} = validateLoginInput(credentials);
            if(isInvalid){
                state.errors = errors;
            }else{
                state.errors = {};

                // login code goes here , lsUsers is users in local storage
                let lsUsers = localStorage.users;
                lsUsers = JSON.parse(lsUsers);
                let usernameIndex = lsUsers.findIndex(
                    (user) => user.username === credentials.username
                );
                console.log('usernameIndex', usernameIndex);
                if(usernameIndex > -1){
                    let passwordIndex = lsUsers.findIndex(
                        (user) => user.password === credentials.password
                    );
                    if(passwordIndex > -1){
                        let activeUser = lsUsers.find(
                            (user) => user.username === credentials.username
                        );
                        // set login users credentials who are login/active in activeUser
                        localStorage.setItem("activeUser", JSON.stringify(activeUser));
                        router.push("/dashboard");
                        window.location.reload(); // to refresh page
                    }else{
                       state.errors.password = "Password does not match!"; 
                    }
                }else{
                    state.errors.username = "Username does not exist!";
                }


            }


        }

        return {
            state,
            loginUser
        }
    },
}
</script>