<template>
  <div class="lg:flex">
    <div class="xl:w-2/3">
      <header ref="imageHere">
        <div class="politician-image h-32 w-40 bg-gray-96" :style="{ 'background-image': 'url('+ politicianImage +')'  }"></div>
      </header>
      <header class="w-full h-auto bg-white" ref="stickyHeader" style="padding-top: 2.5rem;">
      <!-- <header class="w-full h-auto sticky bg-white" style="top: 6rem; padding-top: 2.5rem;"> -->
        <div class="mb-12" v-if="!show">
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
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/facebook.svg" alt="facebook link"></a>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/twitter.svg" alt="twitter link"></a>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/instagram.svg" alt="instagram link"></a>
          </div>
          <div>
            <p>{{presentPosition.description}}</p>
            <p>
              <span v-if="presentPosition.startDate">{{getYear(presentPosition.startDate)}} - </span>
              <span v-if="presentPosition.endDate">{{getYear(presentPosition.endDate)}}</span>
            </p>
          </div>
        </div>
        <div class="mb-12 flex items-center justify-between" v-else>
          <p class="text-2xl">{{politician.name}}</p>
          <div class="flex likes font-circular text-2xl lg:text-xs text-gray-96">
            <span class="flex mr-3 items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative" src="@/assets/img/upvote.svg" alt="upvote">
              {{politician.vote.up | numberFormat}}
            </span>
            <span class="flex items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
              {{politician.vote.down | numberFormat}}
            </span>
          </div>
        </div>
        <div class="pb-4">
          <our-tabs :tabs="tabs"></our-tabs>
        </div>
      </header>
      <main class="pt-4 pb-24">
        <div class="button-container mb-4 flex justify-end">
          <button class="border-black border py-1 px-3 flex justify-between items-center font-circular">Edit Background</button>
        </div>
        <div>
          <p class="font-circular text-xl font-semibold w-full mb-5">Personal background</p>
          <div class="flex mb-3">
            <div class="w-1/3">Political Party</div>
            <div class="w-2/3 capitalize" v-if="politician.politicalParty">{{politician.politicalParty.name}} ({{politician.politicalParty.acronym}})</div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3">DOB/Age</div>
            <div class="w-2/3">{{politician.dob | dateFormat('-')}} / {{politician.dob | age}} years</div>
          </div>
          <div class="flex mb-3">
            <div class="w-1/3">State of origin</div>
            <div class="w-2/3 capitalize">{{politician.stateOfOrigin}}</div>
          </div>
        </div>
        <div class="mt-8">
          <p class="font-circular text-xl font-semibold w-full mb-5">Political background</p>
          <div class="flex mb-3" v-for="(politicalBackground, index) of politician.politicalBackground" :key="index">
            <div class="w-1/3">{{politicalBackground.position}}</div>
            <div class="w-2/3">
              <div>{{politicalBackground.description}}</div>
              <div>
                <span v-if="politicalBackground.startDate">{{politicalBackground.startDate | shortDateFormat}} - </span>
                <span v-if="politicalBackground.endDate">{{politicalBackground.endDate | shortDateFormat}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <p class="font-circular text-xl font-semibold w-full mb-5">Educational background</p>
          <div class="flex mb-3" v-for="(educationalBackground, index) of politician.educationalBackground" :key="index">
            <div class="w-1/3 capitalize">{{educationalBackground.degree}}</div>
            <div class="w-2/3 capitalize">
              <!-- University of Lagos. MBA Marketing, 1993 -->
              <span class="capitalize">{{educationalBackground.institution}}</span> <span v-if="educationalBackground.startDate">{{getYear(educationalBackground.startDate)}}</span>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <p class="font-circular text-xl font-semibold w-full mb-5">Professional background</p>
          <div class="mb-3" v-for="(professionalBackground, index) of politician.professionalBackground" :key="index">
            <div class="flex">
              <div class="w-1/3">Title</div><div class="w-2/3">{{professionalBackground.title}}</div>
            </div>
            <div class="flex">
              <div class="w-1/3">Description</div><div class="w-2/3">{{professionalBackground.description}}</div>
            </div>
            <div class="flex">
              <div class="w-1/3">Duration</div><div class="w-2/3">
                <span v-if="professionalBackground.startDate">{{getYear(professionalBackground.startDate)}} - </span>
                <span v-if="professionalBackground.endDate">{{getYear(professionalBackground.endDate)}}</span>
              </div>
            </div>
          </div>
        </div>
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
import find from 'lodash.find';
import stickbits from 'stickybits';
import defaultAvatar from '@/assets/img/default-avatar.svg';

export default {
  name: 'leaders-details',
  data() {
    return {
      show: false,
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
    }, { threshold: 0.8 });

    observer.observe(this.$refs.imageHere);
  },
  computed: {
    politician() {
      return this.$store.getters.getPolitician(this.$route.params.id);
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
      if (this.politician.profileImage && this.politician.profileImage.url) {
        return this.politician.profileImage.url;
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
    top: 12px;

    @screen lg {
      top: 5px;
    }
  }
</style>
