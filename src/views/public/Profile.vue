<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Account
        </h5>
        <div class="flex justify-between items-center">
          <button class="border-black border py-1 px-3 flex justify-between items-center font-circular ml-4" @click="editProfile">Edit Profile</button>
        </div>
      </header>
      <div class="mt-10 pb-6 flex border-b border-gray-db">
        <div class="w-3/4">
          <div class="flex mb-6">
            <div class="w-1/5 font-circular font-semibold">Name</div>
            <div class="w-4/5">
              {{user.firstName}}
              {{user.lastName}}
            </div>
          </div>
          <div class="flex mb-6">
            <div class="w-1/5 font-circular font-semibold">Email</div>
            <div class="w-4/5">
              {{user.email}}
            </div>
          </div>
          <!-- <div class="flex mb-6">
            <div class="w-1/5 font-circular font-semibold">Phone</div>
            <div class="w-4/5">
              {{user.phoneNumber}}
            </div>
          </div> -->
        </div>
        <div class="w-1/4 flex justify-end">
          <div class="w-32 h-32 bg-gray-db rounded-full bg-center bg-no-repeat bg-cover"></div>
        </div>
      </div>
      <button class="border-black border py-1 text-center w-64 text-sm font-circular mt-8">Sign out</button>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  methods: {
    editProfile() {
      this.$store.commit('openModal', { modalName: 'EditProfileModal' });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
