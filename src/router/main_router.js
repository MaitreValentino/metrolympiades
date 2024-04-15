import { createRouter, createWebHistory } from 'vue-router';
import {isLoggedIn} from "../api/auth"
import SignUpView from '../views/SignUpView.vue';
import App from '../App.vue';
import LogIn from '../views/LogInView.vue';
import DisplayMatchView from '@/views/DisplayMatchView.vue';
import EditScoreView from '@/views/EditScoreView.vue';
import CreateMatchs from '@/views/CreateMatchs.vue';
import TeamManager from '@/views/TeamManager.vue';
import VisualizeView from '@/views/VisualizeView.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: VisualizeView
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
        {
            path: '/editScore/:id',
            name: 'editScore',
            component: EditScoreView,
            meta:{
                protected: true
            }
        },
        {
            path: '/displayMatchs',
            name: 'displayMatchs',
            component: DisplayMatchView,
            meta:{
                protected: true
            }
        },{
            path: '/createMatch',
            name: 'createMatch',
            component: CreateMatchs,
            meta:{
                protected: true
            }
        },{
            path: '/teamManager',
            name: 'teamManager',
            component: TeamManager,
            meta:{
                protected: true
            }
        }
    ]
});

router.beforeEach(async(to,from)=>{
    if(to.meta.protected){
        const isLogged = await isLoggedIn()
        if(isLogged)
            return true
        else
            return "/login" 
    }
})

export default router;