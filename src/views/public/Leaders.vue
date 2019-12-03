<template>
  <div class="lg:flex">
    <div class="lg:w-2/3 xl:w-3/5">
      <header class="flex justify-between items-end">
        <h5 class="text-4xl">
          Leaders (239)
        </h5>
        <our-country-selector v-model="country" />
        <!-- <our-country-selector :country="country" @country-change="countryChange" /> -->
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
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
          <div class="leader-profile">
            <img src="" alt="">
            <div class="likes"></div>
            <p class="name font-circular text-xl font-bold">Muhamadu Buhari</p>
            <p class="position">President of the Federal Republic of Nigeria</p>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:w-1/3 xl:w-2/5 xl:ml-10">
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

  .leader-profile {
    @apply border border-gray-c4 h-auto mr-2 mb-2;
    flex: 0 0 24%;

    .position {
      max-width: 13rem;
      width: 100%;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
