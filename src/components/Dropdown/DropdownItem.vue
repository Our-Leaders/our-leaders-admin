<template>
  <li class="px-3 py-2 flex justify-between items-center relative cursor-pointer font-circular text-sm">
    <slot></slot>
    <!-- <ul class="absolute bg-white w-full shadow">
      <slot name="item-child">
        li elements here, could be a nested dropdown item
      </slot>
    </ul> -->
  </li>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
  li {

    &:hover {
      @apply bg-gray-db;
    }

    & > ul {
      top: 0;
      left: 100%;
    }

    &:hover > ul {
      display: block;
    }
  }
</style>
