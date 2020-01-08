<template>
  <div>
    <div v-for="(year, index) of sortedYears" :key="index">
      <p class="font-circular text-xl font-semibold w-full mb-5">{{year}}</p>
      <div class="quarters">
        <div class="quarter" v-for="(accomplishments, quarter) of accomplishmentByYear[year]" :key="quarter">
          <div class="py-3 pl-2 pr-3 font-circular border-b border-gray-db flex justify-between items-center leading-none cursor-pointer" @click.once="goToQuarter(quarter, year)">
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
</template>

<script>
export default {
  name: 'AccomplishmentYearView',
  props: {
    sortedYears: {
      type: Array,
      required: true,
    },
    accomplishmentByYear: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quarterTags: {
        q1: 'january - march',
        q2: 'april - june',
        q3: 'july - september',
        q4: 'october - december',
      },
    };
  },
  methods: {
    filteredAccomplishments(accomplishments) {
      return accomplishments.slice(0, 3);
    },
    goToQuarter(quarter, year) {
      this.$emit('onGoToQuarter', quarter, year);
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
