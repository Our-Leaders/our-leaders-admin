<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl" v-if="isNew">New Party</p>
      <p class="text-4xl" v-else>Edit Party</p>
    </template>
    <template v-slot:content>
      <our-image-crop v-if="isCropping" v-on:complete="onFileUpload" v-on:dismiss="toggleCropModal" />
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex mt-6 social-links">
            <div class="w-1/3 flex">
              <label for="political-party-logo" class="w-40 h-32 block cursor-pointer" @click="toggleCropModal">
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
                    type="text"
                    id="politial-party-facebook-link"
                    name="politial-party-facebook-link"
                    placeholder="Facebook Handle"
                    v-model="partyData.facebook"/>
                </div>
                <div class="w-1/2 ml-3 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/twitter.svg" alt="twitter link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="text"
                    id="politial-party-twitter-link"
                    name="politial-party-twitter-link"
                    placeholder="Twitter Handle"
                    v-model="partyData.twitter"/>
                </div>
              </div>
              <div class="flex">
                <div class="w-1/2 mr-3 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/instagram.svg" alt="instagram link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="text"
                    id="politial-party-instagram-link"
                    name="politial-party-instagram-link"
                    placeholder="Instagram Handle"
                    v-model="partyData.instagram"/>
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
                Country
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Politician Country" v-slot="{ errors }">
                  <v-select
                    id="politician-country"
                    name="politician-country"
                    :disabled="true"
                    :clearable="false"
                    v-model="partyData.country"
                    :options="countries"
                    :reduce="type => type.acronym"
                    :class="{'has-error': errors.length > 0}"
                    class="our-select">
                      <template #option="{ name, flag }">
                        <div class="flex items-center">
                          <img :src="countryFlag(flag)" class="mr-1"/>
                          <span>{{name}}</span>
                        </div>
                      </template>
                      <template #selected-option="{ name, flag }">
                        <div class="flex items-center">
                          <img :src="countryFlag(flag)" class="mr-1"/>
                          <span>{{name}}</span>
                        </div>
                      </template>
                    </v-select>
                </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-6">
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
            <div class="flex mb-">
              <div class="w-1/3">
                Party Background
              </div>
              <div class="w-2/3">
                <textarea
                  v-model="partyData.partyBackground"
                  class="w-full pl-1 py-2 field border-b border-gray-400"
                  rows="7"></textarea>
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
import { mapActions } from 'vuex';
import countries from '@/assets/json/countrylist.json';

export default {
  name: 'NewPartyModal',
  props: {
    politicalPartyId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      partyData: {
        instagram: '',
        facebook: '',
        twitter: '',
        name: '',
        yearEstablished: '',
        partyLeader: '',
        acronym: '',
        partyBackground: '',
        country: 'NG',
      },
      creatingPartyLoading: false,
      uploadedLogoSrc: '',
      logoFile: '',
      countries: Object.keys(countries).map(countryKey => countries[countryKey]),
      isCropping: false,
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
      this.creatingPartyLoading = true;

      let payload;

      if (this.uploadedLogoSrc && this.logoFile) {
        payload = new FormData();

        Object.keys(this.partyData).forEach((key) => {
          payload.set(key, this.partyData[key]);
        });

        payload.set('file', this.logoFile);
      } else {
        payload = { ...this.partyData };
      }

      try {
        if (this.isNew) {
          // create the political party
          await this.politicalPartyServices.createNewPoliticalParty(payload);

          const { data } = await this.politicalPartyServices.getPoliticalParties();
          const { politicalParties, total: politicalPartyCount } = data;
          this.$store.commit('storePoliticalParties', { politicalParties, politicalPartyCount });
        } else {
          // update a political party
          const { data } = await this.politicalPartyServices.editPoliticalParty(this.politicalPartyId, payload);

          // update the party in the store
          const { politicalParty } = data;
          this.$store.commit('editPoliticalParty', { partyData: politicalParty });
        }
        this.displaySuccess({ message: `Party has been ${this.isNew ? 'created' : 'edited'} successfully` });

        this.closeModal();
      } catch (error) {
        this.displayError(error);
      } finally {
        this.creatingPartyLoading = false;
      }
    },
    onFileUpload($event) {
      if ($event) {
        const file = $event;

        const self = this;
        const fileReader = new FileReader();
        fileReader.onload = function onload() {
          self.uploadedLogoSrc = this.result;
        };
        fileReader.readAsDataURL(file);
        this.logoFile = file;
        this.toggleCropModal();
      }
    },
    toggleCropModal() {
      this.isCropping = !this.isCropping;
    },
    countryFlag(flag) {
      const images = require.context('@/assets/img/flags', false, /\.svg$/);
      return images(`./${flag}`);
    },
  },
  computed: {
    maxYear() {
      return new Date().getFullYear();
    },
    yearEstablishedValidationString() {
      return `required|min_value:1900|max_value:${this.maxYear}`;
    },
    isNew() {
      return !this.politicalPartyId;
    },
  },
  async mounted() {
    if (this.politicalPartyId) {
      const {
        socials = { ...this.partyData.socials },
        name = '',
        partyDescription = {},
        acronym = '',
        partyBackground = '',
        logo = '',
        country = 'NG',
      } = this.$store.getters.getPoliticalParty(this.politicalPartyId);

      this.partyData = {
        socials,
        name,
        yearEstablished: partyDescription.founded,
        partyLeader: partyDescription.partyChairman,
        acronym,
        partyBackground,
        country,
      };

      this.partyData.facebook = socials.facebook;
      this.partyData.twitter = socials.twitter;
      this.partyData.instagram = socials.instagram;

      this.uploadedLogoSrc = logo;
    }
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
