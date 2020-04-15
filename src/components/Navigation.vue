<template>
  <nav class="flex items-center border-b lg:border-0 py-4 px-2 fixed top-0 right-0 left-0 w-full h-24 bg-white z-30">
    <div class="nav-icon lg:w-1/12">
      <img class src="@/assets/img/logo.svg" />
    </div>
    <div class="w-2/3 h-10">
      <!-- <div class="w-1/2 xl:w-5/12 mx-auto relative hidden lg:block">
        <input
          class="w-full pl-1 py-2 field border-b border-gray-400"
          v-model="searchQuery"
          type="text"
          id="search"
          name="text"
          placeholder="Search leader, party or user"
          required
        />
        <img src="@/assets/img/search.svg" alt="search" class="search-img absolute  right-0 top-0 bottom-0 my-auto">
      </div> -->
    </div>
    <div class="w-auto lg:border-l pl-8 pr-4 h-14 flex items-center font-circular">
      <!-- <div
        class="notifications h-8 w-8 bg-gray-f0 rounded-full text-xs flex lg:visible items-center justify-center mr-5 relative"
        :class="openNav ? 'visible' : 'invisible'">
        <div class="new-notification-indication rounded-full absolute"></div>12
      </div> -->
      <our-dropdown>
        <template v-slot:trigger>
          <div class="flex cursor-pointer">
            <!-- <div class="avatar h-10 w-10 rounded-full bg-gray-f0 mr-4 lg:visible" :class="openNav ? 'visible' : 'invisible'"></div> -->
            <div
              class="avatar h-10 w-10 rounded-full bg-gray-f0 mr-4 lg:visible bg-center bg-no-repeat bg-cover"
              :class="openNav ? 'visible' : 'invisible'"
              v-if="user.profileImage"
              v-bind:style="{ 'background-image': 'url('+ user.profileImage +')'  }"></div>
            <div class="avatar h-10 w-10 rounded-full bg-gray-f0 mr-4 lg:visible" :class="openNav ? 'visible' : 'invisible'" v-else></div>
            <div class="admin-info leading-tight hidden lg:block">
              <div class="admin-name text-sm">{{user.firstName || 'John Doe'}}</div>
              <div class="admin-info text-xs text-gray-96">{{user.email}}</div>
            </div>
          </div>
        </template>
        <div slot="items" class="font-circular">
          <our-dropdown-item>
            <p>Signed in as</p>
            <p>{{user.email}}</p>
          </our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item>
            <router-link :to="{ name: 'profile' }">Account Preferences</router-link>
          </our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item @click.native="signout">Sign out</our-dropdown-item>
        </div>
      </our-dropdown>
      <div class="block lg:hidden">
        <button @click="toggleNav" :class="{'open': openNav}" class="nav-menu flex items-center focus:outline-none">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <!-- <div :class="openNav ? 'block' : 'hidden'" class="mobile-menu lg:hidden w-full h-auto absolute left-0 right-0 p-10 shadow-md flex flex-col items-center bg-white">
      <div class="w-5/6 md:w-1/2 relative">
        <input
          class="w-full pl-1 py-2 field border-b border-gray-400"
          v-model="searchQuery"
          type="text"
          id="mobile-search"
          name="text"
          placeholder="Search leader or party"
          required
        />
        <img src="@/assets/img/search.svg" alt="search" class="search-img absolute  right-0 top-0 bottom-0 my-auto">
      </div>
      <div>
        <button class="relative border-black border w-40 py-2 px-3 flex justify-between items-center my-4">
          <span>New</span>
          <span><img src="@/assets/img/add-primary.svg" alt=""></span>
        </button>
      </div>
      <div class="w-12 h-1 border-b border-gray-db my-2"></div>
      <div class="nav-links mt-10">
        <router-link :to="{ name: 'home' }" active-class="active" class="block py-2 pl-1 border-b border-transparent text-center">Home</router-link>
        <router-link :to="{ name: 'leaders' }" active-class="active" class="block py-2 pl-1 border-b border-transparent text-center">Leaders</router-link>
        <router-link :to="{ name: 'web-pages' }" active-class="active" class="block py-2 pl-1 border-b border-transparent text-center">Web Pages</router-link>
        <router-link :to="{ name: 'parties' }" active-class="active" class="block py-2 pl-1 border-b border-transparent text-center">Political Parties</router-link>
        <a href="#" class="block w-auto py-2 pl-1 border-b border-transparent text-center">Analytics</a>
        <a href="#" class="block w-auto py-2 pl-1 border-b border-transparent text-center">Admins</a>
      </div>
      <div class="w-12 h-1 border-b border-gray-db"></div>
      <div>
        <button class="h-10 w-40 border border-gray-96 font-circular mt-4">
          Log out
        </button>
      </div>
    </div> -->
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'navigation',
  data() {
    return {
      openNav: false,
      searchQuery: '',
    };
  },
  methods: {
    toggleNav() {
      this.openNav = !this.openNav;
    },
    signout() {
      this.$store.dispatch('signout');
      this.$router.push({ name: 'sign-in' });
    },
  },
  computed: {
    ...mapState({
      user: state => state.currentUser || {},
    }),
    // ...mapActions({
    //   signout: 'signout',
    // }),
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
    top: 6rem;

    & > *:not(:first-child) {
      @apply mt-5;
    }
  }
}
</style>
