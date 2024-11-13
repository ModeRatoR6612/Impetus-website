<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
export default{
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>

<template>
  <div class="wrapper">
    <header><AppHeader></AppHeader></header>
    <main><RouterView/></main>
    <footer><AppFooter></AppFooter></footer>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
html, body{
  height: 100%;
}
.wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
footer {
  margin-top: auto;
}
main{
  flex-grow: 1;
}
a{
  text-decoration: none;
}
.a{
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
