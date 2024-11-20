<script>

</script>
<template>
  <header class="header"><h2 class="header_h2">О нас</h2></header>
  <main>
    <article class="about">
      <p>Автономная некоммерческая организация «Территория танца «Импетус» создана 18 октября 2021 года.</p>
      <p>Причиной открытия стало огромное желание основателей создать лучшую творческую территорию для тех, кому небезразлично хореографическое искусство.</p>
      <p>Основной целью Организации является повышение культурного уровня населения, оказание поддержки талантов, посредством организации творческих фестивалей и конкурсов, мастер-классов различного уровня, поддержка и выявление одарённых детей и молодёжи.</p>
      <p>Все мероприятия АНО «Территория танца «Импетус» проводит, следуя основным принципам, прописанным в указе Президента РФ "Об утверждении Основ государственной культурной политики" № 808 от 24 декабря 2014 года.</p>

    </article>
    <section class="advan">
      <header class="header"><h2 class="header_h2 h2">Наши преимущества</h2></header>
      <div class="d-grid">
        <article>
          <img src="/assets/star.png" alt="" class="star">
          <p>В конкурсах представлены различные номинации танцевального жанра, такие как: классический танец, неоклассика, брейкинг, народный танец, народно-стилизованный танец, эстрадный танец, modern jazz, contemporary, street dance, свободная пластика, K-pop, характерный танец, гимнастический танец, акробатический танец, танцевальное шоу, свободная танцевальная категория, историко-бытовой танец, cheer-dance. Особой гордостью одного из наших проектов является номинация «Сам себе хореограф».</p>
          <img src="/assets/line.png" alt="" class="line">
        </article>
        <article>
          <img src="/assets/star.png" alt="" class="star">
          <p>Для оценки конкурсных выступлении создается коллегия компетентного жюри, в состав которого входят высококвалифицированные и опытные специалисты в сфере хореографического искусства.</p>
          <img src="/assets/line.png" alt="" class="line">
        </article>
        <article>
          <img src="/assets/star.png" alt="" class="star">
          <p>Нет ограничений по возрасту участников, количеству номеров и таймингу.</p>
          <img src="/assets/line.png" alt="" class="line">
        </article>
        <article>
          <img src="/assets/star.png" alt="" class="star">
          <p>Город проведения - Калининград – уникальный город с богатой историей, полной интересных фактов, тайн и легенд, расположенный на юго-восточном побережье Балтийского моря. Здесь есть все, что нужно путешественнику для хорошего времяпровождения: потрясающая природа, большое количество достопримечательностей, высокий уровень сервиса и волшебная территория танца «Импетус», где можно показать свои таланты и найти новых друзей.</p>
          <img src="/assets/line.png" alt="" class="line">
        </article>
        <article>
          <img src="/assets/star.png" alt="" class="star">
          <p>Организованность и слаженность команды организаторов, искренне влюбленных в свое дело, четкое соблюдение таймингов, структурирование и своевременное информирование.</p>
          <img src="/assets/line.png" alt="" class="line">
        </article>
        <article>
          <img src="/assets/star.png" alt="" class="star">
          <div class="empty"></div>
          <p>Доступные цены.</p><div class="empty"></div>
          <img src="/assets/line.png" alt="" class="line">
        </article>
      </div>  
    </section>
    <article class="about"><p>Каждый конкурс-фестиваль нашей организации — это яркое событие с незабываемыми эмоциями, памятными моментами и профессиональным подходом.          Каждый последующий   проект совершенствуется и становится все лучше и интереснее. За два года работы мы стали любимы коллективами за честность и душевный подход. Будьте уверены, ни один ваш вопрос не останется без ответа, пожелания и просьбы будут учтены. Ведь наш ориентир — это ваша заинтересованность в наших проектах!</p></article>
    <article class="applic"><p>Оставляйте <RouterLink class="a" to="/application"> заявку </RouterLink>на понравившийся <RouterLink class="a" to="/main"> фестиваль</RouterLink> и отправляйтесь в незабываемые приключения!</p></article>
  </main>
</template>
<style scoped>
*{
  margin: 0;
}
.empty{
  width: 100%;
}
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
/* Основная часть */
p{
  font-size: large;
  color: rgb(80, 80, 80)
}
.about{
  margin: 20px 100px 20px 100px;
  text-align: center;
}
.about p{
  margin-bottom: 2.5px;
}
.nums {
  color: rgb(108, 85, 158);
  font-size: xx-large;
  font-weight: bold;
  border: 4px solid;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; 
}
.advan{
  margin: 20px 50px 50px 50px
}
.advan article{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  text-align: center;
}
.advan .header{
  max-width: 400px;
  margin-bottom: 10px;
}
.advan .d-grid{
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 1600px;
}
.advan p{
  max-width: 740px;
}
.star{
  width: 50px;
  height: 50px;
}
.applic{
  width: calc(100% - 200px);
  margin: 20px 100px 20px 100px;
  text-align: center;
}
.applic p{
  font-size: x-large;
  font-weight: bold;
}
.line{
  width: 70%;
  height: 10px;
}
.empty{
  width: 100%;
}
@media (max-width: 762px) {
  .d-grid{
    grid-template-columns: 1fr !important;
  }
}
@media (max-width: 490px) {
  .h2{
    font-size: 25px !important;
  }
  .about{
    margin: 20px 25px;
  }
  .applic{
    margin: 20px 25px;
    width: calc(100% - 50px);
  }
}
</style>