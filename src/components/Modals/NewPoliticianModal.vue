<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
  <!-- <our-modal @close-modal="closeModal()" :open="showNewPoliticianModal" size="large"> -->
    <template v-slot:header>
      <p class="text-4xl">New leader</p>
    </template>
    <template v-slot:content>
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
                required
              />
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
                required
              />
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
                required
              />
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
              required
            />
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
              :options="['current', 'past', 'upcoming']"
              class="our-select"></v-select>
          </div>
        </div>
        <div class="flex mb-3">
          <div class="w-1/3 self-end">
            Current Office
          </div>
          <div class="w-2/3">
            <input
              class="w-full pl-1 py-2 field border-b border-gray-400"
              type="text"
              id="politician-current-office"
              name="politician-current-office"
              required
            />
          </div>
        </div>
        <div class="flex mb-3">
          <div class="w-1/3 self-end">
            Start Date
          </div>
          <div class="w-2/3">
            <v-datepicker
              placeholder="DD/MM/YYYY"
              format="dd/MM/yyyy"
              input-class="w-full pl-1 py-2 field border-b border-gray-400">
            </v-datepicker>
          </div>
        </div>
        <div class="flex mb-3">
          <div class="w-1/3 self-end">
            End Date
          </div>
          <div class="w-2/3">
            <v-datepicker
              placeholder="DD/MM/YYYY"
              format="dd/MM/yyyy"
              input-class="w-full pl-1 py-2 field border-b border-gray-400">
            </v-datepicker>
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
              :clearable="false"
              :options="['APC', 'PDP', 'AD']"
              class="our-select"></v-select>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="flex mt-12">
        <button class="bg-primary text-white font-circular py-3 px-12">Save</button>
        <button class="font-circular py-3 px-12" @click="closeModal()">Cancel</button>
      </div>
    </template>
  </our-modal>
</template>

<script>
import nigerianStates from '@/assets/json/nigerianStates.json';

export default {
  name: 'NewLeaderModal',
  data() {
    return {
      nigerianStates,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style>

</style>
