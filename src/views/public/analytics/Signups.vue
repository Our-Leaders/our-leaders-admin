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
              @click="selectUser(user)"
              :class="{active: user.id === selectedUserId}"
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
      <h5 class="text-2xl pb-4 border-b border-primary">
        Member details
      </h5>
      <div v-if="selectedUserId">
        <div class="flex items-center mt-6 h-20">
          <div class="w-1/4">
            <div class="avatar"></div>
          </div>
          <div class="w-3/4 flex">
            <div
              class="border border-gray-db py-1 px-3 text-xs font-circular capitalize mr-3 user-active flex items-center justify-between"
              :class="{'active': !selectedUser.isDeleted}">
              {{selectedUser.isDeleted ? 'inactive' : 'active'}}
            </div>
            <div
              v-if="selectedUser.isBlocked"
              class="border border-gray-db py-1 px-3 text-xs font-circular capitalize mr-3 user-active flex items-center justify-between"
              :class="{'blocked': selectedUser.isBlocked}">
              Blocked
            </div>
          </div>
        </div>
        <div class="flex pt-6">
          <div class="w-1/4 font-circular font-bold">Name</div>
          <div class="w-3/4">{{selectedUser.firstName || '-'}} {{selectedUser.lastName || '-'}}</div>
        </div>
        <div class="flex py-6 border-b border-gray-db">
          <div class="w-1/4 font-circular font-bold">Email</div>
          <div class="w-3/4">{{selectedUser.email}}</div>
        </div>
        <div class="flex pt-6">
          <div class="w-1/3 font-circular text-sm">Signup date</div>
          <div class="w-2/3 font-circular text-sm text-right">{{selectedUser.joinedAt | dateTimeFormat}}</div>
        </div>
        <div class="flex py-6 border-b border-gray-db">
          <div class="w-1/3 font-circular text-sm">Last active</div>
          <div class="w-2/3 font-circular text-sm text-right">{{selectedUser.lastActiveAt | dateTimeFormat}}</div>
        </div>
        <div class="py-6" v-if="selectedUser.joinedBy">
          <p class="font-semibold text-sm font-circular">Connections</p>
          <div class="flex pt-5 justify-between">
            <div class="font-circular text-sm">Connected to <span class="capitalize">{{selectedUser.joinedBy}}</span></div>
            <div class="font-circular text-sm "><img class="h-5" :src="getSocialImage(selectedUser.joinedBy)" /></div>
          </div>
        </div>
        <div class="flex pt-16 actions">
          <button
            class="relative border-black border w-1/2 py-2 px-3 flex justify-center disabled:font-gray-96 disabled:border-gray-96 items-center font-circular mr-4"
            :disabled="processing"
            @click="updateBlockedStatus(!selectedUser.isBlocked)">
            <span v-if="selectedUser.isBlocked">Unblock</span>
            <span v-else>Block</span>
          </button>
        <button
          class="relative border-black border w-1/2 py-2 px-3 flex justify-center disabled:font-gray-96 disabled:border-gray-96 items-center font-circular mr-4"
          @click="deleteUser"
          :disabled="selectedUser.isDeleted || processing">Delete</button>
      </div>
      </div>
      <div v-else class="flex items-center justify-center text-center text-2xl text-gray-c4 mt-20">
        Select a user from the left
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import chevronLeft from '@/assets/img/chevron-left.svg';
import facebook from '@/assets/img/facebook.svg';
import google from '@/assets/img/google.svg';

export default {
  name: 'Signups',
  data() {
    return {
      chevronLeft,
      facebook,
      google,
      loading: false,
      processing: false,
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
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
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
    selectUser(user) {
      if (!this.selectedUser || this.selectedUser.id !== user.id) {
        this.selectedUser = user;
        this.selectedUserId = user.id;
      } else {
        this.selectedUser = null;
        this.selectedUserId = '';
      }
    },
    handlePageChange(pageNumber) {
      this.page = pageNumber;
      this.getSignups();
    },
    getSocialImage(social) {
      return this[social];
    },
    async updateBlockedStatus(block) {
      try {
        this.processing = true;
        await this.userService.updateUserBlockStatus(this.selectedUserId, block);
        this.processing = false;
        this.displaySuccess({ message: `${this.selectedUser.firstName} has been ${block ? 'blocked' : 'unblocked'} successfully` });

        this.selectedUser = {};
        this.selectedUserId = '';

        // update the list of users
        this.getSignups();
        this.getUserStat();
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
    async deleteUser() {
      try {
        this.processing = true;
        await this.userService.deleteUser(this.selectedUserId);
        this.processing = false;
        this.displaySuccess({ message: `${this.selectedUser.firstName} has been deleted successfully` });

        this.selectedUser = {};
        this.selectedUserId = '';

        // update the list of users
        this.getSignups();
        this.getUserStat();
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
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
  .avatar {
    height: 3.75rem;
    width: 3.75rem;
    border-radius: 50%;
    background-color: #F0F0F0;
  }

  tr {
    &.active td {
      @apply border-primary border-b-2;
    }
  }

  .user-active {
    &:after {
      content: '';
      height: 0.68rem;
      width: 0.68rem;
      border-radius: 50%;
      background-color: #dbdbdb;
      position: relative;
      margin-left: 0.625rem;
    }

    &.active:after {
      background-color: #00C543;
    }

    &.blocked:after {
      background-color: #F14336;
    }
  }
</style>
