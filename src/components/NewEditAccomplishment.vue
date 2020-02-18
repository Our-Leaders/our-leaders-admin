<template>
  <div class="mt-4">
    <ValidationObserver v-slot="{ invalid, handleSubmit }" ref="accomplishmentFormValidator">
      <form @submit.prevent="handleSubmit(publish)" ref="accomplishmentForm">
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
            <input ref="imageref" type="file" name="accomplishment-image" id="accomplishment-image" class="hidden" accept="image/*"  @change="onFileUpload($event);">
            <img src="@/assets/img/image-icon.svg" alt="">
            <span class="text-xs font-circular ml-3">Image</span>
          </label>
          <div class="text-xs font-circular py-4 px-2 flex items-center border border-primary rounded mt-2 justify-between" v-if="accomplishmentImageFile">
            <span class="flex items-center">
              <span
                class="h-6 w-8 bg-gray-600 rounded mr-3 bg-center bg-cover bg-no-repeat"
                :style="{ 'background-image': `url(${accomplishmentImageSrc})` }"></span>
              <!-- <span class="w-1/5 truncate">{{accomplishmentImageFile.name}}</span> -->
            </span>
            <button @click="removeImage"><img src="@/assets/img/close.svg" alt="remove-image" class="h-3"></button>
          </div>
        </div>
        <ValidationProvider  rules="required" name="Accomplishment Description" v-slot="{ errors }">
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
          <button class="font-circular py-3 px-12" @click="clearAccomplishment">Clear</button>
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
      let payload;

      if (this.accomplishmentImageFile && this.accomplishmentImageSrc) {
        payload = new FormData();

        Object.keys(this.accomplishment).forEach((key) => {
          payload.set(key, this.accomplishment[key]);
        });

        payload.set('file', this.accomplishmentImageFile);
      } else {
        payload = { ...this.accomplishment };
      }

      try {
        const { data } = await this.politicianServices.newAccomplishment(this.politicianId, payload);
        const { politician } = data;
        this.clearAccomplishment();
        this.$store.dispatch('displaySuccess', { message: 'Accomplsiment created successfully' });

        // update the politician here
        this.$store.commit('storePolitician', { politicianId: this.politicianId, payload: politician });
      } catch (err) {
        // do somehting with the error here
        this.$store.dispatch('displaySuccess', err);
      }
    },
    dateSelected(date) {
      if (date) {
        this.accomplishment.quarter = `q${moment(date).quarter()}`;
        this.accomplishment.year = moment(date).year();
      }
    },
    onFileUpload($event) {
      if ($event.target.files.length > 0) {
        const file = $event.target.files[0];
        const { type } = file;
        const typeSplit = type.split('/');

        if (typeSplit[0] !== 'image') {
          // alert the user to the error
          this.$refs.imageref.value = '';
        } else {
          const self = this;
          const fileReader = new FileReader();
          fileReader.onload = function onload() {
            self.accomplishmentImageSrc = this.result;
          };
          fileReader.readAsDataURL(file);

          this.accomplishmentImageFile = file;
        }
      }
    },
    removeImage() {
      this.$refs.imageref.value = '';
      this.accomplishmentImageFile = '';
    },
    clearAccomplishment() {
      this.accomplishmentImageFile = '';
      this.accomplishmentImageSrc = '';
      this.$refs.imageref.value = '';
      this.accomplishmentDate = '';
      this.accomplishment = {
        title: '',
        description: '',
        tags: [],
        quarter: '',
        year: '',
      };

      window.setTimeout(() => {
        this.$refs.accomplishmentForm.reset();
        this.$refs.accomplishmentFormValidator.reset();
      });
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
      accomplishmentImageFile: '',
      accomplishmentImageSrc: '',
    };
  },
  mounted() {
    // incase this is used for editing an accomplishment, reinitialize the date object here
  },
};
</script>

<style scoped lang="scss">

</style>
