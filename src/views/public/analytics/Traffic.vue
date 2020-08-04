<template>
  <div class="px-4 lg:px-0 lg:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Traffic
        </h5>
        <our-daterange-picker v-model="dateRange" @input="dateChange" />
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
                <span class="font-bold capitalize">{{totalVisits | numberFormat}} visits</span>
                <span class="text-xs text-gray-96 capitalize">{{dateRange.start | shortDateFormat}} - {{dateRange.end | shortDateFormat}}</span>
              </div>
              <div>
                <our-map :height="275" :seriesData="mapLocationFilteredData" valueKey="visitors"/>
              </div>
            </div>
          </div>
          <div class="statistic-list-container">
            <div class="border border-gray-db">
              <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer">
                <span class="font-bold capitalize">Most viewed pages</span>
                <span class="text-xs text-gray-96 capitalize">{{dateRange.start | shortDateFormat}} - {{dateRange.end | shortDateFormat}}</span>
              </div>
              <div class="py-3 pl-2 pr-3 font-circular border-gray-db text-xs leading-none cursor-pointer flex justify-between items-center accomplishment">
                <span>View more</span>
                <span><fa-icon :icon="['fas', 'arrow-right']"></fa-icon></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <our-tabs :tabs="tabs" @change="setFilter"></our-tabs>
        <div v-if="locationData.length > 0">
          <table class="w-full table-auto mb-10">
            <thead>
              <tr>
                <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Location name</th>
                <th class="w-1/5 py-3 text-left font-circular font-bold border-b border-gray-96">Rank</th>
                <th class="w-1/5 py-3 text-left font-circular font-bold border-b border-gray-96">Visitors</th>
                <!-- <th class="w-1/5 py-3 text-left font-circular font-bold border-b border-gray-96">Members</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="location of locationData"
                :key="location.id"
                @click="selectLocation(location)"
                :class="{active: location.id === selectedLocationId}"
                class="cursor-pointer">
                <td class="border-b border-gray-db py-3 capitalize">
                  {{location.city ? `${location.city}, ` : '-'}}{{location.country || '-'}}
                </td>
                <td class="border-b border-gray-db py-3 font-circular text-sm">
                  {{location.rank || '-'}}
                </td>
                <td class="border-b border-gray-db py-3 font-circular text-sm">
                  {{location.visitors | currencyFormat}}
                </td>
                <!-- <td class="border-b border-gray-db py-3 font-circular text-sm"> -->
                  <!-- {{'-'}} -->
                <!-- </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:px-10 pb-16 lg:pb-0 self-start" ref="stickySidebar">
      <h5 class="text-2xl pb-4 border-b border-primary">
        Location details
      </h5>
      <div v-if="selectedLocationId">
        <p class="text-xl mt-4 font-semibold font-circular">{{locationString}}</p>
        <div class="flex mt-3 justify-between  border-b border-gray-db pb-3">
          <div class="font-circular text-sm">{{selectedLocation.visitors | currencyFormat}} visitors</div>
          <div class="font-circular text-xs text-gray-96">People visiting from {{selectedLocation.city || 'around the world'}}</div>
        </div>
        <div class="flex mt-3 justify-between">
          <div class="font-circular text-sm">Rank (by number of visits)</div>
          <div class="font-circular text-sm">#{{selectedLocation.rank}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import stickbits from 'stickybits';

export default {
  name: 'Traffic',
  data() {
    return {
      locationData: [],
      statisticsService: this.$serviceFactory.statistics,
      locationVisits: 30000,
      selectedLocationId: '',
      selectedLocation: null,
      dateRange: {
        start: moment().startOf('day').toDate(),
        end: moment().endOf('day').toDate(),
      },
      tabs: [{
        label: 'Locations',
        value: 'locations',
      }],
      activeTab: 'locations',
    };
  },
  methods: {
    setFilter(value) {
      this.activeTab = value;
    },
    selectLocation(location) {
      if (!this.selectedLocation || this.selectedLocation.id !== location.id) {
        this.selectedLocation = location;
        this.selectedLocationId = location.id;
      } else {
        this.selectedLocation = null;
        this.selectedLocationId = '';
      }
    },
    async getTrafficData(startDate, endDate) {
      const { data } = await this.statisticsService.getLocationPlot({
        startDate,
        endDate,
      });
      this.locationData = data.data;
    },
    dateChange() {
      this.$nextTick(() => {
        this.getTrafficData(this.dateRange.start, this.dateRange.end);
      });
    },
  },
  computed: {
    totalVisits() {
      return this.locationData.reduce((acc, location) => acc + parseInt(location.visitors, 10), 0);
    },
    locationString() {
      if (!this.selectedLocation.city && !this.selectedLocation.country) {
        return 'City & Country data not available';
      }

      return `${this.selectedLocation.city || 'City data not available'}, ${this.selectedLocation.country || 'Country data not available'}`;
    },
    mapLocationFilteredData() {
      return this.locationData.filter(location => location.longitude && location.latitude);
    },
  },
  async mounted() {
    stickbits(this.$refs.stickySidebar, { stickyBitStickyOffset: 144, useStickyClasses: false });
    this.getTrafficData(this.dateRange.start, this.dateRange.end);
  },
};
</script>

<style lang="scss" scoped>
  tr {
    &.active td {
      @apply border-primary border-b-2;
    }
  }
</style>
