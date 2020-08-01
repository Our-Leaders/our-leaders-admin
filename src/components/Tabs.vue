<template>
  <div>
    <header class="w-full md:border-b md:border-primary relative flex flex-col-reverse md:block">
      <div class="flex tab-nav border-b border-primary md:border-none">
        <div v-for="(tab, index) of tabs" :key="index" class="mr-10 pb-5 relative cursor-pointer" :class="{ 'selected' : currentTab === tab.value }" @click="setTab(tab.value)">
          <div class="active" v-if="isActive(tab.value)"></div>{{tab.label}}
        </div>
      </div>
      <div class="relative w-full md:absolute md:right-0 md:top-0 md:bottom-0 md:w-auto mb-5">
        <slot></slot>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentTab: this.tabs[0] ? this.tabs[0].value : '',
    };
  },
  methods: {
    isActive(tab) {
      return this.currentTab === tab;
    },
    setTab(tab) {
      this.currentTab = tab;
      this.$emit('change', tab);
    },
  },
  watch: {
    // for dynamically generated tabs
    tabs(newTabs) {
      if (newTabs.length > 0) {
        this.setTab(newTabs[0].value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .tab-nav > div {
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
</style>
