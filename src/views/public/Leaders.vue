<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Leaders <!-- ({{leadersCount}}) -->
        </h5>
        <div class="flex justify-between items-center">
          <button class="relative border-black border w-full py-1 px-3 flex justify-between items-center font-circular mr-4">Leader Updates</button>
          <our-country-selector v-model="country" />
        </div>
      </header>
      <div class="w-full mt-10">
        <our-tabs :tabs="tabs" @change="setLeaderFilter" v-if="!hideTab"/>

        <p class="font-circular text-gray-c4 text-sm pt-5 pb-5" v-if="!hideTab">
          <!-- {{filteredLeadersCount}} --> {{ leaderStatusFilter === 'current' ? 'Current' : 'Contesting'}} Leaders
        </p>
        <div>
          <div class="w-full text-center" v-if="loading">
            <span class="loading lg mx-auto mb-2"></span>
            <span>Loading Leaders...</span>
          </div>
          <div v-else>
            <div v-if="leaders.length === 0" class="w-full text-center mt-4 mb-8">
              <span>Sorry, there are no politicians matching your search.</span>
            </div>
            <div class="leaders-grid flex flex-wrap" v-else>
              <our-politician v-for="(leader, index) of leaders" :key="index" :politician="leader" @click.native="goToPolitician(leader.id)"/>
            </div>
          </div>
        </div>
        <div v-if="!loading  && leaders.length > 0">
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
            v-model="politicianPagination.page"
            container-class="inline-block">
          </paginate>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10 pr-16 pt-20 mt-2">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(searchByName)">
          <div class="flex w-full">
            <ValidationProvider  rules="required" name="Search Name" v-slot="{ errors }" mode="lazy" slim>
              <input
                type="text"
                name="politician-name-search"
                id="politician-name-search"
                class="w-4/5 pl-1 py-3 field border-b border-gray-c4 mr-2"
                :class="errors.length > 0 ? 'border-red-600' : ''"
                v-model="searchParam.name"
                placeholder="Search by name">
            </ValidationProvider>
            <button
              type="submit"
              class="relative border-gray-96 border py-1 px-3 flex justify-between items-center font-circular mr-4">search</button>
          </div>
        </form>
      </ValidationObserver>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(searchByOtherParam)">
        <div class="mt-6 flex items-center">
          <div class="border-b border-gray-db h-0 flex-auto mr-3"></div>
          <p class="text-gray-96">or search by</p>
          <div class="border-b border-gray-db h-0 flex-auto ml-3"></div>
        </div>
        <div class="mt-6">
          <label for="last-name" class="font-circular">Political Position</label>
          <input
            type="text"
            name="politician-position-search"
            id="politician-position-search"
            v-model="searchParam.politicalPosition"
            class="w-full pl-1 py-2 field border-b border-gray-400 mr-2">
        </div>
        <div class="mt-6">
          <label for="last-name" class="font-circular">Political Party</label>
          <v-select
            id="politician-party-search"
            name="politician-party-search"
            label="name"
            :reduce="party => party.id"
            :clearable="true"
            :options="politicalParties"
            v-model="searchParam.politicalPartyId"
            class="our-select"></v-select>
        </div>
        <div class="mt-6">
          <label for="last-name" class="font-circular">Status</label>
          <v-select
            id="politician-status-search"
            name="politician-status-search"
            :clearable="true"
            :options="['upcoming', 'current', 'past']"
            v-model="searchParam.status"
            class="our-select"></v-select>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full relative border-black border p-3 text-center font-circular mr-4">Search</button>
        </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

// images
import chevronLeft from '@/assets/img/chevron-left.svg';

export default {
  name: 'Leaders',
  data() {
    return {
      chevronLeft,
      politicianServices: this.$serviceFactory.politicians,
      politicalPartyServices: this.$serviceFactory.politicalParty,
      country: 'NG',
      leaderStatusFilter: 'current',
      tabs: [{
        label: 'Current Leaders',
        value: 'current',
      }, {
        label: 'Upcoming Leaders',
        value: 'upcoming',
      }],
      politicalParties: [],
      loading: false,
      searchParam: {
        name: '',
        politicalPosition: '',
        status: '',
        partyId: '',
      },
      hideTab: false,
    };
  },
  methods: {
    async setLeaderFilter(value) {
      this.leaderStatusFilter = value;
      await this.getPoliticians({ status: value });
    },
    async getPoliticians(filter) {
      this.loading = true;
      const { data } = await this.politicianServices.getPoliticians(filter);
      const { politicians, total: politicianCount } = data;
      this.$store.commit('storePoliticians', { politicians, politicianCount });
      this.loading = false;
    },
    goToPolitician(id) {
      this.$router.push({ name: 'leaders-details', params: { id } });
    },
    async handlePageChange(pageNumber) {
      this.$store.commit('changePoliticianPageNumber', pageNumber);
      await this.getPoliticians({ skip: (pageNumber - 1) * this.politicianPagination.numberPerPage });
    },
    async searchByName() {
      this.hideTab = true;
      this.$store.commit('resetPoliticiansPageNumber');
      await this.getPoliticians({ name: this.searchParam.name });
    },
    async searchByOtherParam() {
      this.hideTab = true;
      this.$store.commit('resetPoliticiansPageNumber');
      const query = Object.keys(this.searchParam).filter(param => param !== 'name').reduce((prev, curr) => {
        if (this.searchParam[curr]) {
          return { ...prev, [curr]: this.searchParam[curr] };
        }

        return prev;
      }, {});

      await this.getPoliticians(query);
    },
  },
  async mounted() {
    await this.getPoliticians({
      skip: (this.politicianPagination.page - 1) * this.politicianPagination.numberPerPage,
      country: 'NG',
      status: this.leaderStatusFilter,
    });

    const { data } = await this.politicalPartyServices.getPoliticalParties({ skip: 0 });
    const { politicalParties } = data;
    this.politicalParties = politicalParties;
  },
  computed: {
    ...mapState({
      politicianCount: 'politicianCount',
      leaders: state => state.politicians || [],
      politicianPagination: 'politicianPagination',
    }),
    ...mapGetters({
      pageCount: 'getPoliticianPageCount',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .leader-nav > div {
      & > .active {
      position: absolute;
      height: 0;
      width: 0;
      border-top: 10px solid transparent;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 10px solid #C79947;
      bottom: 0;
      margin: auto;
      left: 50%;
      transform: translateX(-50%);

      &::before {
        content: '';
        position: relative;
        height: 0;
        width: 0;
        border-top: 9px solid transparent;
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-bottom: 10px solid #fff;
        display: block;
        top: -8px;
        left: -13px;
      }
    }

    &.selected {
      @apply font-semibold;
    }
  }

  .leaders-grid {
    margin: -1rem;

    @screen sm {
      margin: -1rem;
    }

    @screen lg {
      margin: -0.5rem;
    }

    @screen xl {
      margin: -0.7rem;
    }
  }
</style>
