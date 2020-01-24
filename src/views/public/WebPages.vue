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
          <div class="btn-container edit-btn-row" v-if="!isAboutUsInEdit">
            <button class="btn" @click="enableEdit">Edit About Us</button>
          </div>

          <div class="tab-header">About Us</div>

          <our-text-editor :editable="isAboutUsInEdit" v-model="page.aboutUs"/>

          <div class="btn-container" v-if="isAboutUsInEdit">
            <button class="btn update-btn" @click="updatePages" :disabled="isUpdatingPages">
              <span v-if="!isUpdatingPages">Update</span>
              <span v-else>Updating...</span>
            </button>
          </div>
        </div>
        <div v-if="selectedTab === 'careers'">
          <div class="btn-container edit-btn-row">
            <button class="btn">New Job Post</button>
          </div>
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
import { mapActions } from 'vuex';

export default {
  name: 'WebPages',
  created() {
    this.getPages();
  },
  data() {
    return {
      selectedTab: 'about-us',
      isAboutUsInEdit: false,
      tabs: [
        {
          label: 'About Us',
          value: 'about-us',
        },
        {
          label: 'Careers',
          value: 'careers',
        },
        {
          label: 'Contact',
          value: 'contact',
        },
      ],
      page: {
        aboutUs: '',
      },
      pagesServices: this.$serviceFactory.pages,
      isUpdatingPages: false,
    };
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    setSelectedTab(value) {
      this.selectedTab = value;
    },
    async getPages() {
      try {
        const response = await this.pagesServices.getPages();
        this.page = response.data.page;
      } catch (error) {
        this.displayError(error);
      }
    },
    enableEdit() {
      this.isAboutUsInEdit = true;
    },
    async updatePages() {
      this.isUpdatingPages = true;
      try {
        await this.pagesServices.updatePages(this.page);
        this.isAboutUsInEdit = false;
        this.displaySuccess('About us page updated successfully.');
      } catch (error) {
        this.displayError(error);
      }

      this.isUpdatingPages = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-container {
    width: 100%;
    display: flex;
    margin-top: 20px;
  }

  .edit-btn-row {
    flex-direction: row-reverse;
  }

  .btn {
    border: 2px solid #969696;
    padding: 7px 13px;
    font-family: 'Circular Std', sans-serif;

    &:hover {
      color: #969696;
    }
  }

  .update-btn {
    border: 2px #CE9833 solid;
    color: white;
    background-color: #CE9833;
    margin-left: auto;
    margin-right: auto;

    &:hover {
      background-color: white;
      color: #CE9833;
    }
  }

  .tab-header {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-family: 'Circular Std', sans-serif;
    font-size: 20px;
  }

  .core-content {
    line-height: 30px;
    font-size: 16px;
    text-align: justify;
  }
</style>
