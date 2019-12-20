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
          <our-dropdown-item>New accomplishment</our-dropdown-item>
          <our-dropdown-item>New update</our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item>New job post</our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item>New admin</our-dropdown-item>
          <our-dropdown-item>New party</our-dropdown-item>
          <our-dropdown-item @click.native="openModal('showNewPoliticianModal')">New Leader</our-dropdown-item>
          <our-dropdown-item>New User</our-dropdown-item>
        </template>
      </our-dropdown>
    </div>
    <div class="nav-links mt-10">
      <router-link :to="{ name: 'home' }" active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Home</router-link>
      <router-link :to="{ name: 'leaders' }" active-class="active" class="block py-2 pl-1 border-b-2 border-transparent w-5/6">Leaders</router-link>
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

    <!-- new politician modal -->
    <our-modal @close-modal="closeModal('showNewPoliticianModal')" :open="showNewPoliticianModal" size="large">
      <template v-slot:header>
        <p class="text-4xl">New leader</p>
      </template>
      <template v-slot:content>
        <div class="flex mt-6 social-links">
          <div class="w-1/3 flex">
            <div class="w-32 h-32 bg-gray-c4"></div>
          </div>
          <div class="w-2/3">
            <div class="flex mb-3">
              <div class="w-1/2 mr-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/facebook.svg" alt="facebook link">
                </div>
                <input
                  class="w-full pl-1 py-2 field border-b border-gray-400"
                  type="url"
                  id="politician-facebook-link"
                  name="politician-facebook-link"
                  placeholder="Facebook Link"
                  required
                />
              </div>
              <div class="w-1/2 ml-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/twitter.svg" alt="twitter link">
                </div>
                <input
                  class="w-full pl-1 py-2 field border-b border-gray-400"
                  type="url"
                  id="politician-twitter-link"
                  name="politician-twitter-link"
                  placeholder="Twitter Link"
                  required
                />
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 mr-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/instagram.svg" alt="instagram link">
                </div>
                <input
                  class="w-full pl-1 py-2 field border-b border-gray-400"
                  type="url"
                  id="politician-instagram-link"
                  name="politician-instagram-link"
                  placeholder="Instagram Link"
                  required
                />
              </div>
              <div class="w-1/2"></div>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <p class="font-circular text-xl font-semibold w-full">Personal Information</p>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Name
            </div>
            <div class="w-2/3">
              <input
                class="w-full pl-1 py-2 field border-b border-gray-400"
                type="text"
                id="politician-name"
                name="politician-name"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Date of birth
            </div>
            <div class="w-2/3">
              <v-datepicker
                placeholder="DD/MM/YYYY"
                format="dd/MM/yyyy"
                input-class="w-full pl-1 py-2 field border-b border-gray-400">
              </v-datepicker>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Religion
            </div>
            <div class="w-2/3">
              <v-select
                id="politician-religion"
                name="politician-religion"
                :clearable="false"
                :options="['Islam', 'Christian', 'Hindu', 'Buddhism', 'Other']"
                class="our-select"></v-select>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              State of origin
            </div>
            <div class="w-2/3">
              <v-select
                id="politician-party"
                name="politician-party"
                :clearable="false"
                :options="nigerianStates"
                class="our-select"></v-select>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <p class="font-circular text-xl font-semibold w-full">Political Information</p>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Status
            </div>
            <div class="w-2/3">
              <v-select
                id="politician-status"
                name="politician-status"
                :clearable="false"
                :options="['current', 'past', 'upcoming']"
                class="our-select"></v-select>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Current Office
            </div>
            <div class="w-2/3">
              <input
                class="w-full pl-1 py-2 field border-b border-gray-400"
                type="text"
                id="politician-current-office"
                name="politician-current-office"
                required
              />
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Start Date
            </div>
            <div class="w-2/3">
              <v-datepicker
                placeholder="DD/MM/YYYY"
                format="dd/MM/yyyy"
                input-class="w-full pl-1 py-2 field border-b border-gray-400">
              </v-datepicker>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              End Date
            </div>
            <div class="w-2/3">
              <v-datepicker
                placeholder="DD/MM/YYYY"
                format="dd/MM/yyyy"
                input-class="w-full pl-1 py-2 field border-b border-gray-400">
              </v-datepicker>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Party
            </div>
            <div class="w-2/3">
              <v-select
                id="politician-party"
                name="politician-party"
                :clearable="false"
                :options="['APC', 'PDP', 'AD']"
                class="our-select"></v-select>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="flex mt-12">
          <button class="bg-primary text-white font-circular py-3 px-12">Save</button>
          <button class="font-circular py-3 px-12">Cancel</button>
        </div>
      </template>
    </our-modal>
  </div>
</template>

<script>
import nigerianStates from '@/assets/json/nigerianStates.json';

export default {
  name: 'side-navigation',
  data() {
    return {
      nigerianStates,
      showNewPoliticianModal: false,
    };
  },
  methods: {
    closeModal(property) {
      this[property] = false;
    },
    openModal(property) {
      console.log('this runs', property);
      this[property] = true;
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

    select {
      -webkit-appearance: none;
      -moz-appearance:    none;
      appearance:         none;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;

      &:after{
        content: "▼";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        font-size: 60%;
        line-height: 30px;
        color: #555;
        pointer-events:none;
        padding:2px 25px;
      }
    }

    .social-links input{
      text-indent: 1.75rem;
    }
  }
</style>
