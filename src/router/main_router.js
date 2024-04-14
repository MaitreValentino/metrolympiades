import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import App from '../App.vue';
import LogIn from '../views/LogInView.vue';
import DisplayMatchView from '@/views/DisplayMatchView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: DisplayMatchView
        },
        /*{ //example code
            path: '/',
            redirect: () => {
                return { name: 'chat', params: { chatId: 'new' } };
            }
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatView,
            meta:{
                protected: true
            }
        },*/
        {
            path: '/login',
            name: 'login',
            component: LogIn
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
    ]
});


router.beforeEach(async(to,from)=>{
    if(to.meta.protected){
        const isLogged = await isLoggedIn()
        if(isLogged)
            return true
        else
            return "/signup" 
    }
})

export default router;