<script>
import axios from 'axios';
export default {
  data() {
    return {
      fests: [],
      nominations: [],
      ageCategories: [],
      groupCategories: [],
      selectedFestival: '',
      name: '',
      FIO: '',
      phone: '',
      email: '',
      stay: 'Нет',
      nomination: '',
      age: '',
      group: '',
      playName: '',
      dot: '',
      members: [],

      isSend: 0,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let response = await axios.get('/application');
      this.fests = response.data.festivals;
      this.members = response.data.members;
      window.scrollTo(0, 0);
    },
    loadFest() {
      this.nominations = this.fests[this.selectedFestival].nominations.split(',');
      this.ageCategories = this.fests[this.selectedFestival].ageCategories.split(',');
      this.groupCategories = this.fests[this.selectedFestival].groupCategories.split(',');
    },
    sendData() {
      let festival = this.fests[this.selectedFestival].name;
      let festivalId = this.fests[this.selectedFestival]._id;
      let date = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      try {
        axios.post('/application', { festivalId: festivalId, festival: festival, name: this.name, FIO: this.FIO, phone: this.phone, email: this.email, stay: this.stay, nomination: this.nomination, age: this.age, group: this.group, playName: this.playName, dot: this.dot, date: date })
        this.isSend = 1
      } catch (error) {
        this.isSend = 2
        console.log(error);
      }

    }
  },
}
</script>
<template>
  <header class="header">
    <h2 class="header_h2">Заявка</h2>
  </header>
  <main>
    <form @submit.prevent="sendData">
      <label for="1" class="form-label">Выберите нужный фестиваль</label>
      <select type="select" id="1" class="form-select custom-input" required v-model="selectedFestival"
        @change="loadFest">
        <option v-for="(fest, index) in fests" :value=index>{{ fest.name }}</option>
      </select>

      <label for="2" class="form-label">Название коллектива, город</label>
      <input type="text" class="form-control custom-input" id="2" required v-model="name">

      <label for="3" class="form-label">ФИО руководителя (полностью)</label>
      <input type="text" class="form-control custom-input" id="3" required v-model="FIO">

      <label for="4" class="form-label">Номер телефона руководителя</label>
      <input type="tel" class="form-control custom-input" id="4" required v-model="phone">

      <label for="5" class="form-label">E-mail руководителя</label>
      <input type="email" class="form-control custom-input" id="5" required v-model="email">

      <label class="form-label">Необходимо ли проживание?</label>
      <div class="radio">
        <div class="form-check">
          <input type="radio" id="radio_no" class="form-check-input" value="Нет" name="exampleRadios" checked
            v-model="stay">
          <label for="radio_no" class="form-check-label">Нет</label>
        </div>
        <div class="form-check">
          <input type="radio" id="radio_yes" class="form-check-input" value="Да" name="exampleRadios" v-model="stay">
          <label for="radio_yes" class="form-check-label">Да</label>
        </div>
      </div>

      <label for="6" class="form-label">Номинация</label>
      <select type="select" id="6" class="form-select custom-input" required v-model="nomination">
        <option disabled selected>Выберите нужную опцию</option>
        <option v-for="nomination in nominations" :value="nomination">{{ nomination }}</option>
      </select>

      <label for="7" class="form-label">Возрастная категория</label>
      <div class="warning">
        <select type="select" id="7" class="form-select custom-input" required v-model="age">
          <option disabled selected>Выберите нужную опцию</option>
          <option v-for="age in ageCategories" :value=age>{{ age }}</option>
        </select>
        <p class="text-danger">Уважаемые руководители коллективов и педагоги! Обращаем ваше ВНИМАНИЕ: при подаче заявки
          выбирайте возрастную категорию, согласно возрасту, ее участник, при возникновении вопрос судейская коллегия
          вправе снижать баллы, если указанный возраст участников будет меньше действительного.</p>
      </div>

      <label for="8" class="form-label">Групповая категория</label>
      <select type="select" id="8" class="form-select custom-input" required v-model="group">
        <option selected disabled>Выберите нужную опцию</option>
        <option v-for="group in groupCategories" :value=group>{{ group }}</option>
      </select>

      <label for="9" class="form-label">Название номера</label>
      <input type="text" class="form-control custom-input" id="9" required v-model="playName">

      <label for="10" class="form-label">Хронометраж. Укажите, если ваш номер начинается «с точки»</label>
      <input type="text" class="form-control custom-input" id="10" v-model="dot">

      <div class="form-check" id="personal">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" required>
        <label class="form-check-label" for="flexCheckDefault">Согласие на обработку персональных данных, ознакомление с
          <a href="">Договором оферты</a>.</label>
      </div>

      <button class="send" type="submit">Отправить</button>
    </form>
    <div class="green" v-if="isSend == 1">
      <p class="text-success fs-4">Заявка отправлена успешно!</p>
    </div>
    <div class="red" v-if="isSend == 2">
      <p class="text-danger fs-4">Заявка не была отправлена, попробуйте еще!</p>
    </div>
    <div class="accordion" id="outerAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Cписок участников
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#outerAccordion">
          <div class="accordion-body">
            <!-- Inner Accordion -->
            <div class="accordionInner" :id="'innerAccordion' + index" v-for="(fest, index) in fests">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'innerHeading' + index">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#innerCollapse' + index" aria-expanded="false" :aria-controls="'innerCollapse' + index">
                    {{fest.name}}
                  </button>
                </h2>
                <div :id="'innerCollapse' + index" class="accordion-collapse collapse" :aria-labelledby="'innerHeading' + index" :data-bs-parent="'#innerAccordion' + index">
                  <div class="accordion-body">
                    <!-- List of participants or other content can be placed here -->
                    <div class="d-grid">
                      <span>
                        <h6>ФИ участников</h6>
                        <h6>Возрастная категория</h6>
                      </span>
                      <span v-for="(member, index) in members.filter(member => member.festival === fest.name)">
                        <p>{{ index+1 + '.' + member.FIO}}</p>
                        <p>{{ member.age }}</p>
                        <hr>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
* {
  margin: 0;
}

.header {
  height: 66px;
  margin: auto;
  color: rgb(108, 85, 158);
  border: 4px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
}

.header_h2 {
  display: inline-block;
  margin: 0px;
  font-size: xx-large;
}

/* Main part */
label {
  color: rgb(80, 80, 80);
  font-size: larger;
}

main {
  max-width: 900px;
  margin: 20px auto 0 auto;
}

.form-select,
.form-control {
  border: 1px solid;
  border-color: rgb(181, 180, 184);
  height: 40px;
}

.custom-input:focus {
  border-color: rgb(108, 85, 158);
  box-shadow: 0 0 0 0.2rem rgba(108, 85, 158, 0.5);
}

form {
  display: grid;
  max-width: 100%;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  gap: 10px;
}

.radio {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
}

.warning .text-danger {
  font-size: small;
}

#personal {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  gap: 20px;
}

#personal .form-check-input {
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.308);
  height: 20px;
  width: 20px;
}

.send {
  color: white;
  background-color: rgb(108, 85, 158);
  border-radius: 10px;
  border: 0;
  height: 50px;
  width: 200px;
  grid-column: span 2;
  justify-self: center;
}

.green {
  background-color: rgba(90, 177, 90, 0.692);
  margin-top: 10px;
  border-radius: 10px;
  margin: 10px auto 0 auto;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}

.red {
  background-color: rgba(255, 0, 0, 0.253);
  margin-top: 10px;
  border-radius: 10px;
  margin: 10px auto 0 auto;
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
}
#outerAccordion{
  max-width: 100%;
  margin-top: 25px;
}
.accordion-button{
  width: 100%;
}
.accordion-body{
  padding: 0;
}
.accrodionInner{
  margin-top: 5px;
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
.d-grid{
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin: 5px;
  gap: 2.5px;
}
h6{
  font-weight: bold;
}
span{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}
hr{
  width: 100%;
  grid-column: span 2;
}
</style>