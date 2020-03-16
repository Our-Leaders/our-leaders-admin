<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
  <!-- <our-modal @close-modal="closeModal()" :open="showNewPoliticianModal" size="large"> -->
    <template v-slot:header>
      <p class="text-4xl" v-if="isNew">New leader</p>
      <p class="text-4xl" v-else>Edit leader profile</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex mt-6 social-links">
            <div class="w-1/3 flex">
              <label for="politician-image" class="w-40 h-32 block cursor-pointer">
                <input type="file" name="politician image" id="politician-image" class="hidden" accept="image/*" @change="onFileUpload($event);">
                <div class="w-full h-full politician-profile-image flex items-center justify-center" v-if="!uploadedImageSrc">
                  <span class="text-white text-sm font-circular">Upload picture</span>
                </div>
                <!-- thinking of using canvas here so I can make modifications to the image after upload -->
                <div v-bind:style="{ 'background-image': 'url('+ uploadedImageSrc +')'  }" class="w-full h-full bg-cover bg-no-repeat"></div>
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
                    id="politician-facebook-link"
                    name="politician-facebook-link"
                    placeholder="Facebook Link"
                    v-model="politicianData.facebook"/>
                </div>
                <div class="w-1/2 ml-3 relative">
                  <div class="form-icon absolute pl-1 h-full">
                    <img src="@/assets/img/social/twitter.svg" alt="twitter link">
                  </div>
                  <input
                    class="w-full pl-1 py-2 field border-b border-gray-400"
                    type="url"
                    id="politician-twitter-link"
                    name="politician-twitter-link"
                    placeholder="Twitter Link"
                    v-model="politicianData.twitter"/>
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
                    id="politician-instagram-link"
                    name="politician-instagram-link"
                    placeholder="Instagram Link"
                    v-model="politicianData.instagram"/>
                </div>
                <div class="w-1/2"></div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full">Personal Information</p>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Name
              </div>
              <div class="w-2/3">
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
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Date of birth
              </div>
              <div class="w-2/3">
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
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Religion
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Politician Religion" v-slot="{ errors }">
                  <v-select
                    id="politician-religion"
                    name="politician-religion"
                    :clearable="false"
                    v-model="politicianData.religion"
                    :options="['Islam', 'Christian', 'Hindu', 'Buddhism', 'Other']"
                    :class="{'has-error': errors.length > 0}"
                    class="our-select"></v-select>
                </ValidationProvider>
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
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                State of origin
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Politician State of origin" v-slot="{ errors }">
                  <v-select
                    id="politician-party"
                    name="politician-party"
                    :clearable="false"
                    :options="nigerianStates"
                    v-model="politicianData.stateOfOrigin"
                    :class="{'has-error': errors.length > 0}"
                    class="our-select"></v-select>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full">Political Information</p>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Status
              </div>
              <div class="w-2/3">
                <v-select
                  id="politician-status"
                  name="politician-status"
                  :clearable="false"
                  v-model="politicianData.status"
                  :options="['current', 'past', 'upcoming']"
                  class="our-select"></v-select>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 self-end">
                Party
              </div>
              <div class="w-2/3">
                <v-select
                  id="politician-party"
                  name="politician-party"
                  label="name"
                  :reduce="party => party.id"
                  :clearable="false"
                  :options="politicalParties"
                  v-model="politicianData.politicalParty"
                  class="our-select"></v-select>
              </div>
            </div>
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid || creatingPoliticianLoading">
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
      nigerianStates,
      politicianData: {
        instagram: '',
        facebook: '',
        twitter: '',
        name: '',
        dob: '',
        religion: '',
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
    };
  },
  methods: {
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
        } else {
          await this.politicianServices.editPolitician(this.politicianId, payload);
        }

        // update the list of politicians
        const { data } = await this.politicianServices.getPoliticians({});
        const { politicians, total: politicianCount } = data;
        this.$store.commit('storePoliticians', { politicians, politicianCount });
        this.closeModal();
      } catch (err) {
        // do something with the error here
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
      if ($event.target.files.length > 0) {
        const file = $event.target.files[0];

        const self = this;
        const fileReader = new FileReader();
        fileReader.onload = function onload() {
          self.uploadedImageSrc = this.result;
        };
        fileReader.readAsDataURL(file);
        this.profileImageFile = file;
      }
    },
    countryFlag(flag) {
      const images = require.context('@/assets/img/flags', false, /\.svg$/);
      return images(`./${flag}`);
    },
  },
  async mounted() {
    if (this.$store.state.politicalParties.length === 0) {
      const { data } = await this.politicalPartyServices.getPoliticalParties();
      const { politicalParties, total: politicalPartyCount } = data;
      this.$store.commit('storePoliticalParties', { politicalParties, politicalPartyCount });
    }

    const { politicalParties } = this.$store.state;
    this.politicalParties = politicalParties;

    if (this.politicianId) {
      const {
        socials = { ...this.politicianData.socials },
        name = '',
        dob = '',
        religion = '',
        stateOfOrigin = '',
        politicalParty = {},
        status = '',
        country = 'NG',
        profileImage = {},
      } = this.$store.getters.getPolitician(this.politicianId);

      this.politicianData = {
        name,
        dob,
        religion,
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
