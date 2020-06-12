<template>
  <div class="lg:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Donations
        </h5>
        <!-- <our-daterange-picker v-model="dateRange" /> -->
      </header>
      <div class="stats flex mt-12">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total amt. donated</p>
          <p class="stat-data">N 325,500</p>
          <!-- <p class="stat-data">{{statistics.currentLeaders}}</p> -->
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total donations</p>
          <p class="stat-data">6</p>
          <!-- <p class="stat-data">{{statistics.upcomingLeaders}}</p> -->
        </div>
      </div>
      <div class="py-5">
        <our-tabs :tabs="tabs" @change="tabChange">
          <our-daterange-picker v-model="dateRange" />
        </our-tabs>
      </div>
      <div class="mt-5">
        <our-line-chart
          :seriesData="donationPlot"
          xAxisValue="date"
          yAxisValue="donations"
        />
      </div>
      <div class="mt-10" v-if="donationData.length > 0">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Name</th>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Email</th>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Date</th>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="donation of donationData"
              :key="donation.id">
              <td class="border-b border-gray-db py-3 capitalize">
                {{donation.name || 'Anonymous Donation'}}
              </td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{donation.email || '-'}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{donation.date | dateFormat('/')}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular text-semibold">
                {{getCurrency(donation.currency)}} {{donation.amount | currencyFormat}}
              </td>
            </tr>
          </tbody>
         </table>
      </div>
      <div v-else class="mt-10 flex items-center justify-center text-center text-2xl text-gray-c4 mt-20">
        No Donations for the selected dates
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:px-10 self-start"></div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Donations',
  data() {
    return {
      donationsService: this.$serviceFactory.donations,
      donationData: [],
      donationPlotData: {},
      dateRange: {
        start: moment().startOf('day').subtract(1, 'months').toDate(),
        end: new Date(),
      },
      tabs: [],
      tabValue: '',
      xAxisValue: 'date',
      yAxisValue: 'donations',
    };
  },
  methods: {
    getCurrency(currency) {
      switch (currency) {
        case 'naira':
          return '₦';
        case 'dollars':
          return '$';
        default:
          return '-';
      }
    },
    tabChange(tab) {
      this.tabValue = tab;
    },
    async getDonationPlotDate(startDate, endDate) {
      const result = await this.donationsService.getDonationPlotStats({ startDate, endDate });
      const { donations: donationPlotData } = result.data;
      this.tabs = donationPlotData.map((value) => {
        const { currency, data } = value;
        this.donationPlotData[currency] = data;
        return {
          label: `Donations (${this.getCurrency(value.currency)})`,
          value: value.currency,
        };
      });
    },
    async getDonations(startDate, endDate) {
      const { data } = await this.donationsService.getDonations({ startDate, endDate });
      this.donationData = data.donations || [];
    },
  },
  computed: {
    donationPlot() {
      return this.donationPlotData[this.tabValue] || [];
    },
  },
  async mounted() {
    this.getDonationPlotDate(this.dateRange.start, this.dateRange.end);
    this.getDonations(this.dateRange.start, this.dateRange.end);
  },
};
</script>

<style lang="scss" scoped>

</style>
