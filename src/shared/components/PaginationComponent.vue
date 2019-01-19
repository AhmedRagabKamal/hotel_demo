<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
        <li class="page-item">
          <button @click="prevPage" class="page-link"
           aria-label="Previous"
          :disabled="pageNumber <= 1">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="page-item" :class="{'active': index  === pageNumber}"
          v-for="(page, index) in numberOfPages" :key="index">
          <button class="page-link"
            @click="setCurrentPage(index)">{{index + 1}}</button>
        </li>
        <li class="page-item">
          <button class="page-link next" aria-label="Next"
          @click="nextPage"
          :disabled="pageNumber >= numberOfPages - 1">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
    </ul>
  </nav>
</template>

<script>
  const DEFAULT_PER_PAGE = 3;
  const DEFAULT_TOTAL_ROWS = 20;

  function sanitizePerPage(value) {
  const perPage = parseInt(value, 10) || DEFAULT_PER_PAGE;
  return perPage < 1 ? 1 : perPage;
}

function sanitizeTotalRows(value) {
  const totalRows = parseInt(value, 10) || DEFAULT_TOTAL_ROWS
  return totalRows < 0 ? 0 : totalRows
}

const props = {
  perPage: {
    type: [Number, String],
    default: DEFAULT_PER_PAGE
  },
  totalRows: {
    type: [Number, String],
    default: DEFAULT_TOTAL_ROWS
  },
  reviews: {
    type: Array,
    require: true,
    default: () => [],
  },
};

export default {
  name: 'Pagination',
  data() {
    return {
      pageNumber: 0,
      reviewLength: 0,
    };
  },
  props,
  computed: {
    numberOfPages() {
      const result = Math.ceil(sanitizeTotalRows(this.reviews.length) / sanitizePerPage(this.perPage));
      this.reviewLength = result;
      return result < 1 ? 1 : result;
    },
  },
  methods:{
    emitPageNumber() {
      this.$emit('emitPageNumber', this.pageNumber);
    },
    nextPage(){
      this.pageNumber++;
      this.emitPageNumber();
    },
    prevPage(){
      this.pageNumber--;
      this.emitPageNumber();
    },
    setCurrentPage(currentPage) {
      this.pageNumber = currentPage;
      this.emitPageNumber();
    },
  },
  watch: {
    // this is not efficient way to that
    // to reset the page number from list to another
    reviewLength(newValue, oldValue) {
     if(newValue !== oldValue) {
       this.pageNumber = 0;
     }
    },
  },
}
</script>

<style>

</style>
