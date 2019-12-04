<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between items-end">
        <h5 class="text-4xl">
          Leaders (239)
        </h5>
        <our-country-selector v-model="country" />
      </header>
      <div class="w-full">
        <header class="flex w-full border-b border-primary mt-10 leader-nav">
          <div class="mr-10 pb-5 relative">
            <div class="active"></div>Current Leaders
            </div>
          <div class="mr-10 pb-5 relative">
            <div class="active"></div>Contesting Leaders
            </div>
        </header>
        <p class="font-circular text-gray-c4 text-sm pt-5 pb-5">239 Current Leaders</p>
        <div class="leaders-grid flex flex-wrap">
          <div class="leader-profile" v-for="(leader, index) of leaders" :key="index">
            <img class="w-full mb-3" src="@/assets/img/osibanjo.png" alt="">
            <div class="flex likes mb-3 font-circular text-2xl lg:text-sm text-gray-96">
              <span class="flex mr-3 items-baseline cursor-pointer">
                <img class="mr-2 w-8 lg:w-6 relative" src="@/assets/img/upvote.svg" alt="upvote">
                {{leader.upvotes}}
              </span>
              <span class="flex items-baseline cursor-pointer">
                <img class="mr-2 w-8 lg:w-6 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
                {{leader.downvotes}}
              </span>
            </div>
            <p class="name font-circular text-3xl lg:text-base xl:text-xl font-bold">{{leader.name}}</p>
            <p class="position text-lg lg:text-sm xl:text-base">{{leader.position}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10">
      aside
    </div>
  </div>
</template>

<script>
export default {
  name: 'Leaders',
  data() {
    return {
      country: 'ngr',
      leaders: [
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
        {
          name: 'Muhamadu Buhari',
          position: 'President of the Federal Republic of Nigeria',
          upvotes: '12543',
          downvotes: '874',
        },
      ],
    };
  },
  methods: {
    countryChange(country) {
      this.country = country;
      // TODO: do some other stuff
    },
  },
};
</script>

<style lang="scss" scoped>
  .leader-nav > div > .active {
    position: absolute;
    height: 0;
    width: 0;
    border-top: 10px solid transparent;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 10px solid #C79947;
    bottom: 0;
    margin: auto;
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: relative;
      height: 0;
      width: 0;
      border-top: 9px solid transparent;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 10px solid #fff;
      display: block;
      top: -8px;
      left: -13px;
    }
  }

  .leaders-grid {
    margin: -1rem;

    @screen sm {
      margin: -1rem;
    }

    @screen lg {
      margin: -0.5rem;
    }

    @screen xl {
      margin: -0.7rem;
    }
  }

  .leader-profile {
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
      flex: 0 0 22%;
    }

    @apply h-auto mb-12;

    .position {
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @screen sm {
        max-width: 21rem;
      }

      @screen lg {
        max-width: 12rem;
      }

      @screen xl {
        max-width: 10.6rem;
      }
    }

    .downvote {
      top: 12px;

      @screen lg {
        top: 8px;
      }
    }
  }
</style>
