# routeguards_localstorage_formloginlogoutVUE3
# this project is done in vuejs3
# here user registration , login logout feature is implemented
# user data is stored in local storage
# navigation guard concept is implement in router/index.js file
to run file run: npm i to install node packages


import {createRouter, createWebHistory } from 'vue-router'

// implementing guards to stop visiting every page
function guest(to, from, next){
    if(localStorage.activeUser){
        next({name: 'Dashboard'}); //if user login hai to dashborad par jaayega
    }else{
        next(); // or nhi hai loginredierct to login or register page
    }
}
function guard(to, from, next){
    if(localStorage.activeUser){
        next(); //if user login/authenticated hai to dashborad par jaayega
    }else{
        next({name: "LoginCompo"}); // or nhi hai login redierct to login page
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/register',
            name: 'RegisterCompo',
            component: () => import('../components/RegisterCompo.vue'),
            beforeEnter: guest, // since public page means available to all users
        },
        {
            path:'/login',
            name: 'LoginCompo',
            component: () => import('../components/LoginCompo.vue'),
            beforeEnter: guest,
        },
        {
            path:'/',
            name: 'HomeCompo',
            component: () => import('../views/HomeCompo.vue'),
            beforeEnter: guest,
        },
        {
            path:'/dashboard',
            name: 'Dashboard',
            component: () => import('../views/DashBoard.vue'),
            beforeEnter: guard,
        },
        
    ]
})


export default router
