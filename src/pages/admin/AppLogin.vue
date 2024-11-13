<script setup>
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
import {ref} from 'vue'

let trueLogin = 'admin';
let truePassword = 'admin';
let isVisible = ref(true);
let isLog = ref(false)
let login = ref('');
let password = ref('');

async function checkLog() {
  if (login.value == trueLogin & password.value == truePassword) {
    isLog.value = true;
    await axios.post('/login', {isAdmin: true});
  }
  else{
    isLog.value = false;
  }
  isVisible.value = false;
}
</script>
<template>
  <form class="forma d-grid" @submit.prevent="checkLog">
    <input v-model="login" type="text" placeholder="login">
    <input v-model="password" type="text" placeholder="password">
    <button type="submit" class="btn btn-success">Log</button>
  </form>
  <div class="suc d-flex">
    <p class="success link-success fs-5" v-if="isLog">Успешно!</p>
    <p class="unsuccess link-danger fs-5" v-else="isLog" :class="{active : isVisible}">Неверный логин или пароль!</p>
  </div>
</template>
<style scoped>
.forma{
  grid-template-columns: auto;
  width: 300px;
  margin: auto;
  gap: 5px;
}
.suc{
  justify-content: center;
}
p{
  margin: 0;
}
.active{
  display: none;
}
</style>