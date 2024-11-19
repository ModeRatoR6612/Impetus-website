<script setup>
import {ref, onMounted} from 'vue';

onMounted(()=>{
  window.addEventListener('scroll', scroll);
})


let isOpen = ref(false);
let isScrolled = ref(false);

function open(){
  isScrolled.value = false;
  isOpen.value = !isOpen.value;
}

function scroll(){
  if (isOpen.value){
    if(window.scrollY > 0){
      isScrolled.value = true;
      isOpen.value = false;
    } else{
      isScrolled.value = false;
    }
  }
}
</script>
<template>
  <header>
    <RouterLink to="/main"><img src="/assets/logo1.png" alt="logo" class="logo"><img width="200" src="/assets/logo4.png" alt="" class="logo1"></RouterLink>
    <nav class="desktop">
      <div class="d-flex links">
        <RouterLink class="a" to="/main"><strong>КОНКУРСЫ</strong></RouterLink>
        <RouterLink class="a" to="/application"><strong>ЗАЯВКА</strong></RouterLink>
        <RouterLink class="a" to="/aboutUs"><strong>О НАС</strong></RouterLink>
        <RouterLink class='a' to="/news"><strong>ДАЙДЖЕСТ</strong></RouterLink>
        <RouterLink class='a' to="/feedbacks"><strong>ОТЗЫВЫ</strong></RouterLink>
        <RouterLink class='a' to="/gallery"><strong>ГАЛЕРЕЯ</strong></RouterLink>
        <RouterLink class="a" to="/contacts"><strong>КОНТАКТЫ</strong></RouterLink>
      </div>
    </nav>

    <div class="tel">
      <button class="btn" @click="open()"><span :class="{'open-2': isOpen}" ></span><span :class="{'op': isOpen}"></span><span :class="{'open-1': isOpen}"></span></button>
      <nav class="menu" :class="{'menu-open' : isOpen && !isScrolled}">
        <div class="list" @click="open()">
          <span class="el"><RouterLink class="a" to="/main">КОНКУРСЫ</RouterLink></span>
          <span class="el"><RouterLink class="a" to="/application">ЗАЯВКА</RouterLink></span>
          <span class="el"><RouterLink class="a" to="/aboutUs">О НАС</RouterLink></span>
          <span class="el"><RouterLink class='a' to="/news">ДАЙДЖЕСТ</RouterLink></span>
          <span class="el"><RouterLink class='a' to="/feedbacks">ОТЗЫВЫ</RouterLink></span>
          <span class="el"><RouterLink class='a' to="/gallery">ГАЛЕРЕЯ</RouterLink></span>
          <span class="el"><RouterLink class="a" to="/contacts">КОНТАКТЫ</RouterLink></span>
        </div>
      </nav>
    </div>
    <!-- Затемн фон -->
    <div class="overlay" v-if="isOpen"></div>
  </header>
  <hr style="width: 100%; margin: 0px 0px 10px 0px;">
</template>
<style scoped>
header{
  display: flex;
  justify-content: space-around;
  margin-left: 25px;
  margin-right: 25px;
  align-items: center;
  width: calc(100% - 50px); /* Учитываем отступы */
}
.logo{
  width: 100px;
}
.links{
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-left: 5px
}
.desktop .a{
  max-height: 17px;
  line-height: 17px;
  white-space: nowrap; 
}
/* картинки */
.hum{
  width: 40px;
  margin-right: 10px;
}
.a{
  margin-right: 10px;
  color: rgb(108,85,158);
}
.a:hover{
  color: rgb(105, 27, 165);
  transition: 300ms;
}
.a:active{
  color: rgb(254,207,87);
  transition: 20ms;
}
/* Телефонное меню адаптив */

.btn{
  width: 50px;
  height: 50px;
  background-color: rgb(108,85,158);
  position: relative;
  padding: 0;
  z-index: 100;
  left: 10px;
}
.btn span{
  position: absolute;
  width: 30px;
  height: 2px;
  background-color: white;
  left: 10px;
  z-index: 1000;
  transition: transform .5s, opacity .1s;
}
.btn span:nth-child(1){
  transform: translateY(10px);
}
.btn span:nth-child(3){
  transform: translateY(-10px);
}

.menu{
  position: fixed;
  width: 150px;
  right: -300px;
  top: 0;
  background-color: rgb(108,85,158);
  padding: 70px 10px 10px 20px;
  z-index: 5;
  transition: right 0.3s ease;
  border-radius: 10px;
  border-top-right-radius: 0;
}
.menu .a{
  color: white;
}
.menu .a:active{
  color: rgb(255, 255, 0);
  transition: 20ms;
}
.list{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.el{
  margin-bottom: 5px;
}
/* Открытие кнопки */
.open-1{
  transform: translateY(0) rotate(45deg) !important;
}
.open-2{
  transform: translateY(0) rotate(-45deg) !important;
}
.op{
  opacity: 0;
}
.menu-open{
  right: 0 !important;
}
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Черный фон с прозрачностью */
  z-index: 1; /* Позиционируем поверх остальных элементов */
  transition: opacity 0.3s ease;
}

@media (max-width: 1040px){
  .logo{
    width: 80px;
    height: auto;
  }
  .logo1{
    width: 180px;
    height: auto;
  }
  strong{
    font-size: 95%;
  }
}
@media (max-width: 1000px) {
  header{
    width: 100%;
    margin: 0;
  }
}

@media (max-width: 935px) {
  header{
    justify-content: space-between;
    width: calc(100% - 20px);
    margin: 0;
  }
  .desktop{
    display: none;
  }
  .tel{
    display: block;
  }
}

@media (min-width: 936px) {
  .tel{
    display: none;
  }
}
@media (max-width: 360px) {
  .logo{
    width: 60px;
    height: auto;
  }
  .logo1{
    width: 160px;
    height: auto;
  }
}
</style>
<!-- 1024 x 768  + -->
 <!-- 1366 × 768  + -->
<!-- 1600 x 900  + -->
 <!-- 1280 x 1024  + -->
  <!-- 1440 x 900  +  -->