<template>
  <div class="dropdown relative">
    <div class="trigger" @click="trigger" @focusout="closeDropdown">
      <slot name="trigger"></slot>
    </div>
    <ul class="dropdown-list absolute bg-white w-full shadow" v-if="showDropdown">
      <slot name="items"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    // triggerEvent: {
    //   type: String,
    //   default: 'click',
    // },
  },
  methods: {
    trigger() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
