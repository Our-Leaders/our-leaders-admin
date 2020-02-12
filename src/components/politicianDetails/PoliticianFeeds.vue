<template>
  <div>
    <div v-if="feeds.length > 0">
      <div v-for="(months, year) of parsedFeeds" :key="year">
        <div v-for="(feeds, month) of months" :key="`${year}-${month}`">
          <p class="font-circular text-xl font-semibold w-full mb-5">{{month}} {{year}}</p>
          <div v-for="(feed, index) of feeds" :key="feed.id" class="feed border-t border-gray-db relative block">
            <input type="checkbox" :name="`${feed.id}-${index}`" :id="`${feed.id}-${index}`" class="invisible absolute">
            <label :for="`${feed.id}-${index}`">
              <header class="py-4 cursor-pointer">
                <div class="relative flex justify-between items-center">
                  <span class="font-semibold capitalize font-circular">{{feed.title}}</span>
                  <span class="flex">
                    <span class="text-xs text-gray-96 font-circular mr-2">Published {{feed.publishedAt | shortDateFormat}}</span>
                    <img src="./../../assets/img/chevron-down.svg" alt="chevron-down">
                  </span>
                </div>
              </header>
            </label>
            <div class="mb-4 feed-detail">
              <p class="pr-12">{{feed.summary}}</p>
              <a class="mt-8 flex justify-between items-center" :href="feed.feedUrl" target="_blank"  rel="noreferrer">
                <p class="font-circular text-xs text-gray-96">from {{getUrlHost(feed.feedUrl)}}</p>
                <span class="flex">
                  <span class="font-circular text-xs mr-2">Read Full Story</span>
                  <img src="./../../assets/img/chevron-left.svg" class="transform rotate-180" :alt="`read more at ${getUrlHost(feed.feedUrl)}`">
                </span>
              </a>
            </div>
          </div>
       </div>
     </div>
    </div>
    <div v-else class="text-center my-6">
      <span>No recent updates.</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PoliticianFeeds',
  props: {
    politician: {
      type: Object,
    },
  },
  data() {
    return {
      feedsServices: this.$serviceFactory.feeds,
      feeds: [],
      loading: false,
    };
  },
  methods: {
    async getUpdates() {
      const { id } = this.politician;
      try {
        const response = await this.feedsServices.getUpdates(id);
        this.feeds = response.data.feeds;
      } catch (error) {
        this.loading = false;
        // this.displayError(error);
      }
    },
    getUrlHost(url = '') {
      return url.match(/(?<=^((http[s]?):\/)?\/?)([^:/\s]+)((\/\w+)*\/)/g)[0].replace('/', '');
    },
  },
  computed: {
    parsedFeeds() {
      return this.feeds.reduce((agg, val) => {
        const momentDate = moment(val.publishedAt);
        const year = momentDate.format('YYYY');
        const month = momentDate.format('MMMM');
        const gg = { ...agg };

        if (!gg[year]) {
          gg[year] = {};
        }

        if (!gg[year][month]) {
          gg[year][month] = [];
        }

        gg[year][month].push(val);
        return gg;
      }, {});
    },
  },
  async mounted() {
    await this.getUpdates();
  },
};
</script>

<style lang="scss" scoped>
  .feed-detail {
    display: none;
  }

  .feed header img {
    transition: 0.4s transform;
  }

  .feed input[type="checkbox"]:checked ~ label header img {
    transform: rotate(180deg);
  }

  .feed input[type="checkbox"]:checked ~ .feed-detail {
    display: block;
  }
</style>
