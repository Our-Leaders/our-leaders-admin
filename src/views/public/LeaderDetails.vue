<template>
  <div class="lg:flex">
    <div class="xl:w-2/3">
      <header ref="imageHere">
        <div class="politician-image h-32 w-40 bg-gray-96"></div>
      </header>
      <header class="w-full h-auto sticky bg-white" style="top: 6rem; padding-top: 2.5rem;">
        <div class="mb-12" v-if="!show">
          <p class="text-5xl leading-tight">Muhammadu Buhari</p>
          <div class="inline-flex likes mb-3 font-circular text-2xl lg:text-xs text-gray-96 pr-4 border-r border-gray-c4">
            <span class="flex mr-3 items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative" src="@/assets/img/upvote.svg" alt="upvote">
              <!-- {{politician.vote.up | numberFormat}} -->
              {{'23456' | numberFormat}}
            </span>
            <span class="flex items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
              <!-- {{politician.vote.down | numberFormat}} -->
              {{'1234' | numberFormat}}
            </span>
          </div>
          <div class="inline-flex pl-6 mb-3 items-center">
            <p class="font-circular text-xs">Share profile</p>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/facebook.svg" alt="facebook link"></a>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/twitter.svg" alt="twitter link"></a>
            <a class="ml-6" href="#"><img class="h-4" src="@/assets/img/social/instagram.svg" alt="instagram link"></a>
          </div>
          <div>
            <p>President, Federal Republic of Nigeria</p>
            <p>2015 - </p>
          </div>
        </div>
        <div class="mb-10 flex items-center justify-between" v-else>
          <p class="text-2xl">Muhammadu Buhari</p>
          <div class="flex likes font-circular text-2xl lg:text-xs text-gray-96">
            <span class="flex mr-3 items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative" src="@/assets/img/upvote.svg" alt="upvote">
              <!-- {{politician.vote.up | numberFormat}} -->
              {{'23456' | numberFormat}}
            </span>
            <span class="flex items-baseline cursor-pointer">
              <img class="mr-2 w-6 lg:w-4 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
              <!-- {{politician.vote.down | numberFormat}} -->
              {{'1234' | numberFormat}}
            </span>
          </div>
        </div>
        <div class="">
          <our-tabs :tabs="tabs"></our-tabs>
        </div>
      </header>
      <main>
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
  mounted() {
    const observer = new window.IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        this.show = false;
      } else {
        this.show = true;
      }
    }, { /* rootMargin: '0px 0px 96px 0px' */ threshold: 1.0 });

    this.$nextTick(() => {
      observer.observe(this.$refs.imageHere);
    });
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
