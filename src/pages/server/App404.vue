<script setup>
import router from '../../router.js'
setTimeout(() => {
  router.push({name: 'main'})
}, 5000);
</script>
<template>
  <div class="d-flex">
    <p class="link-danger fs-5">Страница не найдена. Сейчас будет произведена маршрутизация на главную страницу.</p>
  </div>
</template>
<style scoped>
.d-flex{
  justify-content: center;
}
</style>