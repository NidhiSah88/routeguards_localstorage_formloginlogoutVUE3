<template>
<div id="app">
  <headerCompo />
  <main class="my-3">
    <div class="container">
    <RouterView/>
    </div>
  </main>
</div>
</template>

<script>
import headerCompo from './components/headerCompo.vue'

export default {
  name: 'App',
  components: {
    headerCompo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
