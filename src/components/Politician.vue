<template>
  <div class="leader-profile cursor-pointer">
    <!-- <img v-if="politician.profileImage.url" class="w-full mb-3" :src="politician.profileImage.url" alt=""> -->
    <!-- <img v-else class="w-full mb-3" src="@/assets/img/osibanjo.png" alt=""> -->
    <div v-bind:style="{ 'background-image': 'url('+ politicianImage +')'  }" class="w-full h-48 bg-cover bg-no-repeat mb-3 bg-center"></div>
    <div class="flex justify-between">
      <div class="flex likes mb-3 font-circular text-2xl lg:text-sm text-gray-96">
        <span class="flex mr-3 items-baseline cursor-pointer">
          <img class="mr-2 w-8 lg:w-5 relative" src="@/assets/img/upvote.svg" alt="upvote">
          {{politician.vote.up | numberFormat}}
        </span>
        <span class="flex items-baseline cursor-pointer">
          <img class="mr-2 w-8 lg:w-5 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
          {{politician.vote.down | numberFormat}}
        </span>
      </div>
      <div class="relative">
        <our-dropdown position="bottom-end">
          <template v-slot:trigger="{ openDialog }">
            <button class="px-3 py-1" @click.stop="openDialog()">
              <img src="./../assets/img/kebab_menu_Icon.svg" alt="more indicator">
            </button>
          </template>
          <template v-slot:items class="font-circular right-0">
            <our-dropdown-item class="flex justify-between items-center" @click.native.stop="goToPolitician">Edit</our-dropdown-item>
            <our-dropdown-divider />
            <our-dropdown-item class="flex justify-between items-center" @click.native.stop="deletePolitician">Delete</our-dropdown-item>
          </template>
        </our-dropdown>
      </div>
    </div>
    <p class="name font-circular text-3xl lg:text-base xl:text-xl font-bold leading-tight">{{politician.name}}</p>
    <p class="position text-lg lg:text-sm xl:text-base">{{position}}</p>
  </div>
</template>

<script>
import find from 'lodash.find';
import { mapActions } from 'vuex';
import defaultAvatar from '@/assets/img/default-avatar.svg';

export default {
  name: 'Politician',
  data() {
    return {
      showMoreDialg: false,
      politicianServices: this.$serviceFactory.politicians,
    };
  },
  props: {
    politician: {
      type: Object,
    },
  },
  computed: {
    position() {
      const { politicalBackground = [] } = this.politician;
      const presentPosition = find(politicalBackground, { inOffice: true });

      if (presentPosition) {
        return presentPosition.position;
      }

      return '';
    },
    politicianImage() {
      if (this.politician.profileImage) {
        return this.politician.profileImage;
      }

      return defaultAvatar;
    },
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    showDialog() {

    },
    goToPolitician() {
      this.$router.push({ name: 'leaders-details', params: { id: this.politician.id } });
    },
    async deletePolitician() {
      try {
        await this.politicianServices.deletePolitician(this.politician.id);
        this.$store.commit('deletePolitician', { politicianData: this.politician });
        this.displaySuccess({ message: 'Politician has been deleted successfully' });
      } catch (err) {
        this.displayError(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
      flex: 0 0 30%;
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

  .more-dialog {
    box-shadow: 0px 12px 52px rgba(0, 0, 0, 0.1);
  }
</style>
