<template>
  <div class="dropdown relative">
    <div class="trigger" @click="trigger">
      <slot name="trigger"></slot>
    </div>
    <ul class="dropdown-list absolute bg-white min-w-full w-48 shadow mt-1 pt-1" v-if="showDropdown">
      <slot name="items"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  methods: {
    trigger() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
      }
    },
  },
  data() {
    return {
      showDropdown: false,
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
