<template>
  <div class="party-profile">
    <div v-bind:style="{ 'background-image': 'url('+ partyLogo +')'  }" class="w-full h-48 bg-cover bg-no-repeat mb-3 bg-center"></div>
    <p class="name font-circular text-3xl lg:text-base xl:text-xl font-bold leading-tight">{{party.name}} ({{party.acronym}})</p>
  </div>
</template>

<script>
import defaultLogo from '@/assets/img/default-party-logo.svg';

export default {
  name: 'PoliticalParty',
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
