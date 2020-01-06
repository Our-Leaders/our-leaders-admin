<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Leaders ({{leadersCount}})
        </h5>
        <div class="flex justify-between items-center">
          <button class="relative border-black border w-full py-1 px-3 flex justify-between items-center font-circular mr-4">Leader Updates</button>
          <our-country-selector v-model="country" />
        </div>
      </header>
      <div class="w-full mt-10">
        <our-tabs :tabs="tabs" @change="setLeaderFilter"></our-tabs>
        <p class="font-circular text-gray-c4 text-sm pt-5 pb-5">
          {{filteredLeadersCount}} {{ leaderFilter === 'current' ? 'Current' : 'Contesting'}} Leaders
        </p>
        <div class="leaders-grid flex flex-wrap">
          <our-politician v-for="(leader, index) of filteredLeaders(leaderFilter)" :key="index" :politician="leader" @click.native="goToPolitician(leader.id)"/>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10">
      aside
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Leaders',
  data() {
    return {
      politicianServices: this.$serviceFactory.politicians,
      country: 'ngr',
      leaderFilter: 'current',
      tabs: [{
        label: 'Current Leaders',
        value: 'current',
      }, {
        label: 'Upcoming Leaders',
        value: 'upcoming',
      }],
    };
  },
  methods: {
    setLeaderFilter(value) {
      this.leaderFilter = value;
    },
    async getPoliticians() {
      // const query = { status };
      const { data } = await this.politicianServices.getPoliticians();
      const { politicians } = data;
      this.$store.commit('storePoliticians', politicians);
    },
    goToPolitician(id) {
      this.$router.push({ name: 'leaders-details', params: { id } });
    },
  },
  async mounted() {
    await this.getPoliticians();
  },
  computed: {
    // ...mapState({
    //   leaders: state => state.politicians || [],
    // }),
    ...mapGetters({
      filteredLeaders: 'getPoliticians',
      leadersCount: 'politicianCount',
    }),
    filteredLeadersCount() {
      return this.filteredLeaders(this.leaderFilter).length;
    },
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
