<template>
  <div class="admin-details fixed bottom-0 right-0 pb-6 overflow-y-scroll xl:pl-8 xl:pr-16">
    <h5 class="text-2xl pb-4 border-b border-primary">
      Admin details
    </h5>
    <div v-if="adminId">
      <div class="flex items-center mt-6 h-20">
        <div class="w-1/4">
          <div class="avatar"></div>
        </div>
        <div class="w-3/4 flex">
          <div class="border border-gray-db py-1 px-3 text-xs font-circular capitalize mr-3 admin-active flex items-center justify-between" :class="{'active': !admin.isDeleted}">{{admin.isDeleted ? 'inactive' : 'active'}}</div>
          <div class="border border-gray-db py-1 px-3 text-xs font-circular capitalize admin-role">{{roles[admin.role]}}</div>
        </div>
      </div>
      <div class="flex pt-6">
        <div class="w-1/4 font-circular font-bold">Name</div>
        <!-- <div class="w-3/4">--</div> -->
        <div class="w-3/4">{{admin.firstName}} {{admin.lastName}}</div>
      </div>
      <div class="flex py-6 border-b border-gray-db">
        <div class="w-1/4 font-circular font-bold">Email</div>
        <div class="w-3/4">{{admin.email}}</div>
      </div>
      <div class="flex pt-6">
        <div class="w-1/3 font-circular text-sm">Account created</div>
        <div class="w-2/3 font-circular text-sm text-right">{{admin.joinedAt | dateTimeFormat}}</div>
      </div>
      <div class="flex pt-6">
        <div class="w-1/3 font-circular text-sm">Created by</div>
        <div class="w-2/3 font-circular text-sm text-right">--</div>
      </div>
      <div class="flex py-6 border-b border-gray-db">
        <div class="w-1/3 font-circular text-sm">Last active</div>
        <div class="w-2/3 font-circular text-sm text-right">--</div>
      </div>
      <div class="pt-6">
        <div class="text-sm font-circular font-bold">Privileges</div>
        <div class="h-64 overflow-y-scroll">
          <div v-for="(permissionObject, permissionKey) of admin.permissions" :key="permissionKey" class="border-b border-gray-300 relative block permission">
            <input type="checkbox" :name="permissionKey" :id="permissionKey" class="invisible absolute">
            <label :for="permissionKey">
              <header class="py-2 px-1 flex justify-between items-center cursor-pointer capitalize">
              <span>{{permissionKey | camelCaseSeperator}}</span>
              <img src="./../assets/img/dropdown-indicator.svg" alt="dropdown indicator">
            </header>
            </label>
            <div class="permission-items">
              <div
                @click.prevent="togglePermission(`${permissionKey}.${action}`)"
                v-for="(value, action) of permissionObject"
                :key="`${permissionKey}_${action}`"
                :class="{'selected': value}"
                class="permission-item flex items-center justify-between h-10 pl-3 cursor-pointer capitalize">
                {{action}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex pt-16 actions">
    <button class="relative border-black border w-40 py-2 px-3 flex justify-center disabled:font-gray-96 disabled:border-gray-96 items-center font-circular mr-4" :disabled="processing" @click="updateBlockedStatus(!admin.isBlocked)">
       <span v-if="admin.isBlocked">Unblock</span>
       <span v-else>Block</span>
    </button>
        <button class="relative border-black border w-40 py-2 px-3 flex justify-center disabled:font-gray-96 disabled:border-gray-96 items-center font-circular mr-4" @click="deleteAdmin" :disabled="admin.isDeleted || processing">Delete</button>
      </div>
    </div>
    <div v-else class="flex items-center justify-center text-center text-2xl text-gray-c4 mt-20">
      Select an Admin from the left
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import cloneDeep from 'lodash.clonedeep';

import defaultPermissions from '@/assets/json/permissions.json';

export default {
  name: 'AdminDetails',
  props: {
    adminId: {
      type: String,
    },
  },
  data() {
    return {
      adminServices: this.$serviceFactory.admins,
      processing: false,
      roles: {
        superadmin: 'super admin',
        admin: 'admin',
      },
    };
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    async updateBlockedStatus(block) {
      try {
        this.processing = true;
        await this.adminServices.updateAdminStatus(this.admin.id, { block });
        this.processing = false;
        this.displaySuccess({ message: `${this.admin.firstName} has been ${block ? 'blocked' : 'unblocked'} successfully` });

        // update the list of admins
        const { data } = await this.adminServices.getAdmins();
        const { admins } = data;
        this.$store.commit('storeAdmins', admins);
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
    async deleteAdmin() {
      try {
        this.processing = true;
        await this.adminServices.deleteAdmin(this.admin.id);
        this.processing = false;
        this.displaySuccess({ message: `${this.admin.firstName} has been deleted successfully` });

        // update the list of admins
        const { data } = await this.adminServices.getAdmins();
        const { admins } = data;
        this.$store.commit('storeAdmins', admins);
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
    togglePermission() {},
  },
  computed: {
    admin() {
      const admin = this.$store.getters.getAdmin(this.adminId);

      return {
        ...admin,
        permissions: cloneDeep({ ...defaultPermissions, ...admin.permissions }),
      };
    },
  },
};
</script>

<style  lang="scss" scoped>
  .admin-details {
    top: 9rem;
  }

  .admin-active {
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

  .avatar {
    height: 3.75rem;
    width: 3.75rem;
    border-radius: 50%;
    background-color: #F0F0F0;
  }

  .permission header img {
    transform: rotate(-90deg);
    transition: 0.4s transform;
    height: 0.5rem;
  }

  .permission-items {
    display: none;
  }

  .permission input[type="checkbox"]:checked ~ label header img {
    transform: rotate(0deg);
  }

  input[type="checkbox"]:checked ~ .permission-items {
    display: block;
  }

  .permission-item {
    &:after {
      content: '';
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      border: 1px solid #dbdbdb;
      position: relative;
      margin-right: 0.625rem;
    }

    &.selected:after {
      background-color: #00C543;
      border-color: #00C543;
    }
  }
</style>
