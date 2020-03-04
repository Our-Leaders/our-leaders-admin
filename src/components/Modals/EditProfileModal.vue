<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit Account</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex mt-6 social-links">
            <div class="w-1/3 flex">
              <label for="profile-image" class="w-40 h-32 block cursor-pointer">
                <input type="file" name="profile image" id="profile-image" class="hidden" accept="image/*" @change="onFileUpload($event);">
                <div class="w-full h-full profile-image flex items-center justify-center" v-if="!uploadedImageSrc">
                  <span class="text-white text-sm font-circular">Upload picture</span>
                </div>
                <!-- thinking of using canvas here so I can make modifications to the image after upload -->
                <div v-bind:style="{ 'background-image': 'url('+ uploadedImageSrc +')'  }" class="w-full h-full bg-cover bg-no-repeat"></div>
              </label>
            </div>
            <div class="w-2/3">
            </div>
          </div>
          <div class="mt-10">
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                First Name
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="First name" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="admin-first-name"
                    name="admin-first-name"
                    v-model="user.firstName"
                    placeholder="First Name" />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Last Name
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Last name" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="admin-last-name"
                    name="admin-last-name"
                    v-model="user.lastName"
                    placeholder="Last Name" />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Email
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required|email" name="Email" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400 text-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="email"
                    id="admin-email"
                    name="admin-email"
                    v-model="user.email"
                    disabled
                    placeholder="email@host.tld" />
                </ValidationProvider>
              </div>
            </div>
            <!-- <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Password
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Password" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="password"
                    id="admin-password"
                    name="admin-password" />
                </ValidationProvider>
              </div>
            </div> -->
            <!-- <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Phone
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Phone Number" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="admin-phone-number"
                    v-model="user.phone"
                    name="admin-phone-number" />
                </ValidationProvider>
              </div>
            </div> -->
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid || editProfileLoading">
              <span v-if="!editProfileLoading">Save</span>
              <span v-else>Submitting...</span>
            </button>
            <button class="font-circular py-3 px-12" @click="closeModal()">Cancel</button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </our-modal>
</template>

<script>
export default {
  name: 'EditProfileModal',
  data() {
    return {
      userServices: this.$serviceFactory.users,
      editProfileLoading: false,
      uploadedImageSrc: '',
      profileImageFile: '',
      user: {
        firstName: '',
        lastName: '',
        email: '',
        // phone: '',
        id: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.editProfileLoading = true;

      let payload;

      if (this.uploadedImageSrc && this.profileImageFile) {
        payload = new FormData();

        Object.keys(this.user).forEach((key) => {
          payload.set(key, this.user[key]);
        });

        payload.set('file', this.profileImageFile);
      } else {
        payload = { ...this.user };
      }

      try {
        const { data } = await this.userServices.editSelf(this.user.id, payload);
        const { user } = data;

        this.$store.commit('setCurrentUser', user);
        this.closeModal();
      } catch (err) {
        // do something with error here
      } finally {
        this.editProfileLoading = false;
      }
    },
  },
  mounted() {
    const {
      firstName, lastName, id, email, phone,
    } = this.$store.state.currentUser;
    this.user = {
      firstName, lastName, id, email, phone,
    };
  },
};
</script>

<style scoped lang="scss">
  .profile-image {
    background-image: url('../../assets/img/default-avatar.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
