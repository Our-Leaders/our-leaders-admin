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
        <our-tabs :tabs="tabs" @change="setLeaderFilter"/>

        <p class="font-circular text-gray-c4 text-sm pt-5 pb-5">
          <!-- {{filteredLeadersCount}} --> {{ leaderFilter === 'current' ? 'Current' : 'Contesting'}} Leaders
        </p>
        <div class="leaders-grid flex flex-wrap">
          <our-politician v-for="(leader, index) of leaders" :key="index" :politician="leader" @click.native="goToPolitician(leader.id)"/>
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
            v-model="politicianPagination.page"
            container-class="inline-block">
          </paginate>
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

// images
import chevronLeft from '@/assets/img/chevron-left.svg';

export default {
  name: 'Leaders',
  data() {
    return {
      chevronLeft,
      politicianServices: this.$serviceFactory.politicians,
      country: 'NG',
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
    async setLeaderFilter(value) {
      this.leaderFilter = value;
      await this.getPoliticians({ status: value });
    },
    async getPoliticians({ skip = 0, status = 'current', country = 'NG' }) {
      const query = { skip, status, country };
      const { data } = await this.politicianServices.getPoliticians(query);
      const { politicians, total: politicianCount } = data;
      this.$store.commit('storePoliticians', { politicians, politicianCount });
    },
    goToPolitician(id) {
      this.$router.push({ name: 'leaders-details', params: { id } });
    },
    async handlePageChange(p) {
      this.$store.commit('changePoliticianPageNumber', p);
      await this.getPoliticians({ skip: (p - 1) * this.politicianPagination.numberPerPage });
    },
  },
  async mounted() {
    await this.getPoliticians({ skip: (this.politicianPagination.page - 1) * this.politicianPagination.numberPerPage });
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
