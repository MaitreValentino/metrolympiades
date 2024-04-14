import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../views/SignUpView.vue'
import App from '../App.vue'
import LogIn from '../views/LogInView.vue'
import TeamManager from '@/views/TeamManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LogIn
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
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/teamManager',
      name: 'teamManager',
      component: TeamManager
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.meta.protected) {
    const isLogged = await isLoggedIn()
    if (isLogged) return true
    else return '/signup'
  }
})

export default router
