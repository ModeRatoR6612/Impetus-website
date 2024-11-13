<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from "vue";

let isAdmin = ref(false);
let isOk = ref(0);
let img = ref(null);
let imgsNames = ref([]);

let loadData = async function(){
  let response = await axios.get('/gallery');
  imgsNames.value = response.data.files;
  isAdmin.value = response.data.isAdmin;
};

onBeforeMount(()=>{loadData()}); // hook

// Админка

let onFileChange = (e) => {
  img.value = e.target.files[0];
};

async function sendData(){
  let formData = new FormData();
  formData.append('file', img.value)
  try {
    isOk.value = 1
    await axios.post('/gallery', formData, {headers: { 'Content-Type': 'multipart/form-data' }});
  } catch (error) {
    isOk.value = 2;
    console.log(error);
  }
  loadData();
};

async function delImg(id) {
  let file = imgsNames.value[id];

  let belief = confirm('Удалить изображение?')
  if (belief) {
    await axios.post('/gallery/delImg', {file})
  }
  window.location.reload()
}
</script>
<template>
  <header class="header"><h2 class="header_h2">Галерея</h2></header>
  <div class="form-container" v-if="isAdmin">
    <form class="form" @submit.prevent="sendData()">
      <label for="1" class="fs-5">Загрузить фотографию</label>
      <input type="file" required accept="image/*" @change="onFileChange">
      <button type="submit" class="btn btn-primary">Загрузить</button>
      
      <div class="text-success fs-5" v-if="isOk==1">Успешно добавлено!</div>
      <div class="text-danger fs-5" v-if="isOk==2">Изображение не было добавлено, попробуйте еще!</div>
    </form>
  </div>
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item" v-for="(img, index) in imgsNames" :class="{active: index === 0}" :key="index">
        <img :src="`/assets/gallery/${img}`" class="d-block" alt="gallery_picture">
        <button class="btn btn-danger" @click="delImg(index)" :key=index v-if="isAdmin">Удалить изображение</button>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
<style scoped>
.header{
  height: 66px;
  margin: auto;
  color: rgb(108,85,158);
  border: 4px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
}
.header_h2{
  display: inline-block;
  margin: 0px;
  font-size: xx-large;
}
img{
  width: 100%;
}
.form-container{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.form{
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  gap: 5px;
}
label{
  font-weight: bold;
}
.carousel{
  width: 65%;
  margin: 20px auto 50px auto;
}
</style>