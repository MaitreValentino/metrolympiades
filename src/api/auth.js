import { useRouter } from 'vue-router'
import router from '../router/main_router'
import useSupabase from '../api/supabase'

const { supabase } = useSupabase()

async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
  router.push({name:'teamManager'})
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  router.push('logIn')
}

async function logIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (!error) {
    router.push('/')
  }
}

async function isLoggedIn() {
  const { data } = await supabase.auth.getSession()
  return !!data.session
}

export { signUp, isLoggedIn, logIn, signOut }