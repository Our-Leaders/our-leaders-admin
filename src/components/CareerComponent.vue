<template>
  <div>
    <div class="button-container my-4 flex justify-end">
      <button @click="openJobModal({})" class="border-black border py-2 px-3 flex justify-between items-center font-circular">New Job Post</button>
    </div>
    <div>
      <div v-for="(jobArray, category) of jobs" :key="category" class="job-category">
        <p class="font-circular text-xl font-semibold w-full mb-4">{{category}}</p>
        <div v-for="job of jobArray" :key="job._id" class="mb-4 border-b border-gray-db pb-4 flex relative job">
          <div class="h-10 w-10 mr-4 bg-center bg-no-repeat bg-cover" :style="{ 'background-image': `url(${getJobImageUrl(job)})`}"></div>
          <div class="leading-snug">
            <p class="font-circular font-semibold">{{job.title}}</p>
            <p class="font-circular text-sm">{{job.location}}</p>
          </div>
          <div class="absolute flex top-0 right-0 bottom-0 items-center pb-4 pr-3 job-actions">
            <button class="text-sm font-circular mr-4" @click="openJobModal({ jobId: job._id, jobCategory: job.category})">Edit</button>
            <button class=""><fa-icon :icon="['fas', 'trash']"></fa-icon></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import jobDefaultImage from '../assets/img/job-default-image.svg';

export default {
  name: 'CareerComponent',
  data() {
    return {
      jobServices: this.$serviceFactory.jobs,
    };
  },
  methods: {
    getJobImageUrl(job) {
      if (job.image && job.image.url) {
        return job.image.url;
      }

      return jobDefaultImage;
    },
    openJobModal({ jobId = '', jobCategory = '' }) {
      this.$store.commit('openModal', { modalName: 'JobModal', modalProps: { jobId, jobCategory } });
    },
  },
  async mounted() {
    const { data } = await this.jobServices.getJobs();
    const { jobs } = data;
    this.$store.dispatch('storeJobs', jobs);
  },
  computed: {
    ...mapGetters({
      jobs: 'getCategoriesAndJobs',
    }),
  },
};
</script>

<style scoped lang="scss">
  .job-category {
    &:not(:first-of-type) {
      & > p {
        @apply mt-10;
      }
    }

    .job {
      &-actions {
        display: none;
      }

      &:hover .job-actions {
        display: block;
      }
    }
  }
</style>
