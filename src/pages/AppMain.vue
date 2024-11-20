<script>
import axios from 'axios'
import { useHead } from '@vueuse/head';
export default{
  created(){
    useHead({title: 'Импетус: Хореографическая студия'})
  },
  data(){
    return{
      fests: [],
      news: [],
      isAdmin: null,
    };
  },
  mounted(){
    this.loadData();
  },
  methods:{
    async loadData(){
      let response = await axios.get('/main');
      this.fests = response.data.cards;
      this.news = response.data.news;
      this.isAdmin = response.data.isAdmin;
      console.log(this.isAdmin);
    },
    async deleteCard(id){
      let belief = confirm('Удалить карточку?')
      if (belief) {
        await axios.post('/main/delFestival', {id})
      }
      this.loadData()
    },
    async deleteNews(id){
      let belief = confirm('Удалить новость?')
      if (belief) {
        await axios.post('/main/delNews', {id})
      }
      this.loadData()
    },
    quitAdmin(){
      axios.post('/main/quitAdmin');
      this.isAdmin = false;
    }
  }
}
</script>
<template>
  <div class="admin" v-if="isAdmin">
    <RouterLink to="/seeApplications"><button class="btn btn-primary">Посмотреть заявки</button></RouterLink>
    <RouterLink to="/createFestival"><button class="btn btn-primary">Создать фестиваль</button></RouterLink>
    <RouterLink to="/createNews"><button class="btn btn-primary">Создать новость</button></RouterLink>
    <RouterLink to="/createFeedback"><button class="btn btn-primary">Добавить отзыв</button></RouterLink>
    <button class="btn btn-danger quit" @click="quitAdmin">Выйти из режима администратора</button>
  </div>
  <header class="header head1"><h2 class="header_h">Конкурсы и фестивали</h2></header>
  <section class="cards">
    <div class="card" v-for="fest in fests">
      <RouterLink :to="{name: 'festival', params: {id: fest._id}}">
      <img :src="'/assets/' + fest.img" class="card-img-top" alt="festival_picture">
      <div class="card-body">
        <p class="card-text">{{fest.name}}</p>
      </div></RouterLink>
      <button class="btn btn-danger" v-if="isAdmin" @click="deleteCard(fest._id)">Удалить</button>
    </div>
  </section>
  <div class="no_data" v-if="fests.length < 1">Список фестивалей пуст.</div>

  <section class="news">
  <div class="header head2"><h2 class="header_h">Дайджест</h2></div>
    <div class="grid-container d-grid">
      <div class="card" v-for="post in news">
        <img :src="'/assets/news/' + post.img" class="card-img-top" alt="news_img">
        <div class="card-body">
          <p class="card-text">{{post.title}}</p>
          <RouterLink :to="'/news#' + post._id" class="a">Узнать больше →</RouterLink>
        </div>
        <button class="btn btn-danger" v-if="isAdmin" @click="deleteNews(post._id)">Удалить</button>
      </div>
    </div>
  </section>
  <div class="no_data" v-if="news.length < 1"><p>Список новостей пуст.</p></div>

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
  width: calc(100% - 30px);
}
.header_h{
  display: inline-block;
  margin: 0px;
  font-size: xx-large;
}
.head1{
  max-width: 541px;
}
.head2{
  max-width: 300px;
  margin: 20px auto;
}
.header_news{
  width: 300px;
  height: 66px;
  margin: auto;
  color: rgb(108,85,158);
  padding: auto auto;
  border: 4px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no_data{
  font-size: x-large;
  color: rgb(110, 110, 110);
  display: flex;
  justify-content: center
}
/* Карточки */
.cards{
  display: grid;
  gap: 20px;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  justify-content: center;
  margin: 20px 50px 0px 50px;
}
.cards .card{
  max-height: 400px;
  max-width: 800px;
}
.cards .card-img-top{
  object-fit: cover;
  max-height: 283px;
  max-width: 800px;
}
.cards .card-body{
  max-height: 60px;
}
.row{
  margin-bottom: 10px;
}
.cards .card-text{
  color: rgb(110, 110, 110);
  font-size: x-large;
}
.btn-danger{
  width: 100px;
}
.news .btn-danger{
  align-self: end;
}
/* карточки в новостях */
.news .card{
  max-width: 512px;
}
.news .card-img-top{
  max-height: 286px;
  width: 100%;
}
.news .card-text{
  font-size: large;
}
.news .card-body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.grid-container{
  gap: 20px;
  max-width: calc(100% - 150px);
  margin: 10px 75px 50px 75px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  justify-items: center;
}
/* Админ-кнопки */
.admin{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 10px;
}
.quit{
  width: auto;
}
/* ссылки */
a:hover .card-text{
  color: rgb(254,207,87);
  transition: 300ms;
}
a:active .card-text{
  color: rgb(198,147,194);
  transition: 10ms;
}
.a{
  color: rgb(108,85,158);
  font-weight: bold;
}
.a:hover{
  color: rgb(105, 27, 165);
  transition: 300ms;
}
.a:active{
  color: rgb(254,207,87);
  transition: 20ms;
}

@media (max-width: 780px) {
  .cards{
    grid-template-columns: 1fr;
  }
}
@media (max-width: 550px) {
  .cards .card-text{
    font-size: 18px;
  }
  .card-body{
    padding: 8px;
  }
  .card-text{
    margin-bottom: 8px;
  }
}
@media (max-width: 480px) {
  .header_h{
    font-size: 28px;
  }
  .grid-container{
    max-width: calc(100% - 25px);
    margin: 12.5px;
  }
  .cards{
    margin: 15px;
  }
}
</style>