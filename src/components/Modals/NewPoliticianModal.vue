<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
  <!-- <our-modal @close-modal="closeModal()" :open="showNewPoliticianModal" size="large"> -->
    <template v-slot:header>
      <p class="text-4xl">New leader</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex mt-6 social-links">
            <div class="w-1/3 flex">
              <div class="w-40 h-32 bg-gray-c4"></div>
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
                    v-model="politicianData.socials.facebook"/>
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
                    v-model="politicianData.socials.twitter"/>
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
                    v-model="politicianData.socials.instagram"/>
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
import nigerianStates from '@/assets/json/nigerianStates.json';

export default {
  name: 'NewLeaderModal',
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      politicianServices: this.$serviceFactory.politicians,
      nigerianStates,
      politicianData: {
        socials: {
          instagram: '',
          facebook: '',
          twitter: '',
        },
        name: '',
        dob: '',
        religion: '',
        stateOfOrigin: '',
        politicalParty: '',
        status: '',
      },
      politicalParties: [],
      creatingPoliticianLoading: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.creatingPoliticianLoading = true;
      console.log(this.politicianData);
      try {
        // create the politician
        await this.politicianServices.createNewPolitician(this.politicianData);

        // update the list of politicians
        const { data } = await this.politicianServices.getPoliticians();
        const { politicians } = data;
        this.$store.commit('storePoliticians', politicians);
      } catch (err) {
        // do something with the error here
      } finally {
        this.creatingPoliticianLoading = false;
        this.closeModal();
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
  },
  async mounted() {
    if (this.$store.state.politicalParties.length === 0) {
      const { data } = await this.politicalPartyServices.getPoliticalParties();
      this.$store.commit('storePoliticalParties', data.politicalParties);
    }

    const { politicalParties } = this.$store.state;
    this.politicalParties = politicalParties;
  },
};
</script>

<style>

</style>
