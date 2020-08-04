<template>
  <div class="lg:flex">
    <div class="w-full xl:w-2/3 px-4 lg:px-0">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Donations
        </h5>
      </header>
      <div class="stats flex mt-12">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total amt. donated</p>
          <p class="stat-data">
            {{getCurrency(tabValue)}}{{totalAmountDonated | currencyFormat}}
          </p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total donations</p>
          <p class="stat-data">{{donationData.length}}</p>
        </div>
      </div>
      <div class="py-5">
        <our-tabs :tabs="tabs" @change="tabChange">
          <our-daterange-picker v-model="dateRange" @input="dateChange" />
        </our-tabs>
      </div>
      <div class="mt-5">
        <our-line-chart
          :seriesData="donationPlot"
          xAxisValue="date"
          yAxisValue="donations"
          :chartConfig="chartConfig[tabValue]"
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
              v-for="donation of donationsToDisplay"
              :key="donation.id">
              <td class="border-b border-gray-db py-3 capitalize">
                {{donation.name || 'Anonymous Donation'}}
              </td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{donation.email || '-'}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{donation.date | dateFormat('/')}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular font-semibold">
                {{getCurrency(donation.currency)}} {{donation.amount | currencyFormat}}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-6 mb-20">
          <paginate
            :page-count="pageCount"
            :prev-text="`<img src='${chevronLeft}' alt='dropdown indicator' style='height: 1.5rem;'>`"
            :next-text="`<img src='${chevronLeft}' alt='dropdown indicator' class='transform rotate-180' style='height: 1.5rem;'>`"
            page-link-class="px-3 py-1 block"
            next-link-class="px-3 py-1 block"
            prev-link-class="px-3 py-1 block"
            page-class="font-circular border border-gray-96 inline-block ml-2"
            next-class="font-circular border border-gray-96 inline-block ml-2 align-bottom"
            prev-class="font-circular border border-gray-96 inline-block align-bottom"
            active-class="text-white bg-primary border-primary"
            disabled-class="border-gray-c4 text-gray-96"
            :click-handler="handlePageChange"
            v-model="page"
            container-class="inline-block" />
        </div>
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

import chevronLeft from '@/assets/img/chevron-left.svg';

export default {
  name: 'Donations',
  data() {
    return {
      chevronLeft,
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
      chartConfig: {},
      page: 1,
    };
  },
  methods: {
    getCurrency(currency) {
      switch (currency) {
        case 'naira':
          return '₦';
        case 'dollars':
          return '$';
        case 'dollar':
          return '$';
        default:
          return '';
      }
    },
    tabChange(tab) {
      this.tabValue = tab;
    },
    async getDonationPlotData(startDate, endDate) {
      try {
        const result = await this.donationsService.getDonationPlotStats({ startDate, endDate });
        const { donations: donationPlotData } = result.data;
        this.donationPlotData = {};
        this.tabs = donationPlotData.map((value) => {
          const { currency, data } = value;
          this.donationPlotData[currency] = data;
          this.chartConfig[currency] = {
            numberFormat: `${this.getCurrency(value.currency)}#,###`,
          };

          return {
            label: `Donations (${this.getCurrency(currency)})`,
            value: currency,
          };
        });
      } catch (err) {
        this.tabs = [];
        this.donationPlot = {};
      } finally {
        if (this.tabs.length === 0) {
          this.tabs = [
            {
              label: 'Donations',
              value: '',
            },
          ];
        }
      }
    },
    async getDonations(startDate, endDate) {
      const { data } = await this.donationsService.getDonations({ startDate, endDate });
      this.donationData = data.donations || [];
    },
    handlePageChange(pageNumber) {
      this.page = pageNumber;
    },
    dateChange() {
      this.$nextTick(() => {
        this.getDonationPlotData(this.dateRange.start, this.dateRange.end);
        this.getDonations(this.dateRange.start, this.dateRange.end);
      });
    },
  },
  computed: {
    donationPlot() {
      return this.donationPlotData[this.tabValue] || [];
    },
    totalAmountDonated() {
      if (this.donationData.length > 0) {
        return this.donationData.filter(x => x.currency === this.tabValue)
          .reduce((acc, x) => acc + x.amount, 0);
      }

      return 0;
    },
    pageCount() {
      if (this.donationData.length > 0) {
        return Math.ceil(this.donationData.length / 10);
      }

      return 1;
    },
    donationsToDisplay() {
      const startIndex = (this.page - 1) * 10;
      const endIndex = this.page * 10;

      return this.donationData.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    this.getDonationPlotData(this.dateRange.start, this.dateRange.end);
    this.getDonations(this.dateRange.start, this.dateRange.end);
  },
};
</script>

<style lang="scss" scoped>

</style>
