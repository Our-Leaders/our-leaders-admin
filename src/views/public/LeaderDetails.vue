<template>
  <div class="lg:flex px-4 lg:px-0">
    <div class="xl:w-2/3 relative">
      <div class="flex flex-wrap lg:hidden mt-8">
        <p class="w-full text-3xl leading-tight mb-4">{{politician.name}}</p>
        <p class="w-full text-sm">{{presentPosition.description}}</p>
        <p class="w-full text-sm">
          <span v-if="presentPosition.startDate">{{getYear(presentPosition.startDate)}} - </span>
          <span v-if="presentPosition.endDate">{{getYear(presentPosition.endDate)}}</span>
        </p>
      </div>
      <button class="border-black border text-sm py-2 px-6 flex justify-between items-center font-circular my-4 lg:my-0 lg:absolute lg:top-0 lg:right-0" @click="editProfile">Edit Profile</button>
      <header ref="imageHere">
        <div class="politician-image h-64 lg:h-32 w-full lg:w-40 bg-gray-96" :style="{ 'background-image': 'url('+ politicianImage +')'  }"></div>
      </header>
      <header class="w-full h-auto bg-white z-20 lg:z-50 pt-4 lg:pt-20" ref="stickyHeader">
        <!-- <header class="w-full h-auto sticky bg-white" style="top: 6rem; padding-top: 2.5rem;"> -->
        <div class="flex mb-10 lg:hidden">
          <div class="w-1/2">
            <div class="inline-flex likes mb-3 font-circular text-2xl lg:text-xs text-gray-96">
              <span class="flex mr-3 text-base items-baseline cursor-pointer">
                <img class="mr-2 w-5 lg:w-4 relative" src="@/assets/img/upvote.svg" alt="upvote">
                {{politician.vote.up | numberFormat}}
              </span>
              <span class="flex text-base items-baseline cursor-pointer">
                <img class="mr-2 w-5 lg:w-4 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
                {{politician.vote.down | numberFormat}}
              </span>
            </div>
          </div>
          <div class="w-1/2">
            <a class="ml-6 inline-block float-right" target="_blank" v-bind:href="politician.socials.instagram"><img class="h-4" src="@/assets/img/social/instagram.svg" alt="instagram link"></a>
            <a class="ml-6 inline-block float-right" target="_blank" v-bind:href="politician.socials.twitter"><img class="h-4" src="@/assets/img/social/twitter.svg" alt="twitter link"></a>
            <a class="ml-6 inline-block float-right" target="_blank" v-bind:href="politician.socials.facebook"><img class="h-4" src="@/assets/img/social/facebook.svg" alt="facebook link"></a>
          </div>
        </div>
        <div class="mb-12" v-if="!show && !isMobile">
          <p class="text-5xl leading-tight">{{politician.name}}</p>
          <div class="inline-flex likes mb-3 font-circular text-2xl lg:text-xs text-gray-96 pr-4 border-r border-gray-c4">
            <span class="flex mr-3 items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative" src="@/assets/img/upvote.svg" alt="upvote">
              {{politician.vote.up | numberFormat}}
            </span>
            <span class="flex items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
              {{politician.vote.down | numberFormat}}
            </span>
          </div>
          <div class="inline-flex pl-6 mb-3 items-center">
            <p class="font-circular text-xs">Share profile</p>
            <a class="ml-6" target="_blank" v-bind:href="politician.socials.facebook"><img class="h-4" src="@/assets/img/social/facebook.svg" alt="facebook link"></a>
            <a class="ml-6" target="_blank" v-bind:href="politician.socials.twitter"><img class="h-4" src="@/assets/img/social/twitter.svg" alt="twitter link"></a>
            <a class="ml-6" target="_blank" v-bind:href="politician.socials.instagram"><img class="h-4" src="@/assets/img/social/instagram.svg" alt="instagram link"></a>
          </div>
          <div>
            <p>{{presentPosition.description}}</p>
            <p>
              <span v-if="presentPosition.startDate">{{getYear(presentPosition.startDate)}} - </span>
              <span v-if="presentPosition.endDate">{{getYear(presentPosition.endDate)}}</span>
            </p>
          </div>
        </div>
        <div class="mb-12 flex items-center justify-between" v-if="show && !isMobile">
          <p class="text-2xl">{{politician.name}}</p>
          <div class="flex items-center">
            <span class="flex mr-3 items-baseline cursor-pointer font-circular text-2xl lg:text-xs text-gray-96">
              <img class="mr-2 w-6 lg:w-4 relative" src="@/assets/img/upvote.svg" alt="upvote">
              {{politician.vote.up | numberFormat}}
            </span>
            <span class="flex items-baseline cursor-pointer font-circular text-2xl lg:text-xs text-gray-96">
              <img class="mr-2 w-6 lg:w-4 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
              {{politician.vote.down | numberFormat}}
            </span>
            <button class="border-black border py-1 px-3 flex justify-between items-center font-circular ml-4" @click="editProfile">Edit Profile</button>
          </div>
        </div>
        <div class="pb-4">
          <our-tabs :tabs="tabs" @change="setDetailComponent"></our-tabs>
        </div>
      </header>
      <main class="pt-4 pb-24">
        <component :is="detailComponents[visibleTab]" v-bind="{ politician }"></component>
      </main>
    </div>
    <div class="w-full xl:w-1/3 xl:px-10 self-start" ref="accomplishment">
      <p class="text-2xl mb-8">Write New</p>
      <our-tabs :tabs="[{ label: 'Accomplishment', value: 'accomplishment' }]" @change="setNewAdminSection"></our-tabs>
      <div>
        <!-- <our-accomplishment :politicianId="politician.id"></our-accomplishment> -->
        <component :is="sideComponents[visibleSideComponent]" v-bind="{ politicianId: politician.id }"></component>
      </div>
    </div>
  </div>
</template>

<script>
import find from 'lodash.find';
import stickbits from 'stickybits';
import defaultAvatar from '@/assets/img/default-avatar.svg';
import NavigatorUtil from '@/helpers/navigatorUtil';

// politician components
import PoliticianBackground from '@/components/politicianDetails/PoliticianBackground.vue';
import PoliticianManifesto from '@/components/politicianDetails/PoliticianManifesto.vue';
import PoliticianAccomplishments from '@/components/politicianDetails/PoliticianAccomplishments.vue';
import PoliticianFeeds from '@/components/politicianDetails/PoliticianFeeds.vue';

// sidebar component
import NewEditAccomplishment from '@/components/NewEditAccomplishment.vue';

export default {
  name: 'leaders-details',
  data() {
    return {
      politicianServices: this.$serviceFactory.politicians,
      politician: this.$store.getters.getPolitician(this.$route.params.id),
      show: false,
      visibleTab: 'background',
      detailComponents: {
        background: PoliticianBackground,
        manifesto: PoliticianManifesto,
        accomplishments: PoliticianAccomplishments,
        recentUpdates: PoliticianFeeds,
      },
      sideComponents: {
        accomplishment: NewEditAccomplishment,
      },
      visibleSideComponent: 'accomplishment',
      tabs: [{
        label: 'Background',
        value: 'background',
      }, {
        label: 'Accomplishments',
        value: 'accomplishments',
      }, {
        label: 'Manifesto',
        value: 'manifesto',
      }, {
        label: 'Recent Updates',
        value: 'recentUpdates',
      }],
    };
  },
  methods: {
    getYear(value) {
      return new Date(value).getFullYear();
    },
    setDetailComponent(value) {
      this.visibleTab = value;
    },
    setNewAdminSection(value) {
      this.visibleSideComponent = value;
    },
    editProfile() {
      this.$store.commit('openModal', { modalName: 'NewPoliticianModal', modalProps: { politicianId: this.politician.id } });
    },
    async getPolitician(id) {
      try {
        const response = await this.politicianServices.getPolitician(id);
        this.politician = response.data.politician;
        this.$store.commit('storePolitician', { politicianId: id, payload: this.politician });
      } catch (error) {
        // Do nothing. Just use the default data.
      }
    },
  },
  created() {
    this.getPolitician(this.$route.params.id);
  },
  mounted() {
    stickbits(this.$refs.stickyHeader, { stickyBitStickyOffset: 100, useStickyClasses: false });
    stickbits(this.$refs.accomplishment, { stickyBitStickyOffset: 100, useStickyClasses: false });
    const observer = new window.IntersectionObserver((entries) => {
      const entry = entries[0];
      this.show = !entry.isIntersecting;
    }, { threshold: 0.9 });

    observer.observe(this.$refs.imageHere);
  },
  computed: {
    isMobile() {
      return NavigatorUtil.isMobile();
    },
    presentPosition() {
      const { politicalBackground = [] } = this.politician;
      const presentPosition = find(politicalBackground, { inOffice: true });

      if (presentPosition) {
        return presentPosition;
      }

      return {};
    },
    politicianImage() {
      if (this.politician.profileImage) {
        return this.politician.profileImage;
      }

      return defaultAvatar;
    },
  },
};
</script>

<style lang="scss" scoped>
  .politician-image {
    background-image: url('./../../assets/img/default-avatar.svg');
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
