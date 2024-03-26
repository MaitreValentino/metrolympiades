<script setup>
import { onMounted, ref } from 'vue';
import useSupabase from '../api/supabase';

const {supabase} = useSupabase();



const team = ref([])
const sports = ref([])
const team1model = defineModel('team1model')
const team2model = defineModel('team2model')
const sportmodel = defineModel('sportmodel')

async function getTeam(){
    const{data} = await supabase.from('teams').select()
    team.value = data
}

async function getSport(){
    const{data} = await supabase.from('sports').select()
    sports.value = data
}

async function submit(){
    await supabase.from('matchs').insert({
        team1: team1model.value,
        team2: team2model.value,
        sport: sportmodel.value,
        
    })
}

onMounted(() => {
    getTeam()
    getSport()
})

</script>


<template>
    <div>
        
        <P>Matchs</P>

        <select v-model="team1model" name="team1" id="team1-select">
        <option value="">Team 1 :</option>
        <option v-for="item in team" :value=item.id>{{ item.name }}</option>
        </select>
        <br>
        <select v-model="team2model" name="team2" id="team2-select">
        <option value="">Team 2 :</option>
        <option v-for="item in team" :value=item.id>{{ item.name }}</option>
        </select>
        <br>
        <select v-model="sportmodel" name="sports" id="sport-select">
        <option value="">Sports :</option>
        <option v-for="item in sports" :value="item.id">{{ item.intitule }}</option>
        </select>
        <br>
        <label>Time : </label><input type="time" id="heurematch" name="heurematch" min="09:00" max="22:00"/>
        <br>
        <button class="border-2 rounded-full" @click="submit">Create a match</button>
    </div>
</template>