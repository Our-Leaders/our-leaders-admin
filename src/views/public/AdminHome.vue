<template>
  <div class="lg:flex">
    <div class="xl:w-2/3">
      <div class="banner w-full relative bg-primary h-32 text-white py-5 px-6">
        <h3 class="text-4xl">You're now {{statistics.leaders}} {{'leader' | pluralize(statistics.leaders)}} strong!</h3>
        <p>Keep making African leadership better</p>
      </div>
      <div class="stats flex mt-6">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Current Leaders</p>
          <p class="stat-data">{{statistics.currentLeaders}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Upcoming Leaders</p>
          <p class="stat-data">{{statistics.upcomingLeaders}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Parties</p>
          <p class="stat-data">{{statistics.parties}}</p>
        </div>
        <div class="stat flex-grow pl-10 border-l-2 border-gray-c4">
          <p class="stat-title font-semibold font-circular">Admins</p>
          <p class="stat-data">{{statistics.admins}}</p>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'admin-home',
  data() {
    return {
      statisticsService: this.$serviceFactory.statistics,
    };
  },
  methods: {
    async getStats() {
      const { data } = await this.statisticsService.getStats();
      const { statistics } = data;
      this.$store.commit('storeStatistics', statistics);
    },
  },
  async mounted() {
    await this.getStats();
  },
  computed: {
    ...mapState({
      statistics: 'statistics',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .banner {
    background-image: url("../../assets/img/banner-bg.svg");
    background-size: cover;
  }
</style>
