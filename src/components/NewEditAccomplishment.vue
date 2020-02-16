<template>
  <div class="mt-4">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form @submit.prevent="handleSubmit(publish)">
        <ValidationProvider rules="required" name="Accomplishment Title" v-slot="{ errors }">
          <div class="flex relative border-b border-gray-400 mt-2" :class="errors.length > 0 ? 'border-red-600' : ''">
            <div class="w-1/6 self-center font-semibold text-sm font-circular">
              Title
            </div>
            <input
              class="w-5/6 pl-1 py-2 font-circular leading-none"
              type="text"
              id="accomplishment-title"
              name="accomplishment-title"
              v-model="accomplishment.title"
              placeholder="Title"/>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required" name="Accomplishment Tags" v-slot="{ errors, validate }">
          <div class="flex relative border-b border-gray-400 mt-2" :class="errors.length > 0 ? 'border-red-600' : ''">
            <div class="w-1/6 self-center font-semibold text-sm font-circular">
              Tags
            </div>
            <v-select
              id="accomplishment-tags"
              name="accomplishment-tags"
              :clearable="false"
              :options="tags"
              @search:blur="() => {validate()}"
              v-model="accomplishment.tags"
              class="our-select no-border w-5/6 " multiple></v-select>
          </div>
        </ValidationProvider>
        <ValidationProvider  rules="required" name="Accomplishment Date" v-slot="{ errors }">
          <div class="flex relative border-b border-gray-400 mt-2" :class="errors.length > 0 ? 'border-red-600' : ''">
            <div class="w-1/6 self-center font-semibold text-sm font-circular">
              Date
            </div>
            <v-datepicker
              placeholder="MMM YYYY"
              format="MMM yyyy"
              class="w-full"
              input-class="w-full pl-1 py-2"
              minimum-view="month"
              v-model="accomplishmentDate"
              @selected="dateSelected"
              :required="true">
            </v-datepicker>
          </div>
        </ValidationProvider>
        <div class="mt-5 mb-4">
          <label for="accomplishment-image" class="flex cursor-pointer">
            <input type="file" name="accomplishment-image" id="accomplishment-image" class="hidden" accept="image/*">
            <img src="@/assets/img/image-icon.svg" alt="">
            <span class="text-xs font-circular ml-3">Image</span>
          </label>
        </div>
        <ValidationProvider  rules="required" name="Accomplishment Tags" v-slot="{ errors }">
          <div class="mt-2">
            <textarea
              name="accomplishment-description"
              id="accomplishment-description"
              class="w-full pl-1 py-2 field border-b border-gray-400"
              :class="errors.length > 0 ? 'border-red-600' : ''"
              v-model="accomplishment.description"
              rows="7"></textarea>
          </div>
        </ValidationProvider>
        <div class="flex mt-5">
          <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid">
            <!-- <span v-if="!creatingPoliticianLoading">Save</span> -->
            <!-- <span v-else>Submitting...</span> -->
            <span>Publish</span>
          </button>
          <button class="font-circular py-3 px-12">Clear</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'NewEditAccomplishment',
  props: {
    politicianId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async publish() {
      try {
        await this.politicianServices.newAccomplishment(this.politicianId, this.accomplishment);
      } catch (err) {
        // do somehting with the error here
      }
    },
    dateSelected(date) {
      if (date) {
        this.accomplishment.quarter = `q${moment(date).quarter()}`;
        this.accomplishment.year = moment(date).year();
      }
    },
  },
  data() {
    return {
      politicianServices: this.$serviceFactory.politicians,
      tags: ['health', 'education', 'tourism', 'technology', 'religion', 'agriculture'],
      accomplishmentDate: '',
      accomplishment: {
        title: '',
        description: '',
        tags: [],
        quarter: '',
        year: '',
      },
    };
  },
  mounted() {
    // incase this is used for editing an accomplishment, reinitialize the date object here
  },
};
</script>

<style scoped lang="scss">

</style>
