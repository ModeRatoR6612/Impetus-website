<script setup>
import axios from 'axios'
import {ref, onBeforeMount} from 'vue'
import { useHead } from '@vueuse/head';

import { useEditor, EditorContent } from '@tiptap/vue-3';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

useHead({
  title: 'Создать карточку новостей',
  meta : [
    {name: 'robots', content: 'noindex, nofollow'},
  ]
})

let text = ref();
let isAdmin = ref(false);
let title = ref();
let img = ref();
let isAdded = ref();


const editor = useEditor({
  extensions: [Underline, StarterKit],
  content:
    '<p>Заголовок новости будет выведен автоматически, поэтому дублировать его не надо!</p>',
  onUpdate: () => {
    text.value = editor.value.getHTML();
  }
})


onBeforeMount(async ()=>{
  let response = await axios.get('/createNews');
  isAdmin.value = response.data;
  console.log(isAdmin);
})

let onFileChange = (e) => {
  img.value = e.target.files[0];
}

let createNews = async function(){
  if (title.value.length > 0 && isAdmin.value) {
    let formData = new FormData();
    let date = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    if (img.value){
      formData.append('file', img.value)
    }
    else{
      formData.append('file', false)
    }
    formData.append('title', title.value)
    formData.append('text', text.value)
    formData.append('date', date)
    try {
      isAdded.value = 1;
      await axios.post('/createNews', formData, {headers: { 'Content-Type': 'multipart/form-data' }});
    } catch (error) {
      isAdded.value = 2;
      console.log(error);
    }
  }
  cleanField()
}
function cleanField(){
  title.value = '';
  img.value = '';
}
</script>
<template>
  <div class="d-grid main" v-if="isAdmin">
    <h3 id="h3">Создание новости</h3>
    <!-- <form class="d-grid form" @submit.prevent="()=>{createNews(); cleanField();}">
      <input v-model="title" type="text" placeholder="Заголовок новости" id="1" required>
      <textarea v-model="text" type="text" placeholder="Основной текст" id="2" required></textarea>
      <label for="3">Выберите изображение новостной карточки</label>
      <input type="file" id="3" accept="image/*" @change="onFileChange">
      <button class="btn btn-primary" type="submit" id="3">Создать</button>
    </form> -->
    <form @submit.prevent="()=>{createNews(); cleanField();}" class="form">
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
      <input v-model="title" type="text" placeholder="Заголовок новости" id="1" required>
      <label for="3">Изображение</label>
      <input type="file" id="3" accept="image/*" @change="onFileChange">
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
  width: 500px;
  height: 50px;
}
h3{
  width: 400px;
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
  width: 50%
}
</style>