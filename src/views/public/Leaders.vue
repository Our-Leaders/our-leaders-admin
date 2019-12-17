<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between items-end">
        <h5 class="text-4xl">
          Leaders ({{leadersCount}})
        </h5>
        <our-country-selector v-model="country" />
      </header>
      <div class="w-full">
        <header class="flex w-full border-b border-primary mt-10 leader-nav">
          <div class="mr-10 pb-5 relative cursor-pointer" :class="{ 'selected' : leaderFilter === 'current' }" @click="setLeaderFilter('current')">
            <div class="active" v-if="leaderFilter === 'current'"></div>Current Leaders
            </div>
          <div class="mr-10 pb-5 relative cursor-pointer" :class="{ 'selected' : leaderFilter === 'upcoming' }" @click="setLeaderFilter('upcoming')">
            <div class="active" v-if="leaderFilter === 'upcoming'"></div>Contesting Leaders
            </div>
        </header>
        <p class="font-circular text-gray-c4 text-sm pt-5 pb-5">
          {{filteredLeadersCount}} {{ leaderFilter === 'current' ? 'Current' : 'Contesting'}} Leaders
        </p>
        <div class="leaders-grid flex flex-wrap">
          <our-politician v-for="(leader, index) of filteredLeaders(leaderFilter)" :key="index" :politician="leader" />
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
