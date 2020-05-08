<template>
  <div class="dropdown relative">
    <div ref="dropdownTrigger">
      <slot name="trigger" :openDialog="trigger"></slot>
    </div>
    <ul class="dropdown-list bg-white z-50 absolute bg-white min-w-full w-48 shadow pt-1" ref="dropdownList" v-show="showDropdown">
      <slot name="items"></slot>
    </ul>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'Dropdown',
  props: {
    position: {
      type: String,
      default: 'bottom-start',
    },
  },
  methods: {
    trigger() {
      this.showDropdown = !this.showDropdown;
      if (!this.showDropdown) {
        this.popper.destroy();
      } else {
        this.popper = createPopper(this.$refs.dropdownTrigger, this.$refs.dropdownList, {
          placement: this.position,
        });
      }
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
        if (this.popper) {
          this.popper.destroy();
        }
      }
    },
  },
  data() {
    return {
      showDropdown: false,
      popper: null,
    };
  },
  mounted() {
    this.$on('close-dropdown', () => {
      this.showDropdown = false;
    });
    window.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    this.$off('close-dropdown');
    window.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style lang="scss" scoped>
</style>
