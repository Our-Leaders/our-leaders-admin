<template>
  <div>
    <div class="tags-container relative pb-5" v-if="view === 'yearly'">
      <div class="tags w-full overflow-x-auto whitespace-no-wrap relative">
        <div class="inline-block tag text-xs font-circular py-1 px-3 border border-gray-db mr-2 capitalize" v-for="(tag, index) of tags" :key="index">
          {{tag}}
        </div>
      </div>
    </div>
    <component :is="components[view]" v-bind="componentProps" v-on="{ onGoToQuarter: goToQuarter, onGoToYearView: goToYearView }"></component>
  </div>
</template>

<script>
import YearlyView from '@/components/politicianDetails/AccomplishmentsViews/YearView.vue';
import QuarterView from '@/components/politicianDetails/AccomplishmentsViews/QuarterView.vue';

export default {
  name: 'PoliticianAccomplishments',
  props: {
    politician: {
      type: Object,
    },
  },
  components: {
    YearlyView,
    QuarterView,
  },
  data() {
    return {
      tags: ['health', 'education', 'tourism', 'technology', 'religion', 'agriculture', 'random 1', 'random 2', 'random 3', 'technology', 'religion', 'agriculture', 'random 1', 'random 2', 'random 3'],
      quarterTags: {
        q1: 'january - march',
        q2: 'april - june',
        q3: 'july - september',
        q4: 'october - december',
      },
      view: 'yearly',
      selectedQuarter: {
        quarter: '',
        year: '',
      },
      components: {
        yearly: YearlyView,
        quarter: QuarterView,
      },
    };
  },
  methods: {
    goToQuarter(quarter, year) {
      this.selectedQuarter.quarter = quarter;
      this.selectedQuarter.year = year;
      this.view = 'quarter';
    },
    goToYearView() {
      this.view = 'yearly';
    },
  },
  computed: {
    accomplishmentByYear() {
      const { accomplishments = [] } = this.politician;
      const stuff1 = {};
      accomplishments.forEach((accomplishment) => {
        const { year, quarter } = accomplishment;

        if (!stuff1[year]) {
          stuff1[year] = {
            q1: [],
            q2: [],
            q3: [],
            q4: [],
          };
        }

        stuff1[year][quarter].push(accomplishment);
      });

      return stuff1;
    },
    sortedYears() {
      return Object.keys(this.accomplishmentByYear).sort((a, b) => {
        if (a < b) return 1;
        return -1;
      });
    },
    componentProps() {
      if (this.view === 'yearly') {
        return {
          sortedYears: this.sortedYears,
          accomplishmentByYear: this.accomplishmentByYear,
        };
      }

      return {
        quarter: this.selectedQuarter.quarter,
        year: this.selectedQuarter.year,
        quarters: this.accomplishmentByYear[this.selectedQuarter.year][this.selectedQuarter.quarter],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .tags-container {
    .tags {
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .quarter-view-accomplishment-detail {
    display: none;
  }

  .quarter-view-accomplishment header img {
    transition: 0.4s transform;
  }

  .quarter-view-accomplishment input[type="checkbox"]:checked ~ label header img {
    transform: rotate(180deg);
  }

  .quarter-view-accomplishment input[type="checkbox"]:checked ~ .quarter-view-accomplishment-detail {
    display: block;
  }
</style>
