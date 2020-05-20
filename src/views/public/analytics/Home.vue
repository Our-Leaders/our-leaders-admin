<template>
<div class="lg:pr-2 xl:pr-0 xl:flex pb-32">
  <div class="w-full xl:w-2/3">
    <header class="flex justify-between">
      <h5 class="text-4xl">
        Analytics
      </h5>
      <div class="flex justify-between items-center">
        <button class="border-black border py-1 w-32 text-center font-circular mr-3">Traffic</button>
        <button class="border-black border py-1 w-32 text-center font-circular">Signups</button>
      </div>
    </header>
     <div class="stats flex mt-12">
      <div class="stat flex-grow">
        <p class="stat-title font-semibold font-circular">Current Leaders</p>
        <p class="stat-data">6</p>
        <!-- <p class="stat-data">{{statistics.currentLeaders}}</p> -->
      </div>
      <div class="stat flex-grow">
        <p class="stat-title font-semibold font-circular">Upcoming Leaders</p>
        <p class="stat-data">6</p>
        <!-- <p class="stat-data">{{statistics.upcomingLeaders}}</p> -->
      </div>
      <div class="stat flex-grow">
        <p class="stat-title font-semibold font-circular">Parties</p>
        <p class="stat-data">6</p>
        <!-- <p class="stat-data">{{statistics.parties}}</p> -->
      </div>
      <div class="stat flex-grow pl-10 border-l-2 border-gray-c4">
        <p class="stat-title font-semibold font-circular">Admins</p>
        <p class="stat-data">6</p>
        <!-- <p class="stat-data">{{statistics.admins}}</p> -->
      </div>
    </div>
    <div class="w-full mt-10">
      <our-tabs :tabs="tabs" @change="tabChange"/>
      <div class="mt-4">
        <our-line-chart
          v-bind="{...selectedData}"/>
      </div>
    </div>
  </div>
  <div class="w-full xl:w-1/3 xl:ml-10 pr-16 pt-24 mt-2"></div>
</div>
</template>

<script>
import { visitorData, signupData } from './analyticsTestData';

export default {
  name: 'AnalyticsHome',
  data() {
    return {
      tabs: [{
        label: 'Visits',
        value: 'visits',
      }, {
        label: 'Signups',
        value: 'signups',
      }],
      tabValue: 'visits',
      chartData: {
        visits: {
          seriesData: visitorData,
          xAxisValue: 'date',
          yAxisValue: 'value',
        },
        signups: {
          seriesData: signupData,
          xAxisValue: 'date',
          yAxisValue: 'value',
        },
      },
    };
  },
  computed: {
    selectedData() {
      return this.chartData[this.tabValue];
    },
  },
  methods: {
    tabChange(tab) {
      this.tabValue = tab;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
