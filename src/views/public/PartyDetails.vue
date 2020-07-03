<template>
  <div class="lg:flex">
    <div class="w-full px-4 pt-8 lg:px-0 lg:pt-0 xl:w-2/3 relative">
      <div class="lg:hidden flex flex-wrap mb-4 lg:mb-0">
        <p class="text-4xl leading-tight">{{party.name}} ({{party.acronym}})</p>
      </div>
      <button class="border-gray-500 border py-2 px-4 flex justify-between text-sm items-center font-circular mb-4 lg:mb-0 lg:absolute lg:top-0 lg:right-0" @click="editProfile">Edit Profile</button>
      <header ref="imageHere">
        <div class="politician-image h-64 lg:h-32 w-full lg:w-40 bg-gray-96" :style="{ 'background-image': 'url('+ partyLogo +')'  }"></div>
      </header>
      <header class="w-full h-auto bg-white z-50 pt-4 lg:pt-20" ref="stickyHeader">
        <div class="mb-12" v-if="!show">
          <p class="hidden lg:block text-5xl leading-tight">{{party.name}} ({{party.acronym}})</p>
          <div class="flex lg:hidden">
            <div class="w-1/2">
              <div class="inline-flex likes font-circular text-base text-gray-96">
                <span class="flex mr-3 items-baseline cursor-pointer">
                  <img class="mr-2 w-5 relative" src="@/assets/img/upvote.svg" alt="upvote">
                  {{party.votes.up | numberFormat}}
                </span>
                <span class="flex items-baseline cursor-pointer">
                  <img class="mr-2 w-5 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
                  {{party.votes.down | numberFormat}}
                </span>
              </div>
            </div>
            <div class="w-1/2 pt-1">
              <a class="ml-6 float-right inline-block" href="#"><img class="h-4" src="@/assets/img/social/instagram.svg" alt="instagram link"></a>
              <a class="ml-6 float-right inline-block" href="#"><img class="h-4" src="@/assets/img/social/twitter.svg" alt="twitter link"></a>
              <a class="ml-6 float-right inline-block" href="#"><img class="h-4" src="@/assets/img/social/facebook.svg" alt="facebook link"></a>
            </div>
          </div>
          <div class="hidden lg:inline-flex mb-3 items-center">
            <p class="font-circular text-xs">Share party</p>
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
            <button class="border-black border py-1 px-3 flex justify-between items-center font-circular ml-4" @click="editProfile">Edit Party</button>
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
    <div class="w-full xl:w-1/3 xl:ml-10">
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
      this.$store.commit('openModal', { modalName: 'NewPoliticalPartyModal', modalProps: { politicalPartyId: this.party.id } });
    },
  },
  mounted() {
    stickbits(this.$refs.stickyHeader, { stickyBitStickyOffset: 100, useStickyClasses: false });
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
    top: 8px;

    @screen lg {
      top: 5px;
    }
  }
</style>
