<template>
  <div>
    <div class="container mb-5">
      <div class="row">
        <hotel-list-item v-for="(hotel, index) in hotels"
         :key="index" :hotel="hotel" :nightsCount="nightsCount">
        </hotel-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HotelListItem from './HotelListItem.vue';

export default {
  name: 'HotelList',
  props: {
    nightsCount: {
      type: [Number, String],
      required: true,
      default: 1,
    },
  },
  created() {
    this.$store.dispatch('hotel/getHotels');
  },
  computed: {
    ...mapState({
      hotels: state => state.hotel.hotels,
    }),
  },
  components: {
    HotelListItem,
  },
};
</script>

<style>

</style>
