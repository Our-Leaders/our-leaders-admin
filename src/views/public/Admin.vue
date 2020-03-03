<template>
  <div class="lg:flex">
    <div class="xl:w-2/3">
     <header>
        <h5 class="text-4xl">
          Admins
        </h5>
      </header>
      <div class="stats flex mt-6 mb-16">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total Admins</p>
          <p class="stat-data">{{totalAdminCount}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Active Admins</p>
          <p class="stat-data">{{activeAdminCount}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Inactive Admins</p>
          <p class="stat-data">{{inactiveAdminCount}}</p>
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
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin of filteredAdmins(adminFilter)" :key="admin.id" class="cursor-pointer" @click="selectAdmin(admin.id)" :class="{active: admin.id === selectedAdminId}">
              <td class="border-b border-gray-db py-3 capitalize">{{admin.firstName || '--'}} {{admin.lastName || '--'}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{admin.email}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{admin.joinedAt | dateTimeFormat}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">
                <button class="text-sm font-circular mr-4" @click.stop="openEditadminModal(admin.id)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="w-full h-full xl:w-1/3 xl:pl-8 xl:pr-16 relative">
      <our-admin-details :admin="selectedAdmin"></our-admin-details>
    </div>
  </div>
</template>

<script>
import find from 'lodash.find';
import { mapGetters } from 'vuex';

export default {
  name: 'Admins',
  data() {
    return {
      adminServices: this.$serviceFactory.admins,
      adminFilter: 'all',
      selectedAdminId: '',
      selectedAdmin: null,
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
      roles: {
        superadmin: 'super admin',
        admin: 'admin',
      },
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
    selectAdmin(adminId) {
      if (!this.selectedAdminId || this.selectedAdminId !== adminId) {
        this.selectedAdminId = adminId;
        this.selectedAdmin = find(this.filteredAdmins('all'), { id: this.selectedAdminId });
      } else {
        this.selectedAdminId = '';
        this.selectedAdmin = null;
      }
    },
    openEditadminModal(adminId) {
      this.$store.commit('openModal', { modalName: 'NewAdminModal', modalProps: { adminId } });
    },
  },
  async mounted() {
    await this.getAdmins();
  },
  computed: {
    ...mapGetters({
      filteredAdmins: 'getAdmins',
      totalAdminCount: 'totalAdminCount',
      activeAdminCount: 'activeAdminCount',
      inactiveAdminCount: 'inactiveAdminCount',
    }),
  },
};
</script>

<style lang="scss" scoped>
  tr.active td {
    @apply border-primary border-b-2;
  }
</style>
