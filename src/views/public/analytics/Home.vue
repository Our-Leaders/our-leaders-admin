<template>
<div class="px-4 lg:pl-0 lg:pr-2 xl:pr-0 xl:flex pb-32">
  <div class="w-full xl:w-2/3">
    <header class="flex flex-wrap lg:flex-no-wrap justify-between">
      <h5 class="w-full text-4xl mb-6 lg:mb-0">
        Analytics
      </h5>
      <div class="flex items-center">
        <router-link :to="{ name: 'analytics-traffic' }" class="border-black border py-1 w-32 text-center font-circular mr-3">Traffic</router-link>
        <router-link :to="{ name: 'analytics-signups' }" class="border-black border py-1 w-32 text-center font-circular">Signups</router-link>
      </div>
    </header>
     <div class="stats flex flex-wrap mt-6 lg:mt-12">
      <div class="stat w-1/2 lg:w-1/4">
        <p class="stat-title font-semibold font-circular">Current Leaders</p>
        <p class="stat-data">{{statistics.currentLeaders}}</p>
      </div>
      <div class="stat w-1/2 lg:w-1/4 mb-4 lg:mb-0">
        <p class="stat-title font-semibold font-circular">Upcoming Leaders</p>
        <p class="stat-data">{{statistics.upcomingLeaders}}</p>
      </div>
      <div class="stat w-1/2 lg:w-1/4">
        <p class="stat-title font-semibold font-circular">Parties</p>
        <p class="stat-data">{{statistics.parties}}</p>
      </div>
      <div class="stat w-1/2 lg:w-1/4 lg:pl-10 lg:border-l-2 border-gray-c4">
        <p class="stat-title font-semibold font-circular">Admins</p>
        <p class="stat-data">{{statistics.admins}}</p>
      </div>
    </div>
    <div class="w-full mt-10">
      <our-tabs :tabs="tabs" @change="tabChange">
        <our-daterange-picker v-model="dateRange" @input="dateChange" />
      </our-tabs>
      <div class="mt-4">
        <our-line-chart
          v-bind="{...selectedData}"/>
      </div>
      <div class="mt-10">
        <!-- <p class="font-circular text-xl font-semibold w-full mb-5">Statistics</p> -->
        <div class="flex flex-wrap justify-between">
          <!-- top viewed page -->
          <!-- <div class="w-full lg:w-1/2 mb-4 lg:pr-2">
            <div class="border border-gray-db">
              <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer">
                <span class="font-bold capitalize">Top viewed page</span>
                <span class="text-xs text-gray-96 capitalize">Today</span>
              </div>
              <div
                class="py-2 px-2 border-b border-gray-db leading-none relative accomplishment flex justify-between items-center"
                v-for="page of statistics.topPages" :key="page.url">
                <span>{{page.name}}</span>
                <span class="text-xs text-gray-96 font-circular">{{page.viewCount | currencyFormat}}</span>
              </div>
              <div class="py-3 pl-2 pr-3 font-circular border-gray-db text-xs leading-none cursor-pointer flex justify-between items-center accomplishment">
                <span>View more</span>
                <span><fa-icon :icon="['fas', 'arrow-right']"></fa-icon></span>
              </div>
            </div>
          </div> -->

          <!-- traffic stats -->
          <!-- <div class="w-full lg:w-1/2 mb-4 lg:pl-2">
            <div class="border border-gray-db">
              <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer">
                <span class="font-bold capitalize">Traffic stats</span>
                <span class="text-xs text-gray-96 capitalize">Today</span>
              </div>
              <div class="py-3 pl-2 pr-3 font-circular border-gray-db text-xs leading-none cursor-pointer flex justify-between items-center accomplishment">
                <span>View more</span>
                <span><fa-icon :icon="['fas', 'arrow-right']"></fa-icon></span>
              </div>
            </div>
          </div> -->

          <!-- most clicked links -->
          <!-- <div class="w-full lg:w-1/2 mb-4 lg:pr-2">
            <div class="border border-gray-db">
              <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer">
                <span class="font-bold capitalize">Most clicked links</span>
                <span class="text-xs text-gray-96 capitalize">Today</span>
              </div>
              <div class="py-3 pl-2 pr-3 font-circular border-gray-db text-xs leading-none cursor-pointer flex justify-between items-center accomplishment">
                <span>View more</span>
                <span><fa-icon :icon="['fas', 'arrow-right']"></fa-icon></span>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div class="w-full xl:w-1/3 xl:ml-10 lg:pr-16 mt-2">
    <header class="flex justify-between items-center border-b border-primary pb-5">
      <p class="text-2xl">Recent Signups</p>
      <p class="text-sm font-circular">{{statistics.signUps.length}} new today</p>
    </header>
    <div v-if="statistics.signUps.length > 0">
      <div class="overflow-y-scroll signup-panel">
        <div v-for="(signUp, index) of statistics.signUps" :key="signUp.email">
          <div
            v-if="showMoreSignups || index < signupCountLimit"
            class="flex justify-between items-center pt-6">
            <p class="text-sm font-circular">{{signUp.email}}</p>
            <p class="text-sm font-circular text-gray-96">{{formatSignupDate(signUp.createdAt)}}</p>
          </div>
        </div>
      </div>
      <button
        v-if="statistics.signUps.length > signupCountLimit"
        @click="toggleViewMore"
        class="border-black border py-3 w-32 text-center w-full font-circular mt-5">
        <span v-if="!showMoreSignups">View more</span>
        <span v-else>Hide details</span>
      </button>
    </div>
    <div v-else class="flex items-center justify-center text-center text-2xl text-gray-c4 mt-20">
      No Signups today
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'AnalyticsHome',
  data() {
    return {
      showMoreSignups: false,
      signupCountLimit: 10,
      statisticsService: this.$serviceFactory.statistics,
      tabs: [{
        label: 'Visits',
        value: 'visits',
      }, {
        label: 'Signups',
        value: 'signups',
      }],
      tabValue: 'visits',
      startDate: moment(new Date(2020, 3, 5)).startOf('day'),
      endDate: moment(new Date(2020, 4, 30)).startOf('day'),
      dateRange: {
        start: moment().startOf('day').subtract(1, 'months').toDate(),
        end: new Date(),
      },
    };
  },
  computed: {
    ...mapState({
      statistics: state => state.statistics,
    }),
    selectedData() {
      return this.chartData[this.tabValue];
    },
    chartData() {
      return {
        visits: {
          seriesData: this.statistics.visitStats,
          xAxisValue: 'date',
          yAxisValue: 'visits',
        },
        signups: {
          seriesData: this.statistics.signUpStats,
          xAxisValue: 'date',
          yAxisValue: 'signUps',
        },
      };
    },
  },
  methods: {
    formatSignupDate(date) {
      return date ? moment(date).format('hh:mm a') : '-';
    },
    toggleViewMore() {
      this.showMoreSignups = !this.showMoreSignups;
    },
    tabChange(tab) {
      this.tabValue = tab;
    },
    async getStats() {
      const { dateRange } = this;
      const { start, end } = dateRange;
      const response = await Promise.all([
        this.statisticsService.getVisits({ startDate: start, endDate: end }),
        this.statisticsService.getSignups({ startDate: start, endDate: end }),
        this.statisticsService.getStats(),
      ]);

      const [visits, signUps, stats] = response;
      const payload = {
        ...stats.data.statistics,
        signUpStats: signUps.data?.signUps ?? [],
        visitStats: visits.data?.visits ?? [],
      };
      this.$store.commit('storeStatistics', payload);
    },
    dateChange() {
      this.$nextTick(async () => {
        const { dateRange } = this;
        const { start, end } = dateRange;
        const response = await Promise.all([
          this.statisticsService.getVisits({ startDate: start, endDate: end }),
          this.statisticsService.getSignups({ startDate: start, endDate: end }),
        ]);

        const [visits, signUps] = response;
        const payload = {
          signUpStats: signUps.data?.signUps ?? [],
          visitStats: visits.data?.visits ?? [],
        };
        this.$store.commit('storeStatistics', payload);
      });
    },
    async getGneralStats() {
      const { data } = await this.statisticsService.getStats();
      const { statistics } = data;
      this.$store.commit('storeStatistics', statistics);
    },
  },
  async mounted() {
    await this.getStats();
    await this.getGneralStats();
  },
};
</script>

<style lang="scss" scoped>
.signup-panel {
  max-height: 70vh;
}
</style>
