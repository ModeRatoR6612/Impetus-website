<script>
import axios from 'axios';
export default{
  data(){
    return{
      modalContent: {
        title: '',
        img: '',
        text: '',
        date: ''
      },
      isVis: false,
      cards: [],
      isAdmin: false,
    }
  },
  mounted(){
    this.loadData()
  },
  methods:{
    async loadData(){
      let response = await axios.get('/news')
      this.cards = response.data.news
      this.isAdmin = response.data.isAdmin
    },
    openModal(e){
      this.isVis = true
      this.modalContent = e
    },
    closeModal(){
      this.isVis = false
    },
    async delNews(id){
      let belief = confirm('Удалить новость?')
      if (belief) {
        await axios.post('/delNews', {id})
      }
      this.loadData()
    },
  }
}
</script>
<template>
  <header class="header"><h2 class="header_h2">Дайджест</h2></header>
  <main>
    <div class="cards">
      <div class="card" v-for="card in cards">
        <img :src="'/assets/news/' + card.img" class="card-img-top" alt="..." v-if="card.img"  @click="openModal(card)">
        <div class="card-body"  @click="openModal(card)">
          <p class="card-text">{{ card.title }}</p>
        </div>
        <button class="btn btn-danger" @click="delNews(card._id)" v-if="isAdmin">Удалить</button>
      </div>
    </div>
    <div class="modal-window" v-if="isVis">
      <div class="md-body">
        <button class="btn close" @click="closeModal">x</button>
        <div class="content">
          <img :src="'/assets/news/' + modalContent.img" class="md-img" alt="..." v-if="modalContent.img">
          <h2>{{modalContent.title}}</h2>
          <div v-html="modalContent.text" class="text"></div>

        </div>
      </div>
    </div>
  </main>
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
  margin-bottom: 15px;
}
.header_h2{
  display: inline-block;
  margin: 0px;
  font-size: xx-large;
}
/* Main part */
.cards{
  margin: 0 50px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  justify-items: center;
}
.card{
  min-width: 300px;
  max-width: 512px;
  cursor: pointer;
}
.card-body{
  padding: 12px;
}
.card-text{
  font-size: large;
}
.card-img-top{
  max-height: 286px;
  width: 100%;
}
/* Modal window */
.modal-window{
  width: 100%;
  margin: auto;
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: auto;
}
.md-body{
  position: relative;
  margin: 25px;
  margin-bottom: 50px;
  border: 0.5px, lightgray, solid;
  top: 50px;
  left: 8%;
  bottom: 0;
  background-color: rgba(255, 255, 255);
  border-radius: 1.5%;
  z-index: 1001;
  width: 80%;
  min-height: 80%;
  overflow: visible;
}
.close{
  position: absolute;
  top: 5px;
  right: 5px;
  color: gray;
  font-weight: bold;
  padding: auto;
  border: 1px, gray, solid;
  border-radius: 50%;
  padding: 0;
  width: 30px;
  height: 30px;
}
.content{
  display: flex; /* Измените на flex для более простого центрирования */
  flex-direction: column; /* Вертикальное направление */
  justify-content: center; /* Центрирование по вертикали */
  align-items: center;
  padding: 5px 50px;
}
.md-img{
  margin: 5px 0;
  width: 60%;
}
p{
  margin: 0;
}
.content h2{
  font-weight: bolder;
  width: auto;
  margin: 10px 0;
}
.text{
  width: 100%;
  text-align: center;
}
.btn-danger{
  width: 100px
}
.text h3, .text p, .text h2, .text h4{
  width: 100%;
}
</style>