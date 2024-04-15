import { useRouter } from 'vue-router'
import router from '../router/main_router'
import useSupabase from '../api/supabase'

const { supabase } = useSupabase()

async function getTeam1(){    
    let { data: {user} } = await supabase.auth.getUser()
    const{data} = await supabase.from('teams').select().eq('leader', user.id)
    return data[0]
    
}
async function getTeam2(){
    const{data} = await supabase.from('teams').select()
    return data
}

async function getAllSport(){
    const{data} = await supabase.from('sports').select()
    return data
}

async function createMatch(team1id, team2id, sportid, timematch){ 
    await supabase.from('matchs').insert({
    team1: team1id,
    team2: team2id,
    sport: sportid,
    time: timematch
    })
}

export {getTeam1, getTeam2, getAllSport, createMatch}