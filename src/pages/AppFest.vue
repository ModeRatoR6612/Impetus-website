<script>
import axios from 'axios'
export default{
  data(){
    return{
      fest: []
    }
  },
  mounted(){
    this.loadFest();
  },
  methods:{
    async loadFest(){
      let response = await axios.get('/festival', {params: {id: this.$route.params.id}});
      this.fest = response.data;
      this.fest.nominations = this.fest.nominations.replace(/,/g, ', ');
      this.fest.ageCategories = this.fest.ageCategories.replace(/,/g, ', ');
      this.fest.groupCategories = this.fest.groupCategories.replace(/,/g, ', ');
    }
  },
}
</script>
<template>
  <main class="d-flex">
    <h2>{{fest.name}}</h2>
    <div class="empty"></div>
    <img :src="'/assets/' + fest.img" alt="fest_img" class="fest_img">
    <div class="empty"></div>
    <div class="btns">
      <a :href="'/public/assets/files/' + fest.f" download v-if="fest.f"><button class="btn">Скачать положение</button></a>
      <button class="btn" @click="()=>{this.$router.push('/application')}">Подать заявку</button>
    </div>
    <div class="empty"></div>
    <div class="accordion">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            О КОНКУРСЕ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
          <div class="accordion-body">
           <p>{{ fest.about }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            МЕСТО ПРОВЕДЕНИЯ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.place }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree">
            УСЛОВИЯ УЧАСТИЯ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.joinConditions }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFour">
            НОМИНАЦИИ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.nominations }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFive">
            ВОЗРАСТНЫЕ И ГРУППОВЫЕ КАТЕГОРИИ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.ageCategories }}</p>
            <p>{{ fest.groupCategories }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseSix">
            КОЛЛЕГИЯ ЖЮРИ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.judges }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseSeven">
            ФИНАНСОВЫЕ УСЛОВИЯ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseSeven" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.moneyConditions }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseEight" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseEight">
            ПАКЕТ ПУТЁВКИ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseEight" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.packet }}</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseNine" aria-expanded="false"
            aria-controls="panelsStayOpen-collapseNine">
            КОНТАКТЫ
          </button>
        </h2>
        <div id="panelsStayOpen-collapseNine" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p>{{ fest.contacts }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
*{margin: 0;}
h2 {
  color: rgb(108, 85, 158);
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}
.empty{
  width: 100%;
}
.fest_img {
  margin-bottom: 20px;
  width: 76%; /* Или максимальная ширина */
  max-width: 100%; /* Убедиться, что не превышает размеры родителя */
  height: auto; /* Сохранить пропорции */
  display: block; /* Устранить возможные отступы inline-элементов */
}

main {
  width: calc(100% - 200px);
  margin: 0 100px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  color: rgb(108, 85, 158);
  font-weight: bold;
  border-color: rgb(108, 85, 158);
  height: 50px;
  width: 182px;
}
.btns{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}
.btn:active {
  color: rgb(254, 207, 87);
  transition: 1ms;
}
/* Работа с аккордионом */
.accordion{
  max-width: 1300px;
  margin-top: 20px;
  width: 100%;
}
.accordion-body{
  padding-top: 4px;
}
.accordion-button{
  font-weight: bold;
  color: rgb(108, 85, 158);
}
.accordion-item{
  border: 1px solid lightgray ;
}
.accordion-button:focus{
  border-color: white;
  box-shadow: none;
}

@media (max-width: 720px) {
  main{
    width: calc(100% - 50px);
    margin: 0 25px;
  }
}
@media (max-width: 1440px) {
  .fest_img{
    width: 100%;
  }
}
</style>