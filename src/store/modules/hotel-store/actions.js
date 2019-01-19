import axios from '../../../authorizedAxios';

export default {
  getHotels({ commit }) {
    axios.get('/hotels').then((response) => {
      commit('updateHotels', response.data);
    }, error => console.log(error));
  },
  getHotelDetails({ commit }, hotelId) {
    axios.get(`/hotelDetails/${hotelId}`).then((response) => {
      commit('updateHotelDetails', response.data);
    }, error => console.log(error));
  },
};
