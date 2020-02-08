<template>
  <div class="side-nav lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:w-1/4 xl:w-1/6 pl-8 pr-12 overflow-y-scroll hidden lg:block z-40">
    <div>
      <our-dropdown>
        <template v-slot:trigger>
          <button class="relative focus:outline-none border-black border-2 w-full py-2 px-3 flex justify-between items-center">
            <span>New</span>
            <span><img src="@/assets/img/add.svg" alt=""></span>
          </button>
        </template>
        <template v-slot:items class="font-circular">
          <our-dropdown-item>New Accomplishment</our-dropdown-item>
          <our-dropdown-item>New Update</our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item>New Job Post</our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item @click.native="openModal('NewAdminModal')">New Admin</our-dropdown-item>
          <our-dropdown-item @click.native="openModal('NewPoliticalPartyModal')">New Party</our-dropdown-item>
          <our-dropdown-item @click.native="openModal('NewPoliticianModal')">New Leader</our-dropdown-item>
          <our-dropdown-item>New User</our-dropdown-item>
        </template>
      </our-dropdown>
    </div>
    <div class="nav-links mt-10">
      <router-link :to="{ name: 'home' }" active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Home</router-link>
      <router-link :to="{ name: 'leaders' }" active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Leaders</router-link>
      <router-link :to="{ name: 'web-pages' }" active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Web Pages</router-link>
      <router-link :to="{ name: 'parties' }" active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Political Parties</router-link>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Analytics</a>
      <router-link :to="{ name: 'admins' }"  active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Admins</router-link>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Archive</a>
    </div>
    <div class="w-3/5 border-t border-gray-c4 mt-40"></div>
    <div class="nav-links pt-6">
      <!-- <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">About us</a>
      <a href="#" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Contact</a> -->
      <p class="text-gray-96 font-circular text-sm leading-snug">Olubrain Leadership Foundation, 2020</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-navigation',
  data() {
    return {};
  },
  methods: {
    openModal(modalName) {
      this.$store.commit('openModal', { modalName });
    },
  },
};
</script>

<style lang="scss" scoped>
  .side-nav {
    top: 9rem;

    &:after {
      content: '';
      height: 90%;
      width: 1px;
      @apply border-gray-c4 border-r absolute top-0 right-0 z-30;
    }
  }
</style>
