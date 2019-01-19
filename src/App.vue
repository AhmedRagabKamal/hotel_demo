<template>
  <div id="app">
    <hotel-page></hotel-page>
  </div>
</template>

<script>
import HotelPage from './views/hotel/HotelPage.vue';

export default {
  name: 'app',
  components: {
    HotelPage,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
