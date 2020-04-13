<template>
  <our-modal @close-modal="closeModal()" :open="true">
    <template v-slot:header>
      <p class="text-4xl" v-if="isNew">New Admin</p>
      <p class="text-4xl" v-else>Edit Admin</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="mt-16">
            <ValidationProvider rules="required" name="First name" v-slot="{ errors }">
              <label for="first-name" class=" font-semibold font-circular">First Name</label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="First Name"
                class="w-full pl-1 py-2 field border-b border-gray-400 mt-3"
                :class="errors.length > 0 ? 'border-red-600' : ''"
                v-model="newAdmin.firstName">
            </ValidationProvider>
          </div>
          <div class="mt-6">
            <ValidationProvider rules="required" name="Last name" v-slot="{ errors }">
              <label for="last-name" class=" font-semibold font-circular">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Last Name"
                class="w-full pl-1 py-2 field border-b border-gray-400 mt-3"
                :class="errors.length > 0 ? 'border-red-600' : ''"
                v-model="newAdmin.lastName">
            </ValidationProvider>
          </div>
          <div class="mt-6">
            <ValidationProvider rules="required|email" name="Email" v-slot="{ errors }">
              <label for="email" class=" font-semibold font-circular">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="mail@domain.tld"
                class="w-full pl-1 py-2 field border-b border-gray-400 mt-3"
                :class="errors.length > 0 ? 'border-red-600' : ''"
                v-model="newAdmin.email">
            </ValidationProvider>
          </div>
          <div class="mt-6">
            <ValidationProvider rules="required|length:11" name="Phone Number" v-slot="{ errors }">
              <label for="phone" class=" font-semibold font-circular">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="080xxxxxxxx"
                class="w-full pl-1 py-2 field border-b border-gray-400 mt-3"
                :class="errors.length > 0 ? 'border-red-600' : ''"
                v-model="newAdmin.phoneNumber">
            </ValidationProvider>
          </div>
          <div class="mt-6">
            <label for="permissions" class=" font-semibold font-circular">Privileges</label>
            <div class="h-64 overflow-y-scroll mt-3">
              <div v-for="(permissionObject, permissionKey) of newAdmin.permissions" :key="permissionKey" class="border-b border-gray-300 relative block permission">
                <input type="checkbox" :name="permissionKey" :id="`new-admin-${permissionKey}`" class="invisible absolute">
                <label :for="`new-admin-${permissionKey}`">
                  <header class="py-2 px-1 flex justify-between items-center cursor-pointer capitalize">
                  <span>{{permissionKey | camelCaseSeperator}}</span>
                  <img src="@/assets/img/dropdown-indicator.svg" alt="dropdown indicator">
                </header>
                </label>
                <div class="permission-items relative">
                  <label
                    :for="`new-admin-${permissionKey}_${action}`"
                    v-for="(value, action) of permissionObject"
                    :key="`${permissionKey}_${action}`"
                    :class="{'selected': newAdmin.permissions[permissionKey][action]}"
                    class="permission-item flex items-center justify-between h-10 pl-3 cursor-pointer capitalize block">
                    <input
                      v-model="newAdmin.permissions[permissionKey][action]"
                      type="checkbox"
                      :name="`new-admin-${permissionKey}_${action}`"
                      :id="`new-admin-${permissionKey}_${action}`"
                      class="absolute invisible">
                    {{action}}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <button class="bg-primary text-white font-circular py-3 px-12 w-full" type="submit" :disabled="invalid || creatingAdminLoading">
              <span v-if="!creatingAdminLoading">
                <span v-if="isNew">Create</span>
                <span v-else>Edit</span>
              </span>
              <span v-else>Submitting...</span>
            </button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </our-modal>
</template>

<script>
import { mapActions } from 'vuex';
import cloneDeep from 'lodash.clonedeep';

import defaultPermissions from '@/assets/json/permissions.json';

export default {
  name: 'NewAdminModal',
  props: {
    adminId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      adminServices: this.$serviceFactory.admins,
      creatingAdminLoading: false,
      newAdmin: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        permissions: cloneDeep(defaultPermissions),
      },
    };
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.creatingAdminLoading = true;
      const payload = { ...this.newAdmin };

      try {
        if (this.isNew) {
          await this.adminServices.addNewAdmin(payload);
        } else {
          await this.adminServices.editAdmin(this.adminId, payload);
        }

        // update the list of admins
        const { data } = await this.adminServices.getAdmins();
        const { admins } = data;
        this.$store.commit('storeAdmins', admins);
        this.displaySuccess({ message: `Admin has been ${this.isNew ? 'created' : 'edited'} successully` });
        this.closeModal();
      } catch (error) {
        this.displayError(error);
      } finally {
        this.creatingAdminLoading = false;
      }
    },
  },
  computed: {
    isNew() {
      return !this.adminId;
    },
  },
  async mounted() {
    if (this.adminId) {
      const {
        firstName = '',
        lastName = '',
        email = '',
        phoneNumber = '',
        permissions = {},
      } = this.$store.getters.getAdmin(this.adminId);

      this.newAdmin = {
        firstName,
        lastName,
        email,
        phoneNumber,
        permissions: cloneDeep({ ...defaultPermissions, ...permissions }),
      };
    }
  },
};
</script>

<style lang="scss" scoped>
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
