<template>
  <div class="col-sm-4">
    <div class="card mb-3">
      <div class="card-body text-left">
        <button @click="getHotelDetail(hotel.id)"
         class="btn btn-link">{{hotel.name}}</button>
        <div class="row">
          <div class="col-sm-5">
              <img :src="hotel.photo" class="img-thumbnail" :alt="hotel.name" />
          </div>
          <div class="col-sm-7">
            <ul class="list-unstyled">
              <li>{{hotel.pricePerNight * nightsCount | currency('$')}}
                 for {{nightsCount}} night</li>
              <li>{{hotel.totalScore}}
                 <span v-grade="{grade:hotel.totalScore}"></span>
              </li>
              <li>{{hotel.totalReviews}} reviews</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import currency from '../../shared/filters/currency-filter';
import grade from '../../shared/directives/grade-directive';

export default {
  name: 'HotelListItem',
  props: {
    hotel: {
      required: true,
      type: Object,
      default: () => {},
    },
    nightsCount: {
      required: true,
      type: [Number, String],
      default: 1,
    },
  },
  methods: {
    getHotelDetail(hotelId) {
      this.$store.dispatch('hotel/getHotelDetails', hotelId);
    },
  },
  filters: {
    currency,
  },
  directives: {
    grade,
  },
};
</script>

<style scoped lang='scss'>

</style>
