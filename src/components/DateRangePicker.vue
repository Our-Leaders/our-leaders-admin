<template>
  <div class="items-center">
  <!-- <div class="flex items-center justify-center"> -->
    <vc-datepicker
      :value="dateRangeValue"
      mode="range"
      @input="valueChanges"
      :max-date='new Date()'
      :theme="theme"
      :popover="{ placement: $screens({ md: this.placement }, 'bottom'), visibility: 'click' }"
      :columns="$screens({ lg: 2 }, 1)">
      <div class="font-circular text-sm cursor-pointer">
        <div class="flex items-center">
          <span class="mr-2 mt-1">{{dateRangeValue.start | shortDateFormat}} - {{dateRangeValue.end | shortDateFormat}}</span>
          <img src="@/assets/img/calendar.svg">
        </div>
      </div>
    </vc-datepicker>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DateRangePicker',
  props: {
    value: {
      type: Object,
      default() {
        return {
          start: moment().startOf().subtract(1, 'months').toDate(),
          end: new Date(),
        };
      },
    },
    placement: {
      type: String,
      default: 'bottom-end',
    },
  },
  data() {
    return {
      theme: {
        container: {
          light: 'rounded-none bg-white shadow',
        },
        dayContent: 'vc-font-medium vc-text-sm vc-cursor-pointer focus:vc-font-bold focus:text-white border border-transparent hover:border-primary hover:bg-transparent',
        bgAccentHigh: {
          light: 'vc-highlight bg-primary rounded-none',
        },
        bgAccentLow: {
          light: 'bg-primaryLight',
        },
        bgLow: {
          light: 'text-white bg-primary rounded-none',
        },
      },
    };
  },
  methods: {
    valueChanges(value) {
      this.$emit('input', value);
    },
  },
  computed: {
    dateRangeValue() {
      return this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
