<template>
  <div>
    <hotel-list :nightsCount="nightsCount"></hotel-list>
    <hotel-details
    @updateNightCount="(value) => nightsCount = value"></hotel-details>
  </div>
</template>

<script>
import HotelList from './HotelList.vue';
import HotelDetails from './HotelDetails.vue';

export default {
  name: 'HotelPage',
  data() {
    return {
      nightsCount: 1,
    };
  },
  components: {
    HotelList,
    HotelDetails,
  },
}
</script>

<style>

</style>
