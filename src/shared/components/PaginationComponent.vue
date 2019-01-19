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
        <li class="page-item" :class="{active: index  === pageNumber}"
          v-for="(page, index) in numberOfPages" :key="index">
          <button class="page-link"
            @click="setCurrentPage(index)">{{index + 1}}</button>
        </li>
        <li class="page-item">
          <button class="page-link" aria-label="Next"
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
  },
};

export default {
  name: 'Pagination',
  data() {
    return {
      pageNumber: 0,
    };
  },
  props,
  computed: {
    numberOfPages() {
      const result = Math.ceil(sanitizeTotalRows(this.reviews.length) / sanitizePerPage(this.perPage));
      return result < 1 ? 1 : result;
    },
    pageCount(){
      let l = this.reviews.length,
          s = this.perPage;
      return Math.ceil(l/s);
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
}
</script>

<style>

</style>
