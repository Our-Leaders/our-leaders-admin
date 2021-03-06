<template>
  <div class="mt-4">
    <ValidationObserver v-slot="{ invalid, handleSubmit }" ref="accomplishmentFormValidator">
      <form @submit.prevent="handleSubmit(submit)" ref="accomplishmentForm">
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
              Sector(s)
            </div>
            <v-select
              id="accomplishment-tags"
              name="accomplishment-tags"
              :clearable="false"
              :options="tags"
              @search:blur="() => {validate()}"
              v-model="accomplishment.tags"
              class="our-select no-border w-5/6" multiple></v-select>
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
              class="w-5/6"
              input-class="w-full pl-1 py-2"
              minimum-view="month"
              v-model="accomplishment.date"
              @selected="dateSelected"
              :required="true">
            </v-datepicker>
          </div>
        </ValidationProvider>
        <div class="mt-5 mb-4">
          <div class="flex items-center">
            <label :for="imageId" class="flex cursor-pointer">
              <input ref="imageref" type="file" name="accomplishment-image" :id="imageId" class="hidden" accept="image/*"  @change="onFileUpload($event);">
              <img src="@/assets/img/image-icon.svg" alt="">
              <span class="text-xs font-circular ml-3">Image</span>
            </label>
            <label for="accomplishment-url" class="flex ml-4 flex-1">
              <span class="w-full relative">
                <span class="form-icon absolute pl-1 h-full">
                  <img src="@/assets/img/hyperlink.svg" alt="">
                </span>
                <input
                  class="w-full py-2 text-xs font-circular"
                  :class="urlPlaceHolderClass"
                  id="accomplishment-url"
                  name="accomplishment-url"
                  type="text"
                  :pattern="urlRegex"
                  oninvalid="this.setCustomValidity('Enter a valid URL that starts with http, https or www')"
                  oninput="this.setCustomValidity('')"
                  autocomplete="off"
                  placeholder="Link"
                  v-model="accomplishment.url"
                  @focus="urlFocused = true"
                  @blur="urlFocused = false"
                />
              </span>
            </label>
          </div>
          <div class="text-xs font-circular py-4 px-2 flex items-center border border-primary rounded mt-2 justify-between" v-if="accomplishment.image.url">
            <span class="flex items-center">
              <span
                class="h-6 w-8 bg-gray-600 rounded mr-3 bg-center bg-cover bg-no-repeat"
                :style="{ 'background-image': `url(${accomplishment.image.url})` }"></span>
            </span>
            <a @click="removeImage"><img src="@/assets/img/close.svg" alt="remove-image" class="h-3"></a>
          </div>
        </div>
        <ValidationProvider  rules="required" name="Accomplishment Description" v-slot="{ errors }">
          <div class="mt-2">
            <textarea
              name="accomplishment-description"
              placeholder="Description"
              id="accomplishment-description"
              class="w-full pl-1 py-2"
              :class="errors.length > 0 ? 'border-red-600' : ''"
              v-model="accomplishment.description"
              rows="7"></textarea>
          </div>
        </ValidationProvider>
        <hr class="mt-4 border-t border-gray-c4"/>
        <div class="flex mt-8">
          <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid">
            <span v-if="isEdit">Save</span>
            <span v-else>Publish</span>
          </button>
          <button class="font-circular py-3 px-12" @click="clearAccomplishment">
            <span v-if="isEdit">Cancel</span>
            <span v-else>Clear</span>
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import moment from 'moment';
import StringUtil from '@/helpers/stringUtil';
import tagOptions from '@/assets/json/tags.json';

const emptyAccomplishmentData = {
  title: '',
  description: '',
  url: '',
  tags: [],
  quarter: '',
  year: '',
  image: {},
};

export default {
  name: 'NewEditAccomplishment',
  props: {
    politicianId: {
      type: String,
    },
    existingAccomplishment: {
      type: Object,
    },
    onCancel: {
      type: Function,
    },
  },
  data() {
    return {
      isEdit: !!this.existingAccomplishment,
      imageId: `accomplishment-image-${this.existingAccomplishment ? 'edit' : 'new'}`,
      politicianServices: this.$serviceFactory.politicians,
      tags: tagOptions,
      accomplishment: { ...emptyAccomplishmentData, ...this.existingAccomplishment || {} },
      accomplishmentImageFile: '',
      urlFocused: false,
    };
  },
  methods: {
    async submit() {
      let payload;

      if (this.accomplishmentImageFile && this.accomplishment.image.url) {
        payload = new FormData();

        Object.keys(this.accomplishment).forEach((key) => {
          payload.set(key, this.accomplishment[key]);
        });

        payload.set('file', this.accomplishmentImageFile);
      } else {
        payload = { ...this.accomplishment };
      }

      try {
        let result;
        let message = '';

        if (this.isEdit) {
          const { _id: accomplishmentId = '' } = this.accomplishment;
          result = await this.politicianServices.editAccomplishment(this.politicianId, accomplishmentId, payload);
          message = 'Accomplishment updated successfully';
        } else {
          result = await this.politicianServices.createAccomplishment(this.politicianId, payload);
          message = 'Accomplishment created successfully';
        }

        const { data } = result;
        this.clearAccomplishment();
        this.$store.dispatch('displaySuccess', { message });

        // update the politician here
        this.$store.commit('storePolitician', { politicianId: this.politicianId, payload: data.politician });
      } catch (err) {
        this.$store.dispatch('displayError', err);
      }
    },
    dateSelected(date) {
      if (date) {
        this.accomplishment.quarter = `q${moment(date).quarter()}`;
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
            self.accomplishment.image.url = this.result;
          };
          fileReader.readAsDataURL(file);

          this.accomplishmentImageFile = file;
        }
      }
    },
    removeImage() {
      this.$refs.imageref.value = '';
      this.accomplishmentImageFile = '';
      this.accomplishment.image.url = null;
    },
    clearAccomplishment() {
      if (this.isEdit) {
        return this.onCancel();
      }

      this.accomplishmentImageFile = '';
      this.$refs.imageref.value = '';
      this.accomplishment = emptyAccomplishmentData;

      return window.setTimeout(() => {
        this.$refs.accomplishmentForm.reset();
        this.$refs.accomplishmentFormValidator.reset();
      });
    },
  },
  computed: {
    urlPlaceHolderClass() {
      if (this.urlFocused) {
        return 'field border-b border-gray-400';
      }
      return 'placeholder-black';
    },
    urlRegex() {
      return StringUtil.getUrlRegex();
    },
  },
};
</script>

<style scoped lang="scss">

</style>
