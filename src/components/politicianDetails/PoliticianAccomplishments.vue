<template>
  <div>
    <div class="tags-container relative pb-5" v-if="view === 'yearly'">
      <div class="tags w-full overflow-x-auto whitespace-no-wrap relative">
        <div class="inline-block tag text-xs font-circular py-1 px-3 border border-gray-db mr-2 capitalize" v-for="(tag, index) of tags" :key="index">
          {{tag}}
        </div>
      </div>
    </div>
    <div v-if="view === 'yearly'">
      <div v-for="(year, index) of sortedYears" :key="index">
        <p class="font-circular text-xl font-semibold w-full mb-5">{{year}}</p>
        <div class="quarters">
          <div class="quarter" v-for="(accomplishments, quarter) of yearlyView[year]" :key="quarter">
            <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer" @click="goToQuarter(quarter, year)">
              <span class="font-bold capitalize">{{quarter}}</span>
              <span class="text-xs text-gray-96 capitalize">{{quarterTags[quarter]}} {{year}}</span>
            </div>
            <div
              class="py-2 px-2 border-gray-db leading-none relative cursor-pointer accomplishment"
              v-for="(accomplishment, accomplishmentIndex) of filteredAccomplishments(accomplishments)"
              :key="accomplishmentIndex">
              <span>{{accomplishment.title}}</span>
              <div class="absolute top-0 bottom-0 right-0 h-full items-center pr-3 pl-8 accomplishment-action">
                <button class="text-xs font-circular mr-4">Edit</button>
                <button class="text-sm"><fa-icon :icon="['fas', 'trash']"></fa-icon></button>
              </div>
            </div>
            <div class="py-3 pl-2 pr-3 font-circular border-gray-db text-xs leading-none cursor-pointer flex justify-between items-center accomplishment" v-if="accomplishments.length > 3">
              <span>View {{ accomplishments.length - 3 }} more</span>
              <span><fa-icon :icon="['fas', 'arrow-right']"></fa-icon></span>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="view === 'quarter'">
      <div class="mb-2">
        <button class="py-1 flex justify-between items-center font-circular text-xs text-gray-96" @click="goToYearView">
          <img src="./../../assets/img/chevron-left.svg" alt="chevron-left">
          <span class="ml-1">Back to yearly view</span>
        </button>
      </div>
      <div class="flex justify-between items-center mb-1">
        <p class="font-circular text-xl font-semibold capitalize">{{selectedQuarter.quarter}} {{selectedQuarter.year}}</p>
        <span>{{yearlyView[selectedQuarter.year][selectedQuarter.quarter].length}} accomplishment{{yearlyView[selectedQuarter.year][selectedQuarter.quarter].length > 1 ? 's' : ''}}</span>
      </div>
      <div v-for="(accomplishment, index) of yearlyView[selectedQuarter.year][selectedQuarter.quarter]" :key="index" class="quarter-view-accomplishment border-t border-gray-db relative block">
        <input type="checkbox" :name="index" :id="index" class="invisible absolute">
        <label :for="index">
          <header class="py-3 cursor-pointer">
            <div class="relative flex justify-between items-center">
              <span class="font-semibold capitalize font-circular">{{accomplishment.title}}</span>
              <span class="flex">
                <span class="text-xs text-gray-96 font-circular mr-2">Published {{accomplishment.createdOn | shortDateFormat}}</span>
                <img src="./../../assets/img/chevron-down.svg" alt="chevron-down">
              </span>
            </div>
            <div class="tags mt-2">
              <div class="inline-block tag text-xs font-circular py-1 px-3 border border-gray-db mr-2 capitalize">
                tourism
              </div>
              <div class="inline-block tag text-xs font-circular py-1 px-3 border border-gray-db mr-2 capitalize">
                infrastructure
              </div>
            </div>
          </header>
        </label>
        <div class="mb-4 pr-12 quarter-view-accomplishment-detail">
          <!-- image here -->
          <p class="">{{accomplishment.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoliticianAccomplishments',
  props: {
    politician: {
      type: Object,
    },
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
      views: ['yearly', 'quarter'],
      selectedQuarter: {
        quarter: '',
        year: '',
      },
    };
  },
  methods: {
    filteredAccomplishments(accomplishments) {
      return accomplishments.slice(0, 3);
    },
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
    yearlyView() {
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
      return Object.keys(this.yearlyView).sort((a, b) => {
        if (a < b) return 1;
        return -1;
      });
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

  .quarters {
    @apply flex flex-wrap justify-between;

    .quarter {
      @apply border border-gray-db h-auto;
      margin-bottom: 1.25rem;
      flex: 0 0 calc(50% - 0.625rem);

      .accomplishment {
        &:not(:last-child) {
          @apply border-b;
        }

        &-action {
          display: none;
          background: linear-gradient(270deg, #FFFFFF 67.19%, rgba(255, 255, 255, 0) 100%);
        }

        &:hover .accomplishment-action {
          display: flex;
        }
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
