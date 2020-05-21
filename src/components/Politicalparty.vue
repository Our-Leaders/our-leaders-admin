<template>
  <div class="party-profile cursor-pointer">
    <div v-bind:style="{ 'background-image': 'url('+ partyLogo +')'  }" class="w-full h-48 bg-cover bg-no-repeat mb-3 bg-center"></div>
    <div class="flex justify-between">
      <p class="name font-circular text-3xl lg:text-base xl:text-xl font-bold leading-tight">{{party.name}} ({{party.acronym}})</p>
      <div class="relative">
        <our-dropdown position="bottom-end">
          <template v-slot:trigger="{ openDialog }">
            <button class="px-3 py-1" @click.stop="openDialog()">
              <img src="./../assets/img/kebab_menu_Icon.svg" alt="more indicator">
            </button>
          </template>
          <template v-slot:items class="font-circular right-0">
            <our-dropdown-item class="flex justify-between items-center" @click.native.stop="goToPoliticalParty">Edit</our-dropdown-item>
            <our-dropdown-divider />
            <our-dropdown-item class="flex justify-between items-center" @click.native.stop="deletePoliticalParty">Delete</our-dropdown-item>
          </template>
        </our-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import defaultLogo from '@/assets/img/default-party-logo.svg';

export default {
  name: 'PoliticalParty',
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
    };
  },
  props: {
    party: {
      type: Object,
    },
  },
  computed: {
    partyLogo() {
      if (this.party.logo) {
        return this.party.logo;
      }

      return defaultLogo;
    },
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    goToPoliticalParty() {
      this.$router.push({ name: 'party-details', params: { id: this.party.id } });
    },
    async deletePoliticalParty() {
      try {
        await this.politicalPartyServices.deletePoliticalParty(this.party.id);
        this.$store.commit('deletePoliticalParty', { partyData: this.party });
        this.displaySuccess({ message: 'Political party has been deleted successfully' });
      } catch (err) {
        this.displayError(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .party-profile {
    flex: 0 0 94%;
    margin-top: 0.75rem;
    margin-left: 0.75rem;
    margin-right: 0.75rem;

    @screen sm {
      margin-top: 1rem;
      margin-left: 1rem;
      margin-right: 1rem;
      flex: 0 0 45%;
    }

    @screen lg {
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      flex: 0 0 30%;
    }

    @screen xl {
      margin-top: 0.7rem;
      margin-left: 0.7rem;
      margin-right: 0.7rem;
      flex: 0 0 30%;
    }

    @apply h-auto mb-12;
  }
</style>
