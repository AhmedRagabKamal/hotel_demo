import Vue from 'vue';
import Vuex from 'vuex';
import HotelStore from './modules/hotel-store/HotelStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hotel: HotelStore,
  },
});
