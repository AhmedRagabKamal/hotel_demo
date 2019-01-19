<template>
  <div class="container hotel-details" v-if="hotelDetails">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="text-left">{{hotelDetails.name}}</h1>
        <form class="form-inline">
          <label class="mr-3 lead">For</label>
          <select
            @change="updateNightCount(night_count)"
            v-model="night_count"
            class="form-control mr-3"
          >
            <option v-for="(day,index) in days" :key="index" :value="day">{{day}}</option>
          </select>
          <span class="mr-3 lead">Nights</span>
        </form>
      </div>
      <div class="col-sm-12">
        <img :src="selectedPhoto" width="200">
      </div>
      <div class="col-sm-12">
        <div class="row">
          <ul class="list-unstyled images">
            <li v-for="(picture, index) in hotelDetails.pictures" :key="index">
              <img @click="getSelectedPhoto(picture)" :src="picture.thumbnail">
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-12">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th class="text-left relative">
                Reviews
                <div class="absolute sort-icons">
                  <span @click="sortReviews = 'ascend'"
                  :class="{'active-sort' : sortReviews === 'ascend'}">
                    <font-awesome-icon icon="caret-up" size="lg"/>
                  </span>
                  <span class="absolute descend" @click="sortReviews = 'descend'"
                  :class="{'active-sort' : sortReviews === 'descend'}">
                    <font-awesome-icon icon="caret-down" size="lg"/>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="paginatedData && paginatedData.length > 0">
            <tr v-for="review in paginatedData" :key="review.id">
              <td>{{review.id}}</td>
              <td class="text-left">{{review.review}}</td>
            </tr>
          </tbody>
          <tbody v-if="paginatedData && paginatedData.length === 0">
            <tr>
              <td colspan="2" class="text-center">No data to show</td>
            </tr>
          </tbody>
        </table>
        <pagination-component
          :perPage="perPage"
          @emitPageNumber="(pageNum) => pageNumber = pageNum"
          :reviews="[...hotelDetails.reviews]"
        ></pagination-component>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationComponent from '../../shared/components/PaginationComponent.vue';

export default {
  name: 'HotelDetails',
  data() {
    return {
      night_count: 1,
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedPhoto: '',
      perPage: 3,
      pageNumber: 0,
      sortReviews: '',
    };
  },
  computed: {
    hotelDetails() {
      const vm = this;
      vm.pageNumber = 0;
      vm.perPage = 3;
      const hotel = this.$store.state.hotel.hotelDetails;
      if (hotel) {
        // set the first photo
        vm.selectedPhoto = hotel.pictures[0].photo;
      }
      return hotel;
    },
    paginatedData() {
      const start = this.pageNumber * this.perPage;
      const end = start + this.perPage;
      let reviews = this.hotelDetails.reviews.map((item, index) => ({ ...item, id: index + 1 }));
      reviews = reviews.slice(start, end);
      if (this.sortReviews) {
        reviews.sort((a, b) => (this.sortReviews === 'ascend' ? a.score - b.score : b.score - a.score));
      }
      return reviews;
    },
  },
  methods: {
    updateNightCount(nightCount) {
      this.$emit('updateNightCount', nightCount);
    },
    getSelectedPhoto(picture) {
      this.selectedPhoto = picture.photo;
    },
  },
  components: {
    PaginationComponent,
  },
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.hotel-details {
  border: 2px solid #ccc;
  min-height: 400px;
  ul.images {
  margin: 20px auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  width: 900px;
  overflow-x: auto;
  li {
    cursor: pointer;
  }
}

ul.images li {
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
}
  .sort-icons {
    left: 90px;
    top: 9px;
    z-index: 99;
    span {
      cursor: pointer;
    }
    .descend {
      bottom: -14px;
      left: 0;
    }
  }
  .active-sort {
    color: cadetblue;
  }
}
</style>
