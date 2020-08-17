<template>
  <div class="lg:flex h-full">
    <div class="xl:w-2/3 px-4">
     <header>
        <h5 class="text-4xl">
          Admins
        </h5>
      </header>
      <div class="flex flex-wrap mt-6 mb-16">
        <div class="w-1/2 lg:w-1/4 flex-grow mb-6 lg:mb-0">
          <p class="stat-title font-semibold font-circular">Total Admins</p>
          <p class="stat-data">{{totalAdminCount}}</p>
        </div>
        <div class="w-1/2 lg:w-1/4 flex-grow">
          <p class="stat-title font-semibold font-circular">Active Admins</p>
          <p class="stat-data">{{activeAdminCount}}</p>
        </div>
        <div class="w-1/2 lg:w-1/4 flex-grow">
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
            <tr
              v-for="admin of filteredAdmins(adminFilter)"
              :key="admin.id" class="cursor-pointer"
              @click="selectAdmin(admin.id)"
              :class="{active: admin.id === selectedAdminId, deleted: admin.isDeleted}">
              <td class="border-b border-gray-db py-3 capitalize">
                {{admin.firstName || '--'}} {{admin.lastName || '--'}}
                <span
                  v-if="admin.isDeleted"
                  class="border border-gray-db py-1 px-3 text-xs font-circular capitalize ml-3 admin-deleted-indicator inline-flex items-center justify-between" >
                  deleted
                </span>
              </td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{admin.email}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{admin.joinedAt | dateTimeFormat}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">
                <button class="text-sm font-circular mr-4" @click.stop="openEditadminModal(admin.id)" :disabled="admin.isDeleted">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <our-admin-details ref="adminDetails" :adminId="selectedAdminId"></our-admin-details>
  </div>
</template>

<script>
// import find from 'lodash.find';
import { mapGetters } from 'vuex';
import NavigatorUtil from '@/helpers/navigatorUtil';
import stickbits from 'stickybits';

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
      } else {
        this.selectedAdminId = '';
      }

      if (NavigatorUtil.isMobile()) {
        this.$store.commit('openModal', { modalName: 'AdminDetailModal', modalProps: { adminId } });
      }
    },
    openEditadminModal(adminId) {
      this.$store.commit('openModal', { modalName: 'NewAdminModal', modalProps: { adminId } });
    },
  },
  async mounted() {
    stickbits(this.$refs.adminDetails.$refs.stickySidebar, {
      stickyBitStickyOffset: 144, useStickyClasses: false,
    });
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
  tr {
    &.active td {
      @apply border-primary border-b-2;
    }

    &.deleted td {
      @apply text-gray-96;
    }
  }

  .admin-deleted-indicator:after {
    content: '';
    height: 0.68rem;
    width: 0.68rem;
    border-radius: 50%;
    background-color: #dbdbdb;
    position: relative;
    margin-left: 0.625rem;
  }
</style>
