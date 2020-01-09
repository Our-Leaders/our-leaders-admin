<template>
  <div class="lg:flex">
    <div class="xl:w-2/3 relative">
      <button class="border-black border py-1 px-3 flex justify-between items-center font-circular absolute top-0 right-0" @click="editProfile">Edit Profile</button>
      <header ref="imageHere">
        <div class="politician-image h-32 w-40 bg-gray-96" :style="{ 'background-image': 'url('+ partyLogo +')'  }"></div>
      </header>
      <header class="w-full h-auto bg-white z-50" ref="stickyHeader" style="padding-top: 2.5rem;">
        <div class="mb-12" v-if="!show">
          <p class="text-5xl leading-tight">{{party.name}} ({{party.acronym}})</p>
          <div class="inline-flex mb-3 items-center">
            <p class="font-circular text-xs">Share profile</p>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/facebook.svg" alt="facebook link"></a>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/twitter.svg" alt="twitter link"></a>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/instagram.svg" alt="instagram link"></a>
          </div>
          <div>
            <p>{{party.description}}</p>
          </div>
        </div>
        <div class="mb-12 flex items-center justify-between" v-else>
          <p class="text-2xl">{{party.name}} ({{party.acronym}})</p>
          <div class="flex items-center">
            <button class="border-black border py-1 px-3 flex justify-between items-center font-circular ml-4" @click="editProfile">Edit Profile</button>
          </div>
        </div>
        <div class="pb-4">
          <our-tabs :tabs="tabs" @change="setDetailComponent"></our-tabs>
        </div>
      </header>
      <main class="pt-4 pb-24">
        <component :is="detailComponents[visibleTab]" v-bind="{ party }"></component>
      </main>
    </div>
    <!-- <div class="w-full h-full xl:w-1/3 xl:pl-8 xl:pr-16 relative">
      <div class="w-full xl:w-1/3 fixed bottom-0 right-0 pb-6 overflow-y-scroll xl:pl-8 xl:pr-16" style="top: 9rem;">
        aside
      </div>
    </div> -->
    <div class="w-full xl:w-1/3 xl:ml-10">
      aside
    </div>
  </div>
</template>

<script>
// import find from 'lodash.find';
import stickbits from 'stickybits';
import defaultLogo from '@/assets/img/default-party-logo.svg';

// components
import PartyIdeology from '@/components/partyDetails/PartyIdeology.vue';
import PartyBackground from '@/components/partyDetails/PartyBackground.vue';

export default {
  name: 'party-details',
  data() {
    return {
      show: false,
      visibleTab: 'background',
      detailComponents: {
        background: PartyBackground,
        ideology: PartyIdeology,
      },
      tabs: [{
        label: 'Party Background',
        value: 'background',
      }, {
        label: 'Ideology',
        value: 'ideology',
      }],
    };
  },
  methods: {
    setDetailComponent(value) {
      this.visibleTab = value;
    },
    editProfile() {
      // this.$store.commit('openModal', { modalName: 'NewPoliticianModal', modalProps: { politicianId: this.politician.id } });
    },
  },
  mounted() {
    stickbits(this.$refs.stickyHeader, { stickyBitStickyOffset: 100, useStickyClasses: true });
    const observer = new window.IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        this.show = false;
      } else {
        this.show = true;
      }
    }, { threshold: 0.9 });

    observer.observe(this.$refs.imageHere);
  },
  computed: {
    party() {
      return this.$store.getters.getPoliticalParty(this.$route.params.id);
    },
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
  .politician-image {
    background-image: url('./../../assets/img/default-party-logo.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .downvote {
    top: 12px;

    @screen lg {
      top: 5px;
    }
  }
</style>
