<template>
  <div class="side-nav lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:w-1/4 xl:w-1/6 pl-8 pr-12 overflow-y-scroll hidden lg:block">
    <button class="relative border-black border-2 w-full py-2 px-3 flex justify-between items-center">
      <span>New</span>
      <span><img src="@/assets/img/add.svg" alt=""></span>
    </button>
    <div class="nav-links mt-10">
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6 active">Homes</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Leaders</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Web pages</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Political Parties</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Analytics</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Admins</a>
    </div>
    <div class="w-3/5 border-t border-gray-c4 mt-40"></div>
    <div class="nav-links pt-6">
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">About us</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Contact</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-navigation',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  .side-nav {
    top: 9.5rem;

    &:after {
      content: '';
      height: 90%;
      width: 1px;
      @apply border-gray-c4 border-r absolute top-0 right-0;
    }
  }
</style>
