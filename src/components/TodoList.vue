<template>
  <div class="wrapp-container">
    <router-link class="button" to='/add'>Добавить заметку</router-link>
    <ul v-if="tasks.length>0">
      <li 
        v-for="task in tasks" 
        :key="task.id"
      >
         <p 
            :class="{'strike':task.complited}"
         >{{task.text}}</p>
         <span class="flex">
            <button 
               class="btn button" 
               @click="()=>{modal=!modal; key=task.key;}"
               title="удалить заметку"
            > &times; </button>

            <router-link 
               class="btn button" 
               :to="{params: {id: task.key }, name: 'todo'}"
               title="редактировать заметку"
            > &#9998; </router-link>
         </span>
      </li>
    </ul>
    <div class="wrapp-modall" v-if="modal">
       <div class="modal">
            <p class="header">Удалить заметку</p>
            <div class="flex space-around">
               <button 
                  class="button"
                  @click="removeTask(key)"
               >Да</button>
               <button 
                  class="button"
                  @click="()=>{modal=!modal}"
               >Нет</button>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'
import axios from 'axios'
const url = process.env.VUE_APP_DB_URL;

export default {
   data: () => {
      return {
         tasks: [],
         modal: false,
         key: '',
      }
   },
   mounted(){
      this.getTask();
   },
   methods:{
      getTask: async function(){
         await axios.get(`${url}/notes.json`)
            .then((res) =>{
               let payload = Object.keys(res.data || []).map( key => {
               return{
                  ...res.data[key],
                  key: key
               }
               })
               this.tasks = payload;

            })
            .catch(function (error) {
               console.log(error);
            })
         ;
      },
      removeTask: async function(key){
         await axios.delete(`${url}/notes/${key}.json`)
            .then( () => {
               this.getTask();
               this.modal = false;
            })
            .catch(function (error) {
               console.log(error);
            })
         ;
      }
   }
}
</script>

<style>
   body{
      font-family: Arial, sans-serif;
   }
   .wrapp-container{
      background-color: #e2e6ea;
      max-width: 500px;
      margin: 10px auto 0;
      padding: 1rem;
   }
   h2{
      text-align: center;
      margin-top: 0;
      text-transform: uppercase;
   }
   .link{
      color: #007bff;
      text-decoration: underline;
      cursor: pointer;
   }
   .link:hover, .link:active, .link:focus{
      color: #0056b3;
   }
   .flex{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
   }
   .space-around{
      justify-content: space-around;
   }
   .button{
      display: inline-block;
      background-color: #007bff;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      color: #fff;
      cursor: pointer;
      transition: 0.5s ease;
   }
   .btn{
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      height: 30px;
      width: 30px;
   }
   .button:hover, .button:active, .button:focus{
      background-color: #0069d9;
      color: #fff;
   }
   label{
      display: inline-flex;
      align-items: center;
      margin-bottom: 20px;
      margin-top: 10px;
      cursor: pointer;
   }
   .checkbox{
      display: inline-block;
      margin-right: 5px;
   }
   .input{
      display: block;
      width: 94%;
      max-width: 400px;
      padding: 5px;
      border-radius: 5px;
      border-color: #7dbcff;
   }
   ul{
      display: block;
      max-width: 400px;
   }
   li{
      display: block;
      padding: .75rem 1.25rem;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,.125);
   }
   p{
      margin: 0;
      margin-bottom: 10px;
   }
   .strike{
      text-decoration: line-through;
      color: #ccc;
   }
   .wrapp-modall{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,0.3);
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
   }
   .modal{
      background-color: #fff;
      max-width: 300px;
      width: 100%;
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 5px;
   }
   .header{
      margin-bottom: 20px;
      text-align: center;
      font-weight: bold;
   }
   @media screen and (max-width: 600px){
      .wrapp-container{
         padding: 3%;
      }
   }
</style>
