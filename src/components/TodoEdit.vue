<template>
   <div class="wrapp-container">
      <h2>Редактирование заметки</h2>
      <p>
         <input class="input" type="text" @input="inputText" v-model="text"/>
      </p>
      <p class="flex">
         <button 
            class="button" 
            type="button" 
            @click="canselEdit"
            v-if="text!==textFirst"
         >Отменить изменение</button>

         <button 
            class="button" 
            type="button" 
            @click="editText"
            v-if="textEdited.length!==0 & text!==textEdited"
         >Повторить изменение</button>

      </p>
      <label>
         <input type="checkbox" class="checkbox" v-model="complited"/>
         <span v-if="complited">выполнено</span>
         <span v-else>не выполнено</span>
      </label>
      <p>
         <button class="button" type="button" @click="editTask">Сохранить</button>
      </p>
      <p>
         <button 
            class="button" 
            type="button"
            @click="()=>{modalDelit=!modalDelit}"
         >Удалить</button>
      </p>
      <p 
         class="link"
         @click="()=>{modalCansel=!modalCansel}"
      >На главную</p>

      <div class="wrapp-modall" v-if="modalDelit">
         <div class="modal">
            <p class="header">Удалить заметку</p>
            <div class="flex">
               <button 
                  class="button"
                  @click="removeTask"
               >Да</button>
               <button 
                  class="button"
                  @click="()=>{modalDelit=!modalDelit}"
               >Нет</button>
            </div>
         </div>
      </div>
      <div class="wrapp-modall" v-if="modalDelit">
         <div class="modal">
            <p class="header">Удалить заметку</p>
            <div class="flex space-around">
               <button 
                  class="button"
                  @click="removeTask"
               >Да</button>
               <button 
                  class="button"
                  @click="()=>{modalDelit=!modalDelit}"
               >Нет</button>
            </div>
         </div>
      </div>
      <div class="wrapp-modall" v-if="modalCansel">
         <div class="modal">
            <p class="header">Отменить редактирование</p>
            <div class="flex space-around">
               <router-link 
                  class="button"
                  to='/'
               >Да</router-link >
               <button 
                  class="button"
                  @click="()=>{modalCansel=!modalCansel}"
               >Нет</button>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import axios from 'axios'
const url = process.env.VUE_APP_DB_URL;

export default {
   data: () => {
      return{
         key: '',
         text: '',
         textFirst: '',
         textEdited: '',
         complited: false,
         id: '',
         modalDelit: false,
         modalCansel: false,
      }
   },
   mounted(){
      this.key = window.location.pathname.replace('/todo/','');
      console.log(this.key);
      this.getNoteItem();
   },
   methods:{
      editTask: async function(){
         const note = {
            text: this.text,
            complited: this.complited,
            id: this.id,

         };
         await axios.put(`${url}/notes/${this.key}.json`, note)
            .then( ()=>{
               this.$router.push('/');
            })
            .catch(function (error) {
               console.log(error);
            })
         ;
         
      },
      canselEdit: function(){
         this.text = this.textFirst;
      },
      editText: function(){
         this.text = this.textEdited;
      },
      inputText: function(){
         this.textEdited = this.text;
      },
      getNoteItem: async function(){
         await axios.get(`${url}/notes/${this.key}.json`)
         .then((res) =>{
            console.log({...res.data});
            let {text, complited, id} = {...res.data};
            console.log(text, complited)
            this.text = text;
            this.textFirst = text;
            this.complited = complited;
            this.id = id;
         })
         .catch(function (error) {
            console.log(error);
         })
      },
      removeTask: async function(){
         await axios.delete(`${url}/notes/${this.key}.json`)
            .then( () => {
               this.$router.push('/');
            })
            .catch(function (error) {
               console.log(error);
            })
         ;
      }
   }
}
</script>
