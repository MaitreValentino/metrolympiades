import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import LogIn from '../views/LogIn.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/login',
            name: 'login',
            component: LogIn
        }
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