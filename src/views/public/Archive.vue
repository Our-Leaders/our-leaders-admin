<template>
  <div class="lg:flex">
    <div class="w-full">
      <header>
        <h5 class="text-4xl">
          Archived
        </h5>
      </header>
      <div class="stats flex mt-6 mb-16">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total Inactive Admins</p>
          <p class="stat-data">{{admins.length}}</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Total Users to be Deleted</p>
          <p class="stat-data">{{users.length}}</p>
        </div>
      </div>
      <our-tabs class="w-full md:w-10/12" :tabs="tabs" @change="setFilter"></our-tabs>
      <div>
        <table class="w-full md:w-10/12 table-auto">
          <thead>
            <tr>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Name</th>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Email</th>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96">Created</th>
              <th class="w-1/3 py-3 text-left font-circular font-bold border-b border-gray-96" v-if="selectedEntity === 'admins'"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entity, id) of entities"
              :key="id">
              <td class="border-b border-gray-db py-3 capitalize">
                {{entity.firstName || '--'}} {{entity.lastName || '--'}}
              </td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{entity.email}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular">{{entity.joinedAt | dateTimeFormat}}</td>
              <td class="border-b border-gray-db py-3 text-sm font-circular" v-if="selectedEntity === 'admins'">
                <button class="border border-grey-800 hover:bg-black hover:text-white hover:border-black px-3 py-1 text-sm font-circular mr-4"
                :disabled="processing"
                @click="reactivateAdmin(entity)">Activate</button>
              </td>
            </tr>
            <tr aria-colspan="4" v-if="entities.length === 0 && !loading">
              <td colspan="4" class="text-center p-8">
                <p>No {{selectedEntity}} available.</p>
              </td>
            </tr>
            <tr aria-colspan="4" cols="4" v-if="loading">
              <td colspan="4" class="text-center p-8">
                <span class="loading lg mx-auto mb-2"></span>
                <span>Loading...</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Archive',
  data() {
    return {
      admins: [],
      adminServices: this.$serviceFactory.admins,
      entities: [1, 2, 3, 4],
      loading: true,
      processing: false,
      selectedEntity: 'admins',
      tabs: [{
        label: 'Inactive Admins',
        value: 'admins',
      }, {
        label: 'Users to be deleted',
        value: 'users',
      }],
      users: [],
      usersServices: this.$serviceFactory.users,
    };
  },
  mounted() {
    this.getAdmins();
    this.getUsers();
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    async getAdmins() {
      const response = await this.adminServices.getAdmins({ isDeleted: false });
      this.admins = response.data.admins;
      this.setFilter('admins');
      this.loading = false;
    },
    async getUsers() {
      const response = await this.usersServices.getUsers({ isDeleted: false });
      this.users = response.data.users;
    },
    async reactivateAdmin(admin) {
      try {
        this.processing = true;
        await this.adminServices.reactivateAdmin(admin.id);

        this.processing = false;
        this.displaySuccess({ message: `${admin.firstName} has been reactivated.` });
        this.admins.splice(this.admins.findIndex(x => x.id === admin.id), 1);
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
    setFilter(event) {
      this.selectedEntity = event;
      this.entities = event === 'admins' ? this.admins : this.users;
    },
  },
};
</script>
