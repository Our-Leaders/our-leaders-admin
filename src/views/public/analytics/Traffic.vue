<template>
  <div class="lg:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Traffic
        </h5>
        <our-daterange-picker v-model="dateRange" />
      </header>
       <div class="stats flex mt-12">
      <div class="stat flex-grow">
        <p class="stat-title font-semibold font-circular">Total pages</p>
        <p class="stat-data">6</p>
        <!-- <p class="stat-data">{{statistics.currentLeaders}}</p> -->
      </div>
      <div class="stat flex-grow">
        <p class="stat-title font-semibold font-circular">Total external links</p>
        <p class="stat-data">6</p>
        <!-- <p class="stat-data">{{statistics.upcomingLeaders}}</p> -->
      </div>
    </div>
    <div class="mt-12">
      <div class="flex flex-wrap justify-between">
        <div class="statistic-list-container">
          <div class="border border-gray-db">
            <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer">
              <span class="font-bold capitalize">{{locationVisits | numberFormat}} visits</span>
              <span class="text-xs text-gray-96 capitalize">Today</span>
            </div>
            <div>
              <our-map :height="275" :seriesData="locationData"/>
            </div>
          </div>
        </div>
        <div class="statistic-list-container">
          <div class="border border-gray-db">
            <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer">
              <span class="font-bold capitalize">Most viewed pages</span>
              <span class="text-xs text-gray-96 capitalize">Today</span>
            </div>
            <div class="py-3 pl-2 pr-3 font-circular border-gray-db text-xs leading-none cursor-pointer flex justify-between items-center accomplishment">
              <span>View more</span>
              <span><fa-icon :icon="['fas', 'arrow-right']"></fa-icon></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="w-full xl:w-1/3 xl:px-10 self-start"></div>
  </div>
</template>

<script>
import moment from 'moment';
import { visitorLocationData } from './analyticsTestData';

export default {
  name: 'Traffic',
  data() {
    return {
      locationData: visitorLocationData,
      locationVisits: 30000,
      dateRange: {
        start: moment().startOf().subtract(1, 'months').toDate(),
        end: new Date(),
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
