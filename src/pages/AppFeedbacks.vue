<script setup>
import axios from 'axios';
import { ref, onBeforeMount } from 'vue';

let isAdmin = ref(false);
let feedbacks = ref([]);

onBeforeMount(() =>{
  getFeedbacks();
})
async function getFeedbacks(){
  let response = await axios.get('/feedbacks');
  isAdmin.value = response.data.isAdmin;
  feedbacks.value = response.data.feedbacks;
}

async function delFeedback(id) {
  let belief = confirm('Удалить отзыв?')
  if (belief) {
    await axios.post('/delFeedback', {id})
  }
  getFeedbacks();
}
</script>
<template>
  <header class="header"><h2 class="header_h2">Отзывы</h2></header>
  <div class="main">  
    <h4>Хотите посмотреть все отзывы или оставить свой? Переходите на нашу <strong><a href="https://vk.com/reviews-211899135#" target="_blank" class="a">страницу в группе в ВКонтакте!</a></strong></h4>
    <div class="feedbacks">
      <div class="fdb" v-for="fdb in feedbacks">
        <div class="avtor"><p>{{fdb.avtor}}, {{ fdb.date }}</p></div>
        <span class="quote top">&#8222;</span>
        <div class="text" v-html="fdb.text"></div>
        <span class="quote bot">&#8222;</span>
        <button class="btn btn-danger" @click="delFeedback(fdb._id)" v-if="isAdmin">Удалить</button>
      </div>
    </div>
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
.main{
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}
.feedbacks{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}
.avtor{
  font-weight: bold;
  font-size: large;
}
.text{
  font-style: italic;
  margin-left: 20px;
}
.fdb{
  margin-bottom: 16px;
  position: relative;
}
.quote{
  font-size: 50px;
  color: blueviolet;
  position: absolute;
}
.top{
  top: -15px;
}
.bot{
  bottom: -10px;
  right: 0;
}
h4{
  text-align: center;
}
</style>