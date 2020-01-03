<template>
  <div class="w-full h-full">
    <h5 class="text-2xl pb-4 border-b border-primary">
      Admin details
    </h5>
    <div v-if="admin">
      <div class="flex items-center mt-6 h-20">
        <div class="w-1/4">
          <div class="avatar"></div>
        </div>
        <div class="w-3/4 flex">
          <div class="border border-gray-db py-1 px-3 font-xs font-circular capitalize mr-3 admin-active flex items-center justify-between" :class="{'active': !admin.isDeleted}">{{admin.isDeleted ? 'inactive' : 'active'}}</div>
          <div class="border border-gray-db py-1 px-3 font-xs font-circular capitalize admin-role">{{roles[admin.role]}}</div>
        </div>
      </div>
      <div class="flex pt-6">
        <div class="w-1/4 font-circular font-bold">Name</div>
        <div class="w-3/4">--</div>
        <!-- <div class="w-3/4">{{admin.firstName}} {{admin.lastName}}</div> -->
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
      </div>
      <div class="flex pt-6 actions">
        <button class="relative border-black border w-40 py-2 px-3 flex justify-center disabled:font-gray-96 disabled:border-gray-96 items-center font-circular mr-4" :disabled="admin.isBlocked">Block</button>
        <button class="relative border-black border w-40 py-2 px-3 flex justify-center disabled:font-gray-96 disabled:border-gray-96 items-center font-circular mr-4" :disabled="admin.isDeleted">Delete</button>
      </div>
    </div>
    <div v-else class="flex items-center justify-center text-center h-full text-2xl text-gray-c4 mt-20">
      Select an Admin from the right
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDetails',
  props: {
    admin: {
      type: Object,
    },
  },
  data() {
    return {
      roles: {
        superadmin: 'super admin',
        admin: 'admin',
      },
    };
  },
};
</script>

<style  lang="scss" scoped>
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
  }

  .avatar {
    height: 3.75rem;
    width: 3.75rem;
    border-radius: 50%;
    background-color: #F0F0F0;
  }
</style>
