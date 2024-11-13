<script setup>
import {ref, onBeforeMount} from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Создать карточку фестиваля',
  meta : [
    {name: 'robots', content: 'noindex, nofollow'},
  ]
})

let isAdmin = ref(false);
let isAdded = ref(0);

let name = ref('');
let nominations = ref('');
let ageCategories = ref('');
let groupCategories = ref('');
let about = ref('');
let place = ref('');
let joinConditions = ref('');
let judges = ref('');
let moneyConditions = ref('');
let packet = ref('');
let contacts = ref('');
let img = ref(null);

onBeforeMount(async () =>{
  let response = await axios.get('/createFestival');
  isAdmin.value = response.data;
});

let onFileChange = (e) => {
  img.value = e.target.files[0];
}

let createFestival = async function(){  
  let formData = new FormData();
  formData.append('name', name.value);
  formData.append('nominations', nominations.value);
  formData.append('ageCategories', ageCategories.value);
  formData.append('groupCategories', groupCategories.value);
  formData.append('about', about.value);
  formData.append('place', place.value);
  formData.append('joinConditions', joinConditions.value);
  formData.append('judges', judges.value);
  formData.append('moneyConditions', moneyConditions.value);
  formData.append('packet', packet.value);
  formData.append('contacts', contacts.value);
  formData.append('file', img.value);
  try {
    isAdded.value = 1;
    await axios.post('/createFestival', formData, {headers: { 'Content-Type': 'multipart/form-data' }});
  } catch (error) {
    isAdded.value = 2;
    console.log(error);
  }
}
function cleanField(){
  name.value = '';
  nominations.value = '';
  ageCategories.value = '';
  groupCategories.value = '';
  about.value = '';
  place.value = '';
  joinConditions.value = '';
  judges.value = '';
  moneyConditions.value = '';
  packet.value = '';
  contacts.value = '';
  img.value = '';
}
</script>
<template>
  <div class="d-grid main" v-if="isAdmin">
    <h3 id="h3">Создание карточки фестиваля</h3>
    <form class="d-grid form" @submit.prevent="()=>{createFestival(); cleanField();}">
      <input v-model="name" type="text" placeholder="Название фестиваля" id="1" required>
      <textarea v-model="nominations" type="textArea" placeholder="Номинации" id="2"></textarea>
      <label for="2" class="text-danger fs-6">Строго разделяя через запятую, пример: Классический танец,Неоклассика,Брейкинг</label>
      <textarea v-model="ageCategories" type="text" placeholder="Возрастные категории" id="3"></textarea>
      <label for="2" class="text-danger fs-6">Строго разделяя через запятую, пример: Классический танец,Неоклассика,Брейкинг</label>
      <textarea v-model="groupCategories" type="text" placeholder="Групповые категории" id="4"></textarea>
      <label for="2" class="text-danger fs-6">Строго разделяя через запятую, пример: Классический танец,Неоклассика,Брейкинг</label>
      <textarea v-model="about" type="text" placeholder="О фестивале" id="5"></textarea>
      <input v-model="place" type="text" placeholder="Место проведения" id="6">
      <textarea v-model="joinConditions" type="text" placeholder="Условия участия" id="7"></textarea>
      <textarea v-model="judges" type="text" placeholder="Коллегия жюри" id="8"></textarea>
      <textarea v-model="moneyConditions" type="text" placeholder="Финансовые условия" id="9"></textarea>
      <textarea v-model="packet" type="text" placeholder="Пакет путевки" id="10"></textarea>
      <textarea v-model="contacts" type="text" placeholder="Контакты" id="11"></textarea>
      <label for="12">Выберите изображение фестиваля</label>
      <input type="file" id="12" required accept="image/*" @change="onFileChange">
      <button class="btn btn-primary" type="submit" id="3">Создать</button>
    </form>
    <div class="text-success fs-5" v-if="isAdded==1">Успешно создано!</div>
    <div class="text-danger fs-5" v-if="isAdded==2">Фестиваль не был создан, попробуйте еще!</div>
  </div>
</template>
<style scoped>
*{margin: 0;}
.main{
  justify-content: center;
  grid-template-columns: auto;
  gap: 10px;
}
.form{
  justify-content: center;
  grid-template-columns: auto;
  gap: 10px;
}
input{
  width: 500px;
  height: 40px;
}
textarea{
  width: 500px;
  height: 80px;
}
h3{
  width: 400px;
}
</style>