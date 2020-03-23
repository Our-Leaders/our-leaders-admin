<template>
  <div>
    <div class="mb-2">
      <button class="py-1 flex justify-between items-center font-circular text-xs text-gray-96" @click.once="goToYearView">
        <img src="./../../../assets/img/chevron-left.svg" alt="chevron-left">
        <span class="ml-1">Back to yearly view</span>
      </button>
    </div>
    <div class="flex justify-between items-center mb-1">
      <p class="font-circular text-xl font-semibold capitalize">{{quarter}} {{year}}</p>
      <span class="text-xs font-circular">{{quarters.length}} accomplishment{{quarters.length > 1 ? 's' : ''}}</span>
    </div>
    <div v-for="(accomplishment, index) of quarters" :key="index" class="quarter-view-accomplishment border-t border-gray-db relative block">
      <input type="checkbox" :name="index" :id="index" class="invisible absolute">
      <label :for="index">
        <header class="py-3 cursor-pointer">
          <div class="relative flex justify-between items-center">
            <span class="font-semibold capitalize font-circular">{{accomplishment.title}}</span>
            <span class="flex">
              <span class="text-xs text-gray-96 font-circular mr-2">Published {{accomplishment.createdOn | shortDateFormat}}</span>
              <img src="./../../../assets/img/chevron-down.svg" alt="chevron-down">
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
        <div class="w-full h-48 mb-4 bg-gray-db bg-cover bg-center" v-if="accomplishment.image && accomplishment.image.url" :style="{ 'background-image': 'url('+ accomplishment.image.url +')'  }"></div>
        <p class="">{{accomplishment.description}}</p>
        <p v-if="accomplishment.url" class="text-gray-96 font-circular text-xs mt-3 hover:text-gray-500"><a :href="accomplishment.url" target="_blank">View full story at {{getUrlHost(accomplishment.url)}}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import StringUtil from '@/helpers/stringUtil';

export default {
  name: 'AccomplishmentQuarterView',
  props: {
    quarters: {
      type: Array,
      required: true,
    },
    quarter: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    goToYearView() {
      this.$emit('onGoToYearView');
    },
    getUrlHost(url) {
      return StringUtil.getUrlHost(url);
    },
  },
};
</script>

<style lang="scss" scoped>
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
