<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
  <!-- <our-modal @close-modal="closeModal()" :open="showNewPoliticianModal" size="large"> -->
    <template v-slot:header>
      <p class="text-4xl">New leader</p>
    </template>
    <template v-slot:content>
      <form @submit.prevent="submit">
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
              <input
                class="w-full pl-1 py-2 field border-b border-gray-400"
                type="text"
                id="politician-name"
                name="politician-name"
                placeholder="Name"
                v-model="politicianData.name"
                required />
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Date of birth
            </div>
            <div class="w-2/3">
              <v-datepicker
                placeholder="DD/MM/YYYY"
                format="dd/MM/yyyy"
                v-model="politicianData.dob"
                :required="true"
                input-class="w-full pl-1 py-2 field border-b border-gray-400">
              </v-datepicker>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              Religion
            </div>
            <div class="w-2/3">
              <v-select
                id="politician-religion"
                name="politician-religion"
                :clearable="false"
                v-model="politicianData.religion"
                :options="['Islam', 'Christian', 'Hindu', 'Buddhism', 'Other']"
                class="our-select"></v-select>
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3 self-end">
              State of origin
            </div>
            <div class="w-2/3">
              <v-select
                id="politician-party"
                name="politician-party"
                :clearable="false"
                :options="nigerianStates"
                v-model="politicianData.stateOfOrigin"
                class="our-select"></v-select>
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
          <button class="bg-primary text-white font-circular py-3 px-12" type="submit">Save</button>
          <button class="font-circular py-3 px-12" @click="closeModal()">Cancel</button>
        </div>
      </form>
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
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    submit() {
      console.log(this.politicianData);
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
