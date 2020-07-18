<template>
  <div>
    <div class="button-container mb-4 flex justify-end">
      <button class="border-black border py-1 px-3 flex justify-between items-center font-circular" @click="editBackground">Edit Background</button>
    </div>
    <div>
      <p class="font-circular text-xl font-semibold w-full mb-5">Personal background</p>
      <div class="flex flex-wrap mb-3">
        <div class="w-full lg:w-1/3 font-bold lg:font-normal">Political Party</div>
        <div class="w-full lg:w-2/3 capitalize" v-if="politician.politicalParty">{{politician.politicalParty.name}} ({{politician.politicalParty.acronym}})</div>
      </div>
      <div class="flex flex-wrap mb-3">
        <div class="w-full lg:w-1/3 font-bold lg:font-normal">DOB/Age</div>
        <div class="w-full lg:w-2/3">{{politician.dob | dateFormat('-')}} / {{politician.dob | age}} years</div>
      </div>
      <!-- <div class="flex mb-3">
        <div class="w-1/3">Country</div>
        <div class="w-2/3 capitalize">{{countries[politician.country].name}}</div>
      </div> -->
      <div class="flex flex-wrap mb-3">
        <div class="w-full lg:w-1/3 font-bold lg:font-normal">State of origin</div>
        <div class="w-full lg:w-2/3 capitalize">{{politician.stateOfOrigin}}</div>
      </div>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">Political background</p>
      <div class="flex flex-wrap mb-3" v-for="(politicalBackground, index) of politician.politicalBackground" :key="index">
        <div class="w-full lg:w-1/3 font-bold lg:font-normal">{{politicalBackground.position}}</div>
        <div class="w-full lg:w-2/3">
          <div>{{politicalBackground.description}}</div>
          <div>
            <span v-if="politicalBackground.startDate">{{politicalBackground.startDate | shortDateFormat}} - </span>
            <span v-if="politicalBackground.endDate">{{politicalBackground.endDate | shortDateFormat}}</span>
          </div>
        </div>
      </div>
      <div v-if="politician.politicalBackground.length < 1">
        <p>No current political background</p>
      </div>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">Educational background</p>
      <div class="flex flex-wrap mb-3" v-for="(educationalBackground, index) of politician.educationalBackground" :key="index">
        <div class="w-full lg:w-1/3 font-bold lg:font-normal capitalize">{{educationalBackground.degree}}</div>
        <div class="w-full lg:w-2/3 capitalize">
          <!-- University of Lagos. MBA Marketing, 1993 -->
          <span class="capitalize">{{educationalBackground.institution}}</span> <span v-if="educationalBackground.graduationYear">{{educationalBackground.graduationYear}}</span>
        </div>
      </div>
      <div v-if="politician.educationalBackground.length < 1">
        <p>No current educational background</p>
      </div>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">Professional background</p>
      <div class="mb-3" v-for="(professionalBackground, index) of politician.professionalBackground" :key="index">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/3 font-bold lg:font-normal">Title</div><div class="w-full lg:w-2/3 mb-5 lg:mb-0">{{professionalBackground.title}}</div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/3 font-bold lg:font-normal">Description</div><div class="w-full lg:w-2/3 mb-5 lg:mb-0">{{professionalBackground.description}}</div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/3 font-bold lg:font-normal">Duration</div><div class="w-full lg:w-2/3 mb-5 lg:mb-0">
            <span v-if="professionalBackground.startYear">{{professionalBackground.startYear}} - </span>
            <span v-if="professionalBackground.endYear">{{professionalBackground.endYear}}</span>
          </div>
        </div>
      </div>
      <div v-if="politician.professionalBackground.length < 1">
        <p>No current professional background</p>
      </div>
    </div>
  </div>
</template>

<script>
import countries from '@/assets/json/countrylist.json';

export default {
  props: {
    politician: {
      type: Object,
    },
  },
  data() {
    return {
      countries,
    };
  },
  methods: {
    getYear(value) {
      return new Date(value).getFullYear();
    },
    editBackground() {
      this.$store.commit('openModal', { modalName: 'EditPoliticianBackgroundModal', modalProps: { politicianId: this.politician.id } });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
