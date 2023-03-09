<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title"> Register User</div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="registerUser()"> 
                            <div class="form-group">
                                <input type="text"  
                                :class="`form-control ${state.errors.username ? 'is-inavlid' : ''}`" 
                                v-model="state.username" placeholder="Username">
                                <!-- // to display error if in fields if they have -->
                                <div class="text-danger">{{state.errors.username}} </div>
                            </div>
                            <div class="form-group">
                                <input type="email"  
                                :class="`form-control ${state.errors.email ? 'is-inavlid' : ''}`" 
                                 v-model="state.email" placeholder="Email">
                                <div class="text-danger">{{state.errors.email}}</div>
                            </div>
                            <div class="form-group">
                                <input type="password" 
                                 :class="`form-control ${state.errors.password ? 'is-inavlid' : ''}`" 
                                  v-model="state.password" placeholder="Password">
                                <div class="text-danger">{{state.errors.password}}</div>
                            </div>
                            <div class="form-group">
                                <input type="password" 
                                 :class="`form-control ${state.errors.password2 ? 'is-inavlid' : ''}`"  
                                 v-model="state.password2" placeholder="Confirm Password">
                                <div class="text-danger">{{state.errors.password2}}</div>
                            </div>
                            <button class="btn btn-outline-success form-control"> Register </button>
                        </form>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive} from "vue";
import validateRegisterInput from "../validation/validateRegisterInput";
import { useRouter} from 'vue-router';
export default {
    name:"RegisterCompo",
    setup() {
        let state = reactive({
           username: '',
           email: '',
           password:'',
           password2: '',
           errors: {},
           users: [],

        });
        const router = useRouter();

        function registerUser(){
            let user = {
                username: state.username,
                email:state.email,
                password:state.password,
                password2: state.password2
            }
            console.log(user);
            // object destructuring, function(validateRegisterInput) call krne k bad object return krega
            // isInvalid return boolean values
            const {isInvalid, errors} = validateRegisterInput(user);
            console.log("error",errors);
            if(isInvalid){
                state.errors = errors;
                console.log("state error",state.errors.email);
            }else{
                state.errors = {}
                // store user in local storage

                state.users.push(user);
                // to set value in local storage
                localStorage.setItem("users", JSON.stringify(state.users));

                 if(localStorage.users){
                    let lsUsers = localStorage.users;//get local storage users
                    state.users = JSON.parse(lsUsers);// jo users hai usko array users me assign kr do by parsing it
                }
                console.log("hi",localStorage.users);
                //to reset values
                state.username = "";
                state.email = "";
                state.password = "";
                state.password2 = "";
                router.push("/login");
            }


        }
        return{
            state,
            registerUser
        }
    },
}
</script>


<style>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>