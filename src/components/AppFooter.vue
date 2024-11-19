<script>

</script>
<template>
  <footer>
    <hr style="margin: 5px 0px;">
    <div class="d-flex footer">
      <div class="">
        <img src="/assets/logo3.png" alt="logo" class="logo">
        <div class="au"><small>©2024-2024 Импетус</small></div>
      </div>
      <div class="d-flex navs">
        <div class="rasdely">
          <h4 style="margin-left: 15px;"><b>Разделы</b></h4>
          <nav class="d-flex">
            <ul>
              <li><RouterLink to="/main"><b>Конкурсы</b></RouterLink></li>
              <li><RouterLink to="/application"><b>Заяка</b></RouterLink></li>
              <li><RouterLink to="/aboutUs"><b>О нас</b></RouterLink></li>
              <li><RouterLink to="/news"><b>Дайджест</b></RouterLink></li>
            </ul>
            <ul>
              <li><RouterLink to="/feedbacks"><b>Отзывы</b></RouterLink></li>
              <li><RouterLink to="/gallery"><b>Галерея</b></RouterLink></li>
              <li><RouterLink to="/contacts"><b>Контакты</b></RouterLink></li>
            </ul>
          </nav>
        </div>
        <div class="contacts">
          <h4><b>Контакты</b></h4>
          <p><b>Телефоны: +79118516569 Юлия</b></p>
          <p><b>+79097777589 Анастасия</b></p>
          <hr style="margin: 10px 0px;">
          <p><b>Email: Impetus2022@mail.ru</b></p>
          <hr style="margin: 10px 0px;">
          <a href="https://vk.com/impetus2022" target="_blank"><img src="/assets/vk.png" alt="vk" class="social"></a>
          <a href="https://www.instagram.com/impetus_dance39?igsh=eTU3aW9ydmc2a3ht&utm_source=qr" target="_blank"><img src="/assets/inst.png" alt="instagram" class="social"></a>
          <a href="https://t.me/impetys"  target="_blank"><img src="/assets/tg.png" alt="telegram" class="social"></a>
        </div>
      </div> 
    </div>
  </footer>
</template>
<style scoped>
footer{
  margin: 10px 10px 0 10px;
  width: calc(100% - 20px);
}
.footer{
  justify-content: space-around;
}
.rasdely{
  margin-right: 25px;
}
img{
  width: 140px;
}
.social{
  width: 40px;
  margin-right: 10px;
  margin-bottom: 3px;
}
a, p{
  color: rgb(108,85,158);
  font-size: large;
}
h4{
  color: rgb(108,85,158);
}
a:hover{
  color: rgb(105, 27, 165);
  transition: 300ms;
}
a:active{
  color: rgb(254,207,87);
  transition: 20ms;
}
small{
  color: gray;
}
p{
  margin: 0px;
}
@media (max-width: 760px) {
  .logo{
    display: none;
  }
  .au{
    display: none;
  }
  .navs{
    justify-content: space-around;
  }
  .footer{
    display: block !important;
  }
}
</style>