<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit Contact</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full">Contact Details</p>
            <div class="flex my-3">
              <div class="w-1/3 self-end">
                Address
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Address" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    v-model="page.contact.address" />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Phone
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required|length:11" name="Phone" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    v-model="page.contact.phoneNumber" />
                  </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Email
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Email" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@domain.tld"
                    v-model="page.contact.email" />
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full">Socials</p>
            <div class="flex my-3">
              <div class="w-1/2 mr-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/facebook.svg" alt="facebook link">
                </div>
                <input class="w-full pl-1 py-2 field border-b border-gray-400" type="url" id="socials-facebook-link"
                  name="socials-facebook-link" placeholder="Facebook Link" v-model="page.socials.facebook" />
              </div>
              <div class="w-1/2 ml-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/twitter.svg" alt="twitter link">
                </div>
                <input class="w-full pl-1 py-2 field border-b border-gray-400" type="url" id="socials-twitter-link"
                  name="socials-twitter-link" placeholder="Twitter Link" v-model="page.socials.twitter" />
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 mr-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/instagram.svg" alt="instagram link">
                </div>
                <input class="w-full pl-1 py-2 field border-b border-gray-400" type="url" id="socials-instagram-link"
                  name="socials-instagram-link" placeholder="Instagram Link" v-model="page.socials.instagram" />
              </div>
              <div class="w-1/2 ml-3 relative">
                <div class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/social/linkedin.svg" alt="linkedin link">
                </div>
                <input class="w-full pl-1 py-2 field border-b border-gray-400" type="url" id="socials-linkedin-link"
                  name="socials-linkedin-link" placeholder="linkedin Link" v-model="page.socials.linkedIn" />
              </div>
            </div>
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid || saveContactDetailsLoading">
              <span v-if="!saveContactDetailsLoading">Save</span>
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
import { mapActions } from 'vuex';

export default {
  name: 'EditContactModal',
  data() {
    return {
      pagesServices: this.$serviceFactory.pages,
      saveContactDetailsLoading: false,
      page: {
        aboutUs: '',
        socials: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedIn: '',
        },
        contact: {
          address: '',
          phoneNumber: '',
          email: '',
        },
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.saveContactDetailsLoading = true;

      try {
        const { data } = await this.pagesServices.updatePages(this.page);
        const { page } = data;

        this.$store.commit('setPage', page);
        this.displaySuccess({ message: 'Contact details updated successfully' });
        this.closeModal();
      } catch (err) {
        this.displayError(err);
      } finally {
        this.saveContactDetailsLoading = false;
      }
    },
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
  },
  mounted() {
    const { aboutUs, socials, contact } = this.$store.getters.getPage();
    this.page = {
      aboutUs,
      socials: { ...socials },
      contact: { ...contact },
    };
  },
};
</script>

<style scoped lang="scss">
  .form-icon {
    img {
      height: 1rem;
    }
  }
</style>
