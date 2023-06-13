<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <ul>
      <li v-for="result in searchResults" :key="result.id">{{ result.title }}</li>
    </ul>
  </div>
</template>

<script>
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      searchResults: [],
    };
  },
  mounted() {
    const searchBox = this.$el.querySelector('input');

    const search$ = fromEvent(searchBox, 'input').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => axios.get(`/api/search/?q=${this.searchTerm}`))
    );

    search$.subscribe((response) => {
      this.searchResults = response.data.results;
    });
  },
};
</script>