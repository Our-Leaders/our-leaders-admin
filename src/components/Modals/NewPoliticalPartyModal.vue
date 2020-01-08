<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">New Party</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex mt-6 social-links">
            <div class="w-1/3 flex">
              <label for="political-party-logo" class="w-40 h-32 block cursor-pointer">
                <input type="file" name="political party logo" id="political-party-logo" class="hidden" accept="image/*" @change="onFileUpload($event);">
                <div class="w-full h-full political-party-logo flex items-center justify-center" v-if="!uploadedLogoSrc">
                  <span class="text-white text-sm font-circular">Upload picture</span>
                </div>
                <div v-bind:style="{ 'background-image': 'url('+ uploadedLogoSrc +')'  }" class="w-full h-full bg-cover bg-center bg-no-repeat"></div>
              </label>
            </div>
            <div class="w-2/3">
              <div class="flex mb-3">
                <div class="w-1/2 mr-3 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/facebook.svg" alt="facebook link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="url"
                    id="politial-party-facebook-link"
                    name="politial-party-facebook-link"
                    placeholder="Facebook Link"
                    v-model="partyData.socials.facebook"/>
                </div>
                <div class="w-1/2 ml-3 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/twitter.svg" alt="twitter link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="url"
                    id="politial-party-twitter-link"
                    name="politial-party-twitter-link"
                    placeholder="Twitter Link"
                    v-model="partyData.socials.twitter"/>
                </div>
              </div>
              <div class="flex">
                <div class="w-1/2 mr-3 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/instagram.svg" alt="instagram link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="url"
                    id="politial-party-instagram-link"
                    name="politial-party-instagram-link"
                    placeholder="Instagram Link"
                    v-model="partyData.socials.instagram"/>
                </div>
                <div class="w-1/2"></div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Party Name
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Party name" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="party-name"
                    name="party-name"
                    placeholder="Name"
                    v-model="partyData.name" />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Party Leader
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Political party leader" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="party-leader"
                    name="party-leader"
                    placeholder="Party Leader Name"
                    v-model="partyData.partyLeader" />
                  </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Party Acronym
              </div>
              <div class="w-2/3">
                <input
                  class="w-full pl-1 py-2 field border-b border-gray-400"
                  type="text"
                  id="party-acronym"
                  name="party-acronym"
                  placeholder="Acronym"
                  v-model="partyData.acronym" />
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Year Established
              </div>
              <div class="w-2/3">
                <ValidationProvider :rules="yearEstablishedValidationString" name="Year Established" v-slot="{ errors }">
                 <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="number"
                    id="yearEstablished"
                    name="yearEstablished"
                    placeholder="Year Established"
                    v-model="partyData.yearEstablished" />
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid || creatingPartyLoading">
              <span v-if="!creatingPartyLoading">Save</span>
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
  name: 'NewPartyModal',
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      partyData: {
        socials: {
          instagram: '',
          facebook: '',
          twitter: '',
        },
        name: '',
        yearEstablished: '',
        partyLeader: '',
        acronym: '',
      },
      creatingPartyLoading: false,
      uploadedLogoSrc: '',
      logoFile: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.creatingPartyLoading = true;

      let payload;

      if (this.uploadedLogoSrc) {
        payload = new FormData();

        Object.keys(this.partyData).forEach((key) => {
          payload.set(key, this.partyData[key]);
        });

        payload.set('file', this.logoFile);

        if (payload.get('acronym') === '') {
          payload.delete('acronym');
        }

        if (payload.get('politicalParty') === '') {
          payload.delete('politicalParty');
        }
      } else {
        payload = { ...this.partyData };

        if (payload.status === '') {
          delete payload.status;
        }

        if (payload.politicalParty === '') {
          delete payload.politicalParty;
        }
      }

      try {
        // create the political party
        await this.politicalPartyServices.createNewPoliticalParty(payload);

        // update the list of political parties
        const { data } = await this.politicalPartyServices.getPoliticalParties();
        const { politicalParties } = data;
        this.$store.commit('storePoliticalParties', politicalParties);
        this.closeModal();
      } catch (err) {
        // do something with the error here
      } finally {
        this.creatingPartyLoading = false;
      }
    },
    onFileUpload($event) {
      if ($event.target.files.length > 0) {
        const file = $event.target.files[0];

        const self = this;
        const fileReader = new FileReader();
        fileReader.onload = function onload() {
          self.uploadedLogoSrc = this.result;
        };
        fileReader.readAsDataURL(file);
        this.logoFile = file;
      }
    },
  },
  computed: {
    maxYear() {
      return new Date().getFullYear();
    },
    yearEstablishedValidationString() {
      return `required|min_value:1900|max_value:${this.maxYear}`;
    },
  },
};
</script>

<style>
  .political-party-logo {
    background-image: url('../../assets/img/default-avatar.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
