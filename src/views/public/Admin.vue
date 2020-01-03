<template>
  <div class="lg:flex">
    <div class="xl:w-2/3">
      <div class="stats flex mt-6 mb-16">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total Admins</p>
          <p class="stat-data">320</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Active Admins</p>
          <p class="stat-data">83</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Inactive Admins</p>
          <p class="stat-data">4</p>
        </div>
      </div>
      <our-tabs :tabs="tabs" @change="setAdminFilter"></our-tabs>
      <div>
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Name</th>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Email</th>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin of filteredAdmins(adminFilter)" :key="admin.id">
              <td class="border-b border-gray-db py-3 capitalize">{{admin.firstName}} {{admin.lastName}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{admin.email}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{admin.joinedAt | dateTimeFormat}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10">aside</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Admins',
  data() {
    return {
      adminServices: this.$serviceFactory.admins,
      adminFilter: 'all',
      tabs: [{
        label: 'All Admins',
        value: 'all',
      }, {
        label: 'Super Admin',
        value: 'superadmin',
      }, {
        label: 'Admin',
        value: 'admin',
      }, {
        label: 'Inactive',
        value: 'inactive',
      }],
    };
  },
  methods: {
    setAdminFilter(value) {
      this.adminFilter = value;
    },
    async getAdmins() {
      const { data } = await this.adminServices.getAdmins();
      const { admins } = data;
      this.$store.commit('storeAdmins', admins);
    },
  },
  async mounted() {
    await this.getAdmins();
  },
  computed: {
    ...mapGetters({
      filteredAdmins: 'getAdmins',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .leader-nav > div {
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
