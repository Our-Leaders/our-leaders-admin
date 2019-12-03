<template>
  <div class="selector-container relative inline-block">
    <div @click="toggleCountryList" class="w-24 flex lg:py-2 mt-4 lg:ml-9 lg:mt-0 border lg:border-0 py-3 px-2 font-circular items-center relative">
      <img class="mr-3" :src="countryFlag(selectedCountry.flag)"/>
      <span class="mr-3">{{selectedCountry.acronym}}</span>
      <img src="@/assets/img/chevron-down.svg"/>
    </div>
    <div class="absolute w-64 country-list px-4 py-3 shadow right-0 bg-white" v-if="countryListOpen">
      <ul>
        <li v-for="(countryObject, key) in countryList" :key="key" class="flex relative" @click="countrySelect(key)">
          <input type="radio" name="country" :value="key" :v-model="value" class="absolute invisible">
          <div class="flag-container mr-3 bg-gray-c4">
            <img :src="countryFlag(countryObject.flag)"/>
          </div>
          <span class="font-circular text-sm">{{countryObject.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import countryList from '@/assets/json/countrylist.json';

export default {
  name: 'CountrySelector',
  props: {
    value: {
      type: String,
      default: 'ngr',
    },
  },
  data() {
    return {
      countryList,
      countryListOpen: false,
    };
  },
  methods: {
    countrySelect(country) {
      this.$emit('input', country);
      this.countryListOpen = false;
    },
    countryFlag(flag) {
      const images = require.context('@/assets/img/flags', false, /\.svg$/);
      return images(`./${flag}`);
    },
    toggleCountryList() {
      this.countryListOpen = !this.countryListOpen;
    },
  },
  computed: {
    selectedCountry() {
      return this.countryList[this.value];
    },
  },
};
</script>

<style lang="scss">
  .selector-container {
    cursor: pointer;
  }

  .country-list {
    top: 2.5rem;
    max-height: 20rem;
    height: auto;
    overflow-y: scroll;

    ul li:not(:last-child) {
      @apply mb-3;
    }
  }

  .flag-container {
    height: 16px;
    width: 24px;
  }
</style>
