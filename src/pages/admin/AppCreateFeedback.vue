<script setup>
import {ref, onBeforeMount} from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';

import { useEditor, EditorContent } from '@tiptap/vue-3';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

useHead({
  title: 'Добавить отзыв на страницу',
  meta : [
    {name: 'robots', content: 'noindex, nofollow'},
  ]
})

let isAdmin = ref(false);
let isAdded = ref(0);
let text = ref();
let avtor = ref();

onBeforeMount(async () =>{
  let response = await axios.get('/createFestival');
  isAdmin.value = response.data;
  console.log(isAdmin);
});


const editor = useEditor({
  extensions: [Underline, StarterKit],
  content:
    '<p>Введите отзыв...</p>',
  onUpdate: () => {
    text.value = editor.value.getHTML();
  }
})


async function createFeedback(){
  if(text.value.length > 0 && isAdmin.value){  
    let formData = new FormData();
    let date = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    formData.append('text', text.value);
    formData.append('avtor', avtor.value);
    formData.append('date', date)
    try {
      isAdded.value = 1;
      await axios.post('/createFeedback', formData, {headers: { 'Content-Type': 'multipart/form-data' }});
    } catch (error) {
      isAdded.value = 2;
      console.log(error);
    }
    cleanField();
  }
}

function cleanField(){
  text.value = '';
  avtor.value = '';
}
</script>
<template>
  <div class="d-grid main" v-if="isAdmin">
    <h3>Добавить отзыв</h3>
    <form class="d-grid form" @submit.prevent="()=>{createFeedback(); cleanField();}">
      <div class="editor">
        <div class="btns d-flex">
          <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()" class="btn btn-secondary">
            Bold
          </button>
          <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" class="btn btn-secondary">
            Underline
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="btn btn-secondary">
            Italic
          </button>
          <button @click="editor.chain().focus().toggleHeading({level: 2}).run()" :class="{ 'is-active': editor.isActive('heading', {level: 2}) }" class="btn btn-secondary">
            H1
          </button>
          <button @click="editor.chain().focus().toggleHeading({level: 3}).run()" :class="{ 'is-active': editor.isActive('heading', {level: 3}) }" class="btn btn-secondary">
            H2
          </button>
          <button @click="editor.chain().focus().toggleHeading({level: 4}).run()" :class="{ 'is-active': editor.isActive('heading', {level: 4}) }" class="btn btn-secondary">
            H3
          </button>
        </div>
        <EditorContent :editor="editor"></EditorContent>
      </div>
      
      <label for="1">Автор отзыва</label>
      <input v-model="avtor" placeholder="Введите имя автора отзыва" type="text" id="1" required>

      <button class="btn btn-primary" type="submit" id="4">Создать</button>
    </form>
    <div class="text-success fs-5" v-if="isAdded==1">Успешно создано!</div>
    <div class="text-danger fs-5" v-if="isAdded==2">Новость не создана, попробуйте еще!</div>
  </div>
</template>
<style scoped>
.main{
  justify-content: center;
  grid-template-columns: auto;
  gap: 10px;
}
.form{
  display: grid;
  justify-content: center;
  grid-template-columns: auto;
  gap: 10px;
}
input{
  height: 50px
}
h3{
  width: 215px;
}
.btns{
  justify-content: flex-start;
  align-items: center;
  padding: 0 5px;
  gap: 5px;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  height: 50px
}
.btn-secondary{
  height: 30px;
}
.btn-primary{
  width: 25%
}
</style>