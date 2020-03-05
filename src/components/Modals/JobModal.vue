<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl" v-if="isNew">New Job Post</p>
      <p class="text-4xl" v-else>Edit Job Post</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex mt-6">
            <div class="w-48 flex mr-4">
              <label for="job-image" class="w-full h-40 block cursor-pointer">
                <input type="file" name="political party logo" id="job-image" class="hidden" accept="image/*" @change="onFileUpload($event);">
                <div class="w-full h-full job-image flex items-center justify-center relative" v-if="!jobImageSrc">
                  <span class="text-white text-sm font-circular absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">Upload picture</span>
                </div>
                <div v-if="jobImageSrc" v-bind:style="{ 'background-image': 'url('+ jobImageSrc +')'  }" class="w-full h-full bg-cover bg-center bg-no-repeat"></div>
              </label>
            </div>
            <div class="w-3/4">
              <div class="mb-3">
                <ValidationProvider rules="required" name="Job Title" v-slot="{ errors }">
                  <div class="flex relative border-b border-gray-400" :class="errors.length > 0 ? 'border-red-600' : ''">
                    <div class="w-1/6 mt-1 self-center font-semibold text-sm font-circular">
                      Job Title
                    </div>
                      <input
                        class="w-5/6 pl-1 py-2 font-circular"
                        type="text"
                        id="job-title"
                        name="job-title"
                        v-model="job.title"
                        placeholder="Title"/>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-3">
                <ValidationProvider rules="required" name="Job Title" v-slot="{ errors }">
                  <div class="flex relative border-b border-gray-400" :class="errors.length > 0 ? 'border-red-600' : ''">
                    <div class="w-1/6 mt-1 self-center font-semibold text-sm font-circular">
                      Location
                    </div>
                      <input
                        class="w-5/6 pl-1 py-2 font-circular"
                        type="text"
                        id="job-location"
                        name="job-location"
                        v-model="job.location"
                        placeholder="Location"/>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-3">
                <ValidationProvider rules="required" name="Job Title" v-slot="{ errors }">
                  <div class="flex relative border-b border-gray-400" :class="errors.length > 0 ? 'border-red-600' : ''">
                    <div class="w-1/6 mt-1 self-center font-semibold text-sm font-circular">
                      Job Type
                    </div>
                    <div class="w-5/6  font-circular">
                        <v-select
                          id="job-type"
                          name="job-type"
                          :clearable="false"
                          :options="jobType"
                          v-model="job.type"
                          :reduce="type => type.value"
                          class="our-select no-border w-full font-circular"></v-select>
                    </div>
                  </div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <div class="mb-3">
              <ValidationProvider rules="required" name="Job Title" v-slot="{ errors }">
                <div>
                  Description
                </div>
                <div>
                    <textarea
                      class="w-full pl-1 py-2 field border-b border-gray-400"
                      :class="errors.length > 0 ? 'border-red-600' : ''"
                      v-model="job.description"
                      rows="7"></textarea>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex relative">
              <div class="w-1/3 mt-1 self-center">
                Application Link
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Job Title" v-slot="{ errors }">
                  <input
                    class="w-full pl-1 py-2 border-b border-gray-400"
                    type="url"
                    v-model="job.applicationLink"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    id="job-application-link"
                    name="job-application-link"
                    placeholder="Link"/>
                  </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex relative">
              <div class="w-1/3 mt-1 self-center">
                Job Category
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Job Title" v-slot="{ errors }">
                  <v-select
                    id="job-category"
                    name="job-category"
                    :clearable="false"
                    :options="jobCategories"
                    :class="errors.length > 0 ? 'border-red-600' : ''"
                    taggable
                    v-model="job.category"
                    :create-option="e => e"
                    class="our-select w-full"></v-select>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid || creatingEditJobLoading">
              <span v-if="!creatingEditJobLoading">Save</span>
              <span v-else>Submitting...</span>
            </button>
            <button class="font-circular py-3 px-12" @click="closeModal()">Cancel</button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </our-modal>
</template>

<script>
import find from 'lodash.find';

export default {
  name: 'JobModal',
  props: {
    jobId: {
      type: String,
      default: '',
    },
    jobCategory: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      jobServices: this.$serviceFactory.jobs,
      creatingEditJobLoading: false,
      jobImageSrc: '',
      jobImageFile: '',
      jobType: [
        {
          label: 'Full Time',
          value: 'full',
        },
        {
          label: 'Part Time',
          value: 'part',
        },
        {
          label: 'Remote',
          value: 'remote',
        },
        {
          label: 'Contract',
          value: 'contract',
        },
      ],
      job: {
        title: '',
        description: '',
        type: '',
        location: '',
        category: '',
        applicationLink: '',
        isArchived: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.creatingEditJobLoading = true;

      let payload;

      if (this.jobImageSrc && this.jobImageFile) {
        payload = new FormData();

        Object.keys(this.job).forEach((key) => {
          payload.set(key, this.job[key]);
        });

        payload.set('file', this.jobImageFile);
      } else {
        payload = { ...this.job };
      }

      try {
        if (this.isNew) {
        // create the political party
          await this.jobServices.createNewJob(payload);
        } else {
          await this.jobServices.editJob(this.jobId, payload);
        }

        // update the list of political parties
        const { data } = await this.jobServices.getJobs();
        const { jobs } = data;
        this.$store.dispatch('storeJobs', jobs);
        this.closeModal();
      } catch (err) {
        // do something with the error here
      } finally {
        this.creatingEditJobLoading = false;
      }
    },
    onFileUpload($event) {
      if ($event.target.files.length > 0) {
        const file = $event.target.files[0];

        const self = this;
        const fileReader = new FileReader();
        fileReader.onload = function onload() {
          self.jobImageSrc = this.result;
        };
        fileReader.readAsDataURL(file);
        this.jobImageFile = file;
      }
    },
  },
  computed: {
    isNew() {
      return !this.jobId;
    },
    jobCategories() {
      return this.$store.getters.getCategories;
    },
    jobs() {
      return this.$store.getters.getCategoriesAndJobs;
    },
  },
  async mounted() {
    if (this.jobId) {
      const jobs = this.jobs[this.jobCategory];
      this.job = find(jobs, { _id: this.jobId });
      this.jobImageSrc = this.job.image ? this.job.image.url : '';
    }
  },
};
</script>

<style scoped lang="scss">
  .job-image {
    background-image: url('../../assets/img/job-default-image.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    & > span {
      background: rgba(196, 196, 196, 0.7);
    }
  }
</style>
