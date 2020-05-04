<template>
   <form @submit.prevent class="wrapp-container" >
      <h2>Добавить заметку</h2>
      <p>
         <input class="input" type="text" v-model="currentTask"/>
      </p>
      <p>
         <button type="button" class="button" @click="addTask">добавить</button>
      </p>
      <router-link class="link" to="/">На главную</router-link>
    </form>
</template>
<script>
import axios from 'axios'
const url = process.env.VUE_APP_DB_URL;
export default {
   data: () => {
      return {
         currentTask: '',
         tasks: []
      }
   },
   methods:{
      addTask: function() {
         if(this.currentTask.length === 0){
            return false;
         }
         this.tasks = {
            text: this.currentTask,
            complited: false,
            id: +new Date,
         }
         this.currentTask = '';
         this.addNote();
      },
      addNote: async function() {
         const note = this.tasks
         await axios.post(`${url}/notes.json`, note)
            .then(function (response) {
               console.log(response);
            })
            .catch(function (error) {
               console.log(error);
            })
         ;
         
      },
   }
}
</script>