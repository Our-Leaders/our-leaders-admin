<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3 relative">
      <header ref="stickyHeader" class="bg-white z-50 pb-3 sticky" style="top: 100px">
        <h5 class="text-4xl">
          Web Pages
        </h5>
        <our-tabs class="mt-10" :tabs="tabs" @change="setSelectedTab"/>
      </header>
      <div class="w-full pb-24">
        <div v-if="selectedTab === 'about-us'">
          <div class="btn-container edit-btn-row" v-if="!isAboutUsInEdit">
            <button class="border-black border py-2 px-3 flex justify-between items-center font-circular" @click="enableEdit">Edit About Us</button>
          </div>

          <div class="tab-header">About Us</div>

          <our-text-editor :editable="isAboutUsInEdit" v-model="page.aboutUs"/>

          <div class="btn-container" v-if="isAboutUsInEdit">
            <button class="bg-primary text-white font-circular py-3 px-12" @click="updatePages" :disabled="isUpdatingPages">
              <span v-if="!isUpdatingPages">Update</span>
              <span v-else>Updating...</span>
            </button>
            <button class="font-circular border border-gray-db py-3 px-12 ml-4" @click="cancelUpdate" :disabled="isUpdatingPages">Cancel</button>
          </div>
        </div>
        <div v-if="selectedTab === 'careers'">
          Careers
        </div>
        <div v-if="selectedTab === 'contact'">
          <div class="button-container my-4 flex justify-end">
            <button class="border-black border py-2 px-3 flex justify-between items-center font-circular">Edit Contact</button>
          </div>
          <div>
            <p class="font-circular text-xl font-semibold w-full mb-5">Contact details</p>
          </div>
          <div class="mt-1 w-1/2">
            <p class="font-circular font-semibold w-full">Address</p>
            <p>
              {{page.contact.address}}
            </p>
            <p class="font-circular font-semibold w-full mt-5">Phone</p>
            <p>{{page.contact.phoneNumber}}</p>
            <p class="font-circular font-semibold w-full mt-5">Email</p>
            <p>{{page.contact.email}}</p>
          </div>
          <div class="mt-12">
            <div class="flex items-center mb-3">
              <span class="social-icon">
                <img src="@/assets/img/social/facebook.svg" alt="facebook link">
              </span>
              <span>{{page.socials.facebook}}</span>
            </div>
            <div class="flex items-center mb-3">
              <span class="social-icon">
                <img src="@/assets/img/social/twitter.svg" alt="twitter link">
              </span>
              <span>{{page.socials.twitter}}</span>
            </div>
            <div class="flex items-center mb-3">
              <span class="social-icon">
                <img src="@/assets/img/social/linkedin.svg" alt="linkedin link">
              </span>
              <span>{{page.socials.linkedin}}</span>
            </div>
            <div class="flex items-center">
              <span class="social-icon">
                <img src="@/assets/img/social/instagram.svg" alt="instagram link">
              </span>
              <span>{{page.socials.instagram}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import stickbits from 'stickybits';

export default {
  name: 'WebPages',
  async mounted() {
    // stickbits(this.$refs.stickyHeader, { stickyBitStickyOffset: 100, useStickyClasses: true });
    const page = await this.getPages();
    this.page = Object.assign({}, page);
    this.$store.commit('setPage', page);
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
      pagesServices: this.$serviceFactory.pages,
      isUpdatingPages: false,
      page: {
        aboutUs: '',
        socials: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
        },
        contact: {
          address: '',
          phoneNumber: '',
          email: '',
        },
      },
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
        return response.data.page;
      } catch (error) {
        this.displayError(error);
      }

      return {};
    },
    enableEdit() {
      this.isAboutUsInEdit = true;
    },
    async updatePages() {
      this.isUpdatingPages = true;
      try {
        await this.pagesServices.updatePages(this.page);
        this.isAboutUsInEdit = false;
        this.displaySuccess({ message: 'About us page updated successfully.' });
        this.$store.commit('setPage', this.page);
      } catch (error) {
        this.displayError(error);
      }

      this.isUpdatingPages = false;
    },
    cancelUpdate() {
      this.page = Object.assign({}, this.$store.state.page);
      this.page.aboutUs = this.$store.state.page.aboutUs;
      this.isAboutUsInEdit = false;
    },
    onAboutUsInput(value) {
      this.page.aboutUs = value;
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
    // margin-left: auto;
    // margin-right: auto;

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

  .social-icon {
    width: 22px;
    @apply mr-8 flex justify-center;
  }
</style>
