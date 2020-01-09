<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
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
          <our-party @click.native="goToPoliticalParty(party.id)" v-for="(party, index) of parties" :key="index" :party="party"></our-party>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10">
      aside
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Parties',
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      country: 'ngr',
    };
  },
  methods: {
    async getParties() {
      // const query = { status };
      const { data } = await this.politicalPartyServices.getPoliticalParties();
      const { politicalParties } = data;
      this.$store.commit('storePoliticalParties', politicalParties);
    },
    goToPoliticalParty(id) {
      this.$router.push({ name: 'party-details', params: { id } });
    },
  },
  computed: {
    ...mapState({
      parties: 'politicalParties',
    }),
    ...mapGetters({
      partyCount: 'politicalPartyCount',
    }),
  },
  async mounted() {
    await this.getParties();
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
