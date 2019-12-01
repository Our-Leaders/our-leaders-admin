<template>
  <nav class="flex items-center border-b lg:border-0 py-4 px-6 relative">
    <div class="nav-icon w-1/12">
      <img class src="@/assets/img/logo.svg" />
    </div>
    <div class="w-2/3 h-10">
      <div class="w-1/2 xl:w-5/12 mx-auto relative hidden lg:block">
        <input
          class="w-full pl-1 py-2 border-b border-gray-400"
          type="text"
          id="text"
          name="text"
          placeholder="Search leader, party or user"
          required
        />
        <img src="@/assets/img/search.svg" alt="search" class="search-img absolute  right-0 top-0 bottom-0 my-auto">
      </div>
    </div>
    <div class="w-auto lg:border-l pl-8 pr-4 h-14 flex items-center font-circular">
      <div
        class="notifications h-8 w-8 bg-gray-f0 rounded-full text-xs flex lg:visible items-center justify-center mr-5 relative"
        :class="openNav ? 'visible' : 'invisible'">
        <div class="new-notification-indication rounded-full absolute"></div>12
      </div>
      <div class="avatar h-10 w-10 rounded-full bg-gray-f0 mr-4 lg:visible" :class="openNav ? 'visible' : 'invisible'"></div>
      <div class="admin-info leading-tight hidden lg:block">
        <div class="admin-name text-sm">Chidimma</div>
        <div class="admin-info text-xs text-gray-96">Chidimma@ourleaders.africa</div>
      </div>
      <div class="block lg:hidden">
        <button @click="toggleNav" :class="{'open': openNav}" class="nav-menu flex items-center focus:outline-none">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <div :class="openNav ? 'block' : 'hidden'" class="mobile-menu lg:hidden w-full h-auto absolute left-0 right-0 p-10 shadow-md flex flex-col items-center">
      <div class="w-5/6 md:w-1/2 relative">
        <input
          class="w-full pl-1 py-2 border-b border-gray-400"
          type="text"
          id="text"
          name="text"
          placeholder="Search leader or party"
          required
        />
        <img src="@/assets/img/search.svg" alt="search" class="search-img absolute  right-0 top-0 bottom-0 my-auto">
      </div>
      <div class="w-12 h-1 border-b border-gray-db"></div>
      <button class="h-10 w-40 border border-gray-96 font-circular">
        Log out
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      openNav: false,
    };
  },
  methods: {
    toggleNav() {
      this.openNav = !this.openNav;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  @screen xl {
    min-height: 6.25rem;
    margin-left: 2.375em;
    margin-right: 3.1875rem;

    .nav-icon img {
      width: 4rem;
    }
  }

  .new-notification-indication {
    background-color: #f14336;
    height: 0.6875rem;
    width: 0.6875rem;
    top: -0.025rem;
    right: -0.025rem;
  }

  .nav-menu {
    cursor: pointer;
    height: 16px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    width: 30px;

    span {
      background: black;
      border-radius: 4px;
      display: block;
      height: 1px;
      left: 0;
      opacity: 1;
      position: absolute;
      transform-origin: left center;
      transform: rotate(0deg);
      transition: .25s ease-in-out;
      width: 100%;

      &:nth-child(1) {
        top: 0px;
      }

      &:nth-child(2) {
        top: 8px;
      }

      &:nth-child(3) {
        top: 16px;
      }
    }

    &.open {
      span:nth-child(1) {
        left: 5px;
        top: -3px;
        transform: rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
        width: 0%;
      }

      span:nth-child(3) {
        left: 5px;
        top: 18px;
        transform: rotate(-45deg);
      }
    }
  }

  .mobile-menu {
    top: 6.25rem;

    & > *:not(:first-child) {
      @apply mt-5;
    }
  }
}
</style>
