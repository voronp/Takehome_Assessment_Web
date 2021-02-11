<template>
  <div>
    <div>
      <div class="podcast__inputs">
        <base-search v-model="searchText" />
        <select name="playSequence" @change="onSelectMedia">
          <option value="">all</option>
          <option value="episodic">episodic</option>
          <option value="serial">serial</option>
        </select>
      </div>
      <div class="podcast__tags">
        <base-tag
                v-for="tag in tags"
                :key="tag"
                :text="tag"
                :value="tag"
                :is-active="selectedTag === tag"
                :click="clickTag"
        />
      </div>
    </div>
    <podcast-list v-if="podcastList.length" :items="podcastList">
      <template #item="item" >
        <BaseCard v-bind="item" />
      </template>
    </podcast-list>
    <div v-if="isLoading">Loading....</div>
    <div v-else-if="!podcastList.length">Sorry, have no data</div>
  </div>
</template>

<script>
import BaseSearch from './BaseSearch';
import PodcastList from './PodcastList';
import BaseCard from './BaseCard';
import BaseTag from './BaseTag';
import api from '@/api';
import {debounce} from 'lodash'

const fetchFunction = function (params, increment = false) {
  this.isLoading = true;
  params = {p: this.currentPage, l: this.itemsPerPage, ...params}
  api.getJson('/podcasts', params)
      .then(res => {
        this.podcasts = increment ? [...this.podcasts, ...res] : res;
        if(res.length < this.itemsPerPage) {
          this.isLastPage = true
        }
      })
      .catch(e => this.error = e.message)
      .finally(() => this.isLoading = false)
}

export default {
  name: 'Home',
  components: {
    BaseSearch,
    PodcastList,
    BaseCard,
    BaseTag,
  },
  props: {

  },
  computed: {
    tags() {
      return Object.keys(this.tagDict).filter(v => v);
    },
    podcastList() {
      return this.podcasts.filter(v => !this.playSequence || this.playSequence === v.playSequence )
    },
  },
  data() {
    return {
      searchText: '',
      isLoading: false,
      error: null,
      isLastPage: false,
      podcasts: [],
      tagDict: {},
      selectedTag: null,
      playSequence: null,
      currentPage: 1,
      itemsPerPage: 9,
    }
  },
  watch: {
    searchText(search) {
      this.selectedTag = null;
      this.isLastPage = false;
      this.currentPage = 1;
      this.debouncedFetch({search});
    },
    podcasts(items) {
      this.tagDict = {...this.tagDict, ...items.reduce((acc, v) => ((acc[v.categoryName] = true) && acc), {})};
    }
  },
  methods: {
    onSelectMedia(event) {
      this.playSequence = event.target.value || null
    },
    clickTag(tag) {
      this.searchText = ''
      this.selectedTag = tag
      this.isLastPage = false;
      this.currentPage = 1;
      this.fetchData({categoryName: tag})
    },
    fetchData: fetchFunction,
    processBottom() {
      console.log('bottom', this.isLastPage);
      if(!this.isLastPage) {
        this.currentPage ++;
        this.fetchData(this.selectedTag ? {categoryName: this.selectedTag} : {search: this.searchText}, true)
      }
    },
    scrollListener: debounce(function () {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.processBottom()
      }
    }, 250, {leading: true}),
    debouncedFetch: debounce(fetchFunction, 500, {leading: false})
  },
  created() {
    this.fetchData();
    window.addEventListener('scroll', this.scrollListener, {passive: true})
  },
  beforeDestroy() {
    console.log('remove scrollListener');
    document.documentElement.removeEventListener('endOfPage', this.scrollListener)
  },
}
</script>
<style scoped lang="css">
  .podcast__tags {
    width: 80%;
  }
  .podcast__inputs {
    padding: 5px;
  }
  .podcast__inputs > * {
    display: inline-block;
  }
</style>
