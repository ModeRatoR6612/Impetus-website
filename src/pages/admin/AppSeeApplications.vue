<script setup>
import axios from 'axios';
import {ref, onBeforeMount, computed} from 'vue';
import { useHead } from '@vueuse/head';
useHead({
  title: 'Просмотр заявок',
  meta : [
    {name: 'robots', content: 'noindex, nofollow'},
  ]
});

let isAdmin = ref(false);
let applications = ref([]);
let isTable = ref(false);

onBeforeMount(()=> {loadData()})

async function loadData (){
  let response = await axios.get('/seeApplications');
  applications.value = response.data;
  
  if (sessionStorage.getItem('isAdmin') == 'true') {
    isAdmin.value = true;
  } else{
    isAdmin.value = false;
  }
  applications.value.sort((a, b) => {
  if (a.festival < b.festival) return -1;
  if (a.festival > b.festival) return 1;
  return 0;
});
}

const reversedApplications = computed(() => {
  return [...applications.value].reverse();
});
function seeTable(){
  isTable.value = !isTable.value
}
async function deleteFestival(id){
  let belief = confirm('Удалить заявку?')
  if (belief) {
    await axios.post('/delApplications', {id})
  }
  loadData()
}
</script>
<template>
  <div v-if="isAdmin" class="cont">
    <div class="d-flex justify-content-center"><button class="btn btn-primary" @click="seeTable">Показать таблицу</button></div>
    <div class="fests" v-if="isTable">
      <div class="d-grid">
        <span>
          <h6>ФИ участника</h6>
          <h6>Фестиваль</h6>
          <h6>Возрастная категория</h6>
        </span>
        <span  v-for="(application, index) in applications">
          <p>{{ index+1 + '.' + application.FIO }}</p>
          <p>{{ application.festival }}</p>
          <p>{{ application.age }}</p>
          <hr>
        </span>
      </div>
    </div>
    <div class="applications" v-for="(application, index) in reversedApplications">
      <h3>{{ index+1 }}</h3>
      <p class="name">Фестиваль:</p>
      <p class="res">{{ application.festival }}</p>
      <p class="name">Название коллектива, город:</p>
      <p class="res">{{ application.name }}</p>
      <p class="name">ФИО руководителя (полностью):</p>
      <p class="res">{{ application.FIO }}</p>
      <p class="name">Номер телефона руководителя:</p>
      <p class="res">{{ application.phone }}</p>
      <p class="name">E-mail руководителя:</p>
      <p class="res">{{ application.email }}</p>
      <p class="name">Необходимо ли проживание?</p>
      <p class="res">{{ application.stay }}</p>
      <p class="name">Номинация:</p>
      <p class="res">{{ application.nomination }}</p>
      <p class="name">Возрастная категория:</p>
      <p class="res">{{ application.age }}</p>
      <p class="name">Групповая категория:</p>
      <p class="res">{{ application.group }}</p>
      <p class="name">Название номера:</p>
      <p class="res">{{ application.playName }}</p>
      <p class="name">Хронометраж. Укажите, если ваш номер начинается «с точки»:</p>
      <p class="res">{{ application.name }}</p>
      <p class="name">Дата отправки:</p>
      <p class="res">{{ application.date }}</p>
      <button class="btn btn-danger" @click="deleteFestival(application._id)">Удалить</button>
    </div>
  </div>
</template>
<style scoped>
*{margin: 0;}
.applications{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  max-width: 900px;
  margin: 0 auto;
}
p{
  font-size: large;
}
.name{
  max-width: 300px;
}
h3{
  justify-self: center;
  grid-column: span 2;
}
.res{
  margin-left: 10px;
}
h6{
  font-weight: bold;
}
.btn-primary{
  width: 160px;
  margin: 0 auto;
}
.d-grid{
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin: 20px 50px;
  gap: 2.5px;
}
span{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
}
hr{
  grid-column: span 3;
}
.fests{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}
.btn-danger{
  width: 100px;
}
.cont{
  margin-left: 5px;
}
</style>