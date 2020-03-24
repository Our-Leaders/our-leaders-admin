<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex pb-32">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Parties ({{partyCount}})
        </h5>
        <div class="flex justify-between items-center">
          <our-country-selector v-model="country" />
        </div>
      </header>
      <div class="w-full  mt-10">
        <div class="party-grid flex flex-wrap">
          <our-party @click.native="goToPoliticalParty(party.id)" v-for="(party, index) of parties"
                     :key="index" :party="party"/>
        </div>
        <div>
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
            v-model="politicalPartyPagination.page"
            container-class="inline-block">
          </paginate>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10 pr-16 pt-24 mt-2">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(partySearch)">
          <div class="flex w-full">
            <ValidationProvider  rules="required" name="Search Name" v-slot="{ errors }" mode="lazy" slim>
              <input
                type="text"
                name="politician-name-search"
                id="politician-name-search"
                class="w-3/4 pl-1 py-3 field border-b border-gray-c4 mr-2"
                :class="errors.length > 0 ? 'border-red-600' : ''"
                v-model="searchParam.name"
                placeholder="Search by name">
            </ValidationProvider>
            <button
              type="submit"
              class="relative border-gray-96 border py-1 px-3 flex flex-1 items-center justify-center font-circular mr-4">search</button>
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
  name: 'Parties',
  data() {
    return {
      chevronLeft,
      politicalPartyServices: this.$serviceFactory.politicalParty,
      country: 'NG',
      searchParam: {
        name: '',
      },
    };
  },
  methods: {
    async getParties(filter = {}) {
      const { data } = await this.politicalPartyServices.getPoliticalParties(filter);
      const { politicalParties, total: politicalPartyCount } = data;
      this.$store.commit('storePoliticalParties', { politicalParties, politicalPartyCount });
    },
    goToPoliticalParty(id) {
      this.$router.push({ name: 'party-details', params: { id } });
    },
    async handlePageChange(pageNumber) {
      const filter = {};
      this.$store.commit('changePartyPageNumber', pageNumber);
      if (this.searchParam.name) {
        filter.name = this.searchParam.name;
      }

      await this.getParties({ skip: (pageNumber - 1) * this.politicalPartyPagination.numberPerPage, ...filter });
    },
    async partySearch() {
      this.$store.commit('resetPartyPagination');
      await this.getParties({ name: this.searchParam.name });
    },
  },
  computed: {
    ...mapState({
      parties: 'politicalParties',
      partyCount: 'politicalPartyCount',
      politicalPartyPagination: 'politicalPartyPagination',
    }),
    ...mapGetters({
      pageCount: 'getPoliticalPartyPageCount',
    }),
  },
  async mounted() {
    await this.getParties({ skip: (this.politicalPartyPagination.page - 1) * this.politicalPartyPagination.numberPerPage });
  },
};
</script>

<style lang="scss" scoped>
  .party-grid {
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
