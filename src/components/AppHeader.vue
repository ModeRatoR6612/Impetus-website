<script>
</script>
<template>
  <header class="d-flex">
    <RouterLink to="/main"><img src="/assets/logo1.png" alt="logo" class="logo"><img width="200" src="/assets/logo4.png" alt=""></RouterLink>
    <nav>
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
  </header>
  <hr style="width: 100%; margin: 0px 0px 10px 0px;">
</template>
<style scoped>
header{
  justify-content: space-around;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
}
nav{
  width: 40%;
}
.links{
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
/* картинки */
.logo{
  width: 100px;
}
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
</style>