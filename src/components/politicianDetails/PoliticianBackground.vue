<template>
  <div>
    <div class="button-container mb-4 flex justify-end">
      <!-- <button class="border-black border py-1 px-3 flex justify-between items-center font-circular">Edit Background</button> -->
    </div>
    <div>
      <p class="font-circular text-xl font-semibold w-full mb-5">Personal background</p>
      <div class="flex mb-3">
        <div class="w-1/3">Political Party</div>
        <div class="w-2/3 capitalize" v-if="politician.politicalParty">{{politician.politicalParty.name}} ({{politician.politicalParty.acronym}})</div>
      </div>
      <div class="flex mb-3">
        <div class="w-1/3">DOB/Age</div>
        <div class="w-2/3">{{politician.dob | dateFormat('-')}} / {{politician.dob | age}} years</div>
      </div>
      <div class="flex mb-3">
        <div class="w-1/3">State of origin</div>
        <div class="w-2/3 capitalize">{{politician.stateOfOrigin}}</div>
      </div>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">Political background</p>
      <div class="flex mb-3" v-for="(politicalBackground, index) of politician.politicalBackground" :key="index">
        <div class="w-1/3">{{politicalBackground.position}}</div>
        <div class="w-2/3">
          <div>{{politicalBackground.description}}</div>
          <div>
            <span v-if="politicalBackground.startDate">{{politicalBackground.startDate | shortDateFormat}} - </span>
            <span v-if="politicalBackground.endDate">{{politicalBackground.endDate | shortDateFormat}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">Educational background</p>
      <div class="flex mb-3" v-for="(educationalBackground, index) of politician.educationalBackground" :key="index">
        <div class="w-1/3 capitalize">{{educationalBackground.degree}}</div>
        <div class="w-2/3 capitalize">
          <!-- University of Lagos. MBA Marketing, 1993 -->
          <span class="capitalize">{{educationalBackground.institution}}</span> <span v-if="educationalBackground.startDate">{{getYear(educationalBackground.startDate)}}</span>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">Professional background</p>
      <div class="mb-3" v-for="(professionalBackground, index) of politician.professionalBackground" :key="index">
        <div class="flex">
          <div class="w-1/3">Title</div><div class="w-2/3">{{professionalBackground.title}}</div>
        </div>
        <div class="flex">
          <div class="w-1/3">Description</div><div class="w-2/3">{{professionalBackground.description}}</div>
        </div>
        <div class="flex">
          <div class="w-1/3">Duration</div><div class="w-2/3">
            <span v-if="professionalBackground.startDate">{{getYear(professionalBackground.startDate)}} - </span>
            <span v-if="professionalBackground.endDate">{{getYear(professionalBackground.endDate)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    politician: {
      type: Object,
    },
  },
  methods: {
    getYear(value) {
      return new Date(value).getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
