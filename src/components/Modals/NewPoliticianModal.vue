<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
  <!-- <our-modal @close-modal="closeModal()" :open="showNewPoliticianModal" size="large"> -->
    <template v-slot:header>
      <p class="text-4xl" v-if="isNew">New leader</p>
      <p class="text-4xl" v-else>Edit leader profile</p>
    </template>
    <template v-slot:content>
      <our-image-crop v-if="isCropping" v-on:complete="onFileUpload" v-on:dismiss="toggleCropModal" />
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex flex-wrap lg:flex-no-wrap mt-6 social-links">
            <div class="w-full lg:w-1/3 flex mb-4 lg:mb-0">
              <label for="politician-image" class="w-full lg:w-40 h-64 lg:h-32 block cursor-pointer" @click="toggleCropModal">
                <div class="w-full h-full politician-profile-image flex items-center justify-center" v-if="!uploadedImageSrc">
                  <span class="text-white text-sm font-circular">Upload picture</span>
                </div>
                <!-- thinking of using canvas here so I can make modifications to the image after upload -->
                <div v-bind:style="{ 'background-image': 'url('+ uploadedImageSrc +')'  }" class="w-full h-full bg-cover bg-no-repeat"></div>
              </label>
            </div>
            <div class="w-full lg:w-2/3">
              <div class="flex flex-wrap lg:flex-no-wrap mb-3">
                <div class="w-full lg:w-1/2 lg:mr-3 mb-4 lg:mb-0 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/facebook.svg" alt="facebook link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="text"
                    id="politician-facebook-link"
                    name="politician-facebook-link"
                    placeholder="Facebook Handle"
                    v-model="politicianData.facebook"/>
                </div>
                <div class="w-full lg:w-1/2 lg:ml-3 mb-4 lg:mb-0 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/twitter.svg" alt="twitter link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="text"
                    id="politician-twitter-link"
                    name="politician-twitter-link"
                    placeholder="Twitter Handle"
                    v-model="politicianData.twitter"/>
                </div>
              </div>
              <div class="flex flex-wrap lg:flex-no-wrap">
                <div class="w-full lg:w-1/2 lg:mr-3 mb-4 lg:mb-0 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/instagram.svg" alt="instagram link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="text"
                    id="politician-instagram-link"
                    name="politician-instagram-link"
                    placeholder="Instagram Handle"
                    v-model="politicianData.instagram"/>
                </div>
                <div class="w-full lg:w-1/2"></div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full">Personal Information</p>
            <div class="flex flex-wrap lg:flex-no-wrap mb-6 lg:mb-3">
              <div class="w-full lg:w-1/3 self-end">
                Name
              </div>
              <div class="w-full lg:w-2/3">
                <ValidationProvider rules="required" name="Politician name" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    type="text"
                    id="politician-name"
                    name="politician-name"
                    placeholder="Name"
                    v-model="politicianData.name" />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex flex-wrap lg:flex-no-wrap mb-6 lg:mb-3">
              <div class="w-full lg:w-1/3 self-end">
                Date of birth
              </div>
              <div class="w-full lg:w-2/3">
                <ValidationProvider rules="required" name="Politician DOB" v-slot="{ errors }">
                  <v-datepicker
                    placeholder="DD/MM/YYYY"
                    format="dd/MM/yyyy"
                    v-model="politicianData.dob"
                    :required="true"
                    :input-class="datePickerClasses(errors.length > 0)">
                  </v-datepicker>
                  </ValidationProvider>
              </div>
            </div>
            <div class="flex flex-wrap lg:flex-no-wrap mb-6 lg:mb-3">
              <div class="w-full lg:w-1/3 self-end">
                Country
              </div>
              <div class="w-full lg:w-2/3">
                <ValidationProvider rules="required" name="Politician Country" v-slot="{ errors }">
                  <v-select
                    id="politician-country"
                    name="politician-country"
                    :disabled="true"
                    :clearable="false"
                    v-model="politicianData.country"
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
            <div class="flex flex-wrap lg:flex-no-wrap mb-6 lg:mb-3">
              <div class="w-full lg:w-1/3 self-end">
                State of origin
              </div>
              <div class="w-full lg:w-2/3">
                <ValidationProvider rules="required" name="Politician State of origin" v-slot="{ errors }">
                  <v-select
                    id="politician-party"
                    name="politician-party"
                    :clearable="false"
                    :options="nigerianStates"
                    v-model="politicianData.stateOfOrigin"
                    :class="{'has-error': errors.length > 0}"
                    :filterable="false"
                    @search="stateSearch"
                    class="our-select">
                      <template slot="no-options">
                        start typing to search for states
                      </template>
                    </v-select>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full">Political Information</p>
            <div class="flex flex-wrap lg:flex-no-wrap mb-6 lg:mb-3">
              <div class="w-full lg:w-1/3 self-end">
                Status
              </div>
              <div class="w-full lg:w-2/3">
                <v-select
                  id="politician-status"
                  name="politician-status"
                  :clearable="false"
                  v-model="politicianData.status"
                  :options="['current', 'past', 'upcoming']"
                  class="our-select"></v-select>
              </div>
            </div>
            <div class="flex flex-wrap lg:flex-no-wrap mb-6 lg:mb-3">
              <div class="w-full lg:w-1/3 self-end">
                Party
              </div>
              <div class="w-full lg:w-2/3">
                <v-select
                  id="politician-party"
                  name="politician-party"
                  label="name"
                  :reduce="party => party.id"
                  :clearable="false"
                  @search="onSearch"
                  :filterable="false"
                  :options="politicalParties"
                  v-model="politicianData.politicalParty"
                  class="our-select">
                    <template slot="no-options">
                      type to search political parties
                    </template>
                    <!-- <template #list-footer>
                      <li style="text-align: center">type to search political parties</li>
                    </template> -->
                  </v-select>
              </div>
            </div>
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12"
                    type="submit"
                    :disabled="invalid || creatingPoliticianLoading">
              <span v-if="!creatingPoliticianLoading">Save</span>
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
import debounce from 'lodash.debounce';
import includes from 'lodash.includes';

import countries from '@/assets/json/countrylist.json';
import nigerianStates from '@/assets/json/nigerianStates.json';

export default {
  name: 'NewLeaderModal',
  props: {
    politicianId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      politicianServices: this.$serviceFactory.politicians,
      nigerianStates: [],
      politicianData: {
        instagram: '',
        facebook: '',
        twitter: '',
        name: '',
        dob: '',
        stateOfOrigin: '',
        politicalParty: '',
        status: '',
        country: 'NG',
      },
      politicalParties: [],
      creatingPoliticianLoading: false,
      uploadedImageSrc: '',
      profileImageFile: '',
      countries: Object.keys(countries).map(countryKey => countries[countryKey]),
      isCropping: false,
    };
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    stateSearch(query) {
      if (query === '') {
        this.nigerianStates = [];
        return;
      }

      this.nigerianStates = nigerianStates.filter(state => includes(state.toLowerCase(), query.toLowerCase()));
    },
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.creatingPoliticianLoading = true;

      // const payload = { ...this.politicianData };
      let payload;

      if (this.uploadedImageSrc && this.profileImageFile) {
        payload = new FormData();

        Object.keys(this.politicianData).forEach((key) => {
          payload.set(key, this.politicianData[key]);
        });

        payload.set('file', this.profileImageFile);

        if (payload.get('status') === '') {
          payload.delete('status');
        }

        if (payload.get('politicalParty') === '') {
          payload.delete('politicalParty');
        }
      } else {
        payload = { ...this.politicianData };

        if (payload.status === '') {
          delete payload.status;
        }

        if (payload.politicalParty === '') {
          delete payload.politicalParty;
        }
      }

      try {
        // create the politician
        if (this.isNew) {
          await this.politicianServices.createNewPolitician(payload);

          // update the list of politicians
          const { data } = await this.politicianServices.getPoliticians({});
          const { politicians, total: politicianCount } = data;
          this.$store.commit('storePoliticians', { politicians, politicianCount });
        } else {
          const { data } = await this.politicianServices.editPolitician(this.politicianId, payload);

          // update the politician in the store
          const { politician } = data;
          this.$store.commit('editPolitician', { politicianData: politician });
        }

        this.displaySuccess({ message: `Politician has been ${this.isNew ? 'created' : 'edited'} successfully` });

        // reload the page before the modal changes
        // eslint-disable-next-line no-restricted-globals
        location.reload();

        this.closeModal();
      } catch (error) {
        this.displayError(error);
      } finally {
        this.creatingPoliticianLoading = false;
      }
    },
    datePickerClasses(invalid) {
      let classNames = 'w-full pl-1 py-2 field border-b';

      if (invalid) {
        classNames += ' border-red-600';
      } else {
        classNames += ' border-gray-400';
      }

      return classNames;
    },
    onFileUpload($event) {
      if ($event) {
        const file = $event;

        const self = this;
        const fileReader = new FileReader();
        fileReader.onload = function onload() {
          self.uploadedImageSrc = this.result;
        };
        fileReader.readAsDataURL(file);
        this.profileImageFile = file;
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
    onSearch(search, loading) {
      if (search !== '') {
        loading(true);
        this.searchPoliticalParty(search, loading, this);
      }
    },
    searchPoliticalParty: debounce(async (search, loading, vm) => {
      try {
        const { data } = await vm.politicalPartyServices.getPoliticalParties({
          skip: 0,
          limit: 7,
          name: search,
          acronym: search,
        });

        // eslint-disable-next-line no-param-reassign
        vm.politicalParties = data.politicalParties;
        loading(false);
      } catch (error) {
        loading(false);
        this.displayError(error);
      }
    }, 350),
    async getpoliticalParty(partyId) {
      this.politicalPartyServices.getPoliticalParty(partyId);
    },
  },
  async mounted() {
    if (this.politicianId) {
      const {
        socials = { ...this.politicianData.socials },
        name = '',
        dob = '',
        stateOfOrigin = '',
        politicalParty = {},
        status = '',
        country = 'NG',
        profileImage = {},
      } = this.$store.getters.getPolitician(this.politicianId);

      this.politicianData = {
        name,
        dob,
        stateOfOrigin,
        country,
        // eslint-disable-next-line no-underscore-dangle
        politicalParty: politicalParty._id || '',
        status,
      };

      this.politicianData.facebook = socials.facebook;
      this.politicianData.twitter = socials.twitter;
      this.politicianData.instagram = socials.instagram;

      this.uploadedImageSrc = profileImage;

      // get political party details
      // eslint-disable-next-line no-underscore-dangle
      const { data } = await this.politicalPartyServices.getPoliticalParty(politicalParty._id);
      const { politicalParty: politicianParty } = data;
      this.politicalParties = [politicianParty];
    }
  },
  computed: {
    isNew() {
      return !this.politicianId;
    },
  },
};
</script>

<style>
  .politician-profile-image {
    background-image: url('../../assets/img/default-avatar.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
