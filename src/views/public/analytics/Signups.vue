<template>
  <div class="lg:flex relative">
    <div class="xl:w-2/3">
      <header>
        <h5 class="text-4xl">
          Signups
        </h5>
      </header>
      <div class="stats flex mt-6 mb-16">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total members</p>
          <p class="stat-data">{{this.totalMembers | numberFormat}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Active members</p>
          <p class="stat-data">{{this.activeMembers | numberFormat}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Inactive members</p>
          <p class="stat-data">{{this.inactiveMembers | numberFormat}}</p>
        </div>
      </div>
      <our-tabs :tabs="tabs" @change="setFilter"></our-tabs>
      <div v-if="users.length > 0">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Name</th>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Email</th>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Created</th>
              <th class="w-1/4 py-3 text-left font-circular font-bold border-b border-gray-96">Last active</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user of users"
              :key="user.id"
              @click="selectUser(user.id)"
              class="cursor-pointer">
              <td class="border-b border-gray-db py-3 capitalize">
                {{user.firstName || '-'}} {{user.lastName || '-'}}
              </td>
              <td class="border-b border-gray-db py-3 font-circular text-sm">
                {{user.email || '-'}}
              </td>
              <td class="border-b border-gray-db py-3 font-circular text-sm">
                {{user.joinedAt | dateTimeFormat}}
              </td>
              <td class="border-b border-gray-db py-3 font-circular text-sm">
                {{user.lastActiveAt | dateTimeFormat}}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-6 mb-20">
          <paginate
            :page-count="pageCount"
            :prev-text="`<img src='${chevronLeft}' alt='dropdown indicator' style='height: 1.5rem;'>`"
            :next-text="`<img src='${chevronLeft}' alt='dropdown indicator' class='transform rotate-180' style='height: 1.5rem;'>`"
            page-link-class="px-3 py-1 block"
            next-link-class="px-3 py-1 block"
            prev-link-class="px-3 py-1 block"
            page-class="font-circular border border-gray-96 inline-block ml-2"
            next-class="font-circular border border-gray-96 inline-block ml-2 align-bottom"
            prev-class="font-circular border border-gray-96 inline-block align-bottom"
            active-class="text-white bg-primary border-primary"
            disabled-class="border-gray-c4 text-gray-96"
            :click-handler="handlePageChange"
            v-model="page"
            container-class="inline-block" />
        </div>
      </div>
       <div v-else class="mt-10 flex items-center justify-center text-center text-2xl text-gray-c4 mt-20">
        No data available
      </div>
    </div>
    <div class="w-full h-full xl:w-1/3 xl:pl-8 xl:pr-16 relative">
    </div>
  </div>
</template>

<script>
import chevronLeft from '@/assets/img/chevron-left.svg';

export default {
  name: 'Signups',
  data() {
    return {
      chevronLeft,
      loading: false,
      filter: 'all',
      userService: this.$serviceFactory.users,
      users: [],
      userCount: 0,
      selectedUserId: '',
      selectedUser: null,
      tabs: [{
        label: 'All members',
        value: 'all',
      }, {
        label: 'Active',
        value: 'active',
      }, {
        label: 'Inactive',
        value: 'inactive',
      }, {
        label: 'Blocked',
        value: 'blocked',
      }],
      filters: {
        all: {},
        active: { isDeleted: false, isBlocked: false },
        inactive: { isDeleted: true },
        blocked: { isBlocked: true },
      },
      page: 1,
      totalMembers: 0,
      activeMembers: 0,
      inactiveMembers: 0,
    };
  },
  methods: {
    setFilter(value) {
      this.filter = value;
      this.page = 1;
      this.getSignups();
    },
    async getSignups() {
      // all, active, inactive, blocked
      let query = this.filters[this.filter];

      query = {
        ...query,
        limit: 10,
        skip: (this.page - 1) * 10,
      };
      const { data } = await this.userService.getUsers(query);
      const { users, total } = data;

      this.users = users;
      this.userCount = total;
    },
    async getUserStat() {
      const { data } = await this.userService.getUserStat();
      const { total, active, inactive } = data;

      this.totalMembers = total;
      this.activeMembers = active;
      this.inactiveMembers = inactive;
    },
    selectUser(userId) {
      if (!this.selectedUserId || this.selectedUserId !== userId) {
        this.selectedUserId = userId;
      } else {
        this.selectedUserId = '';
      }
    },
    handlePageChange(pageNumber) {
      this.page = pageNumber;
      this.getSignups();
    },
  },
  mounted() {
    this.getSignups();
    this.getUserStat();
  },
  computed: {
    pageCount() {
      if (this.users.length > 0) {
        return Math.ceil(this.userCount / 10);
      }

      return 1;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
