<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Web Pages
        </h5>
      </header>
      <div class="w-full mt-10">
        <our-tabs :tabs="tabs" @change="setSelectedTab"/>

        <div v-if="selectedTab === 'about-us'">
          <div class="btn-container">
            <button class="btn"> Edit About Us</button>
          </div>
          <div class="tab-header">About Us</div>
        </div>
        <div v-if="selectedTab === 'careers'">
          Careers
        </div>
        <div v-if="selectedTab === 'contact'">
          Contact Us
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10"></div>
  </div>
</template>

<script>
export default {
  name: 'WebPages',
  data() {
    return {
      selectedTab: 'about-us',
      tabs: [{
        label: 'About Us',
        value: 'about-us',
      }, {
        label: 'Careers',
        value: 'careers',
      }, {
        label: 'Contact',
        value: 'contact',
      }],
    };
  },
  methods: {
    setSelectedTab(value) {
      this.selectedTab = value;
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;

    .btn {
      border: 2px solid #969696;
      padding: 5px 10px;
      font-family: 'Circular Std';
    }
  }

  .tab-header {
    margin-top: 20px;
    font-weight: bold;
    font-family: 'Circular Std';
    font-size: 20px;
  }
</style>
