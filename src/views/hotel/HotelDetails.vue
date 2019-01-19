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
        <div class="row galary-container">
          <div class="mr-3 mb-3" v-for="(picture, index) in hotelDetails.pictures" :key="index">
            <img @click="getSelectedPhoto(picture)" :src="picture.thumbnail">
          </div>
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
                  :class="{'active-sort' : sortReviews === 'ascend'}"
                  style="cursor:pointer">
                    <font-awesome-icon icon="caret-up"/>
                  </span>
                  <span class="absolute descend" @click="sortReviews = 'descend'" style="cursor:pointer"
                  :class="{'active-sort' : sortReviews === 'descend'}">
                    <font-awesome-icon icon="caret-down"/>
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
import PaginationComponent from "../../shared/components/PaginationComponent.vue";
export default {
  name: "HotelDetails",
  data() {
    return {
      night_count: 1,
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedPhoto: "",
      perPage: 3,
      pageNumber: 0,
      sortReviews: '',
    };
  },
  computed: {
    hotelDetails() {
      this.pageNumber = 0;
      this.perPage = 3;
      const hotel = this.$store.state.hotel.hotelDetails;
      if (hotel) {
         // set the first photo
        this.selectedPhoto = hotel.pictures[0].photo;
        return hotel;
      }
    },
    paginatedData() {
      const start = this.pageNumber * this.perPage,
        end = start + this.perPage;
      let reviews = this.hotelDetails.reviews.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        reviews = reviews.slice(start, end);
        if(this.sortReviews) {
          reviews.sort((a, b) => {
            return this.sortReviews === "ascend" ? a.score - b.score : b.score - a.score;
          })
        }
      return reviews;
    }
  },
  methods: {
    updateNightCount(nightCount) {
      this.$emit("updateNightCount", nightCount);
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
  border: 2px solid;
  min-height: 400px;
  .galary-container {
    max-width: 600px;
    max-height: 110px;
    overflow-x: auto;
    margin: 30px auto;
  }
  .sort-icons {
    left: 90px;
    top: 9px;
    z-index: 99;
    .descend {
      bottom: -10px;
      left: 0;
    }
  }
  .active-sort {
    color: cadetblue;
  }
}
</style>
