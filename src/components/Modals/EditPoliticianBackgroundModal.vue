<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit Background</p>
    </template>
    <template v-slot:content>
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full mb-4">Personal background</p>
            <div class="flex mb-3">
              <div class="w-1/3 xl:mr-5 self-center">
                Political Party
              </div>
              <div class="w-2/3">
                <v-select
                  name="politician-party"
                  label="name"
                  :reduce="party => party.id"
                  :clearable="false"
                  :options="politicalParties"
                  v-model="politicianData.politicalParty"
                  class="our-select"></v-select>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 xl:mr-5 self-center">
                DOB/Age
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Politician DOB" v-slot="{ errors }">
                  <v-datepicker
                    placeholder="DD/MM/YYYY"
                    format="dd/MM/yyyy"
                    v-model="politicianData.dob"
                    required
                    :input-class="datePickerClasses(errors.length > 0)">
                  </v-datepicker>
                </ValidationProvider>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/3 xl:mr-5 self-center">
                State of origin
              </div>
              <div class="w-2/3">
                <ValidationProvider rules="required" name="Politician State of origin" v-slot="{ errors }">
                  <v-select
                    name="state-of-origin"
                    :clearable="false"
                    :options="nigerianStates"
                    v-model="politicianData.stateOfOrigin"
                    :class="{'has-error': errors.length > 0}"
                    class="our-select"></v-select>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full mb-4">Political background</p>
            <div class="flex mb-3" v-for="(politicalBackground, index) of politicianData.politicalBackground.concat(newPoliticalBackgrounds)" :key="index">
              <div class="w-1/3 xl:mr-5">
                <input class="field w-full py-2 border-gray-c4"
                  type="text"
                  name="position"
                  v-model="politicalBackground.position"
                  placeholder="Office"
                />
              </div>
              <div class="w-2/3">
                <div>
                  <input class="field w-full py-2 border-gray-c4"
                    type="text"
                    name="position-description"
                    v-model="politicalBackground.description"
                    placeholder="Description of office"
                  />
                </div>
                <div class="flex">
                  <v-datepicker
                    name="start-date"
                    placeholder="Start date"
                    format="dd/MM/yyyy"
                    v-model="politicalBackground.startDate"
                    class="w-full xl:mr-2"
                    :input-class="datePickerClasses()">
                  </v-datepicker>
                  <v-datepicker
                    name="end-date"
                    placeholder="End date"
                    format="dd/MM/yyyy"
                    v-model="politicalBackground.endDate"
                    class="w-full xl:ml-2"
                    :input-class="datePickerClasses()">
                  </v-datepicker>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <a class="inline-flex items-center cursor-pointer" @click="addRow('newPoliticalBackgrounds', politicalBackgroundData)">
                <span class="mr-2">New row</span>
                <span><img src="@/assets/img/add.svg" alt=""></span>
              </a>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full mb-4">Educational background</p>
            <div class="flex mb-3" v-for="(educationalBackground, index) of politicianData.educationalBackground.concat(newEducationalBackgrounds)" :key="index">
              <div class="w-1/3 xl:mr-5">
                <input class="field w-full py-2 border-gray-c4"
                  type="text"
                  name="degree"
                  v-model="educationalBackground.degree"
                  placeholder="Degree"
                />
              </div>
              <div class="w-2/3">
                <input class="field w-full py-2 border-gray-c4"
                  type="text"
                  name="background-description"
                  v-model="educationalBackground.institution"
                  placeholder="Institution"
                />
                <v-datepicker
                  name="start-date"
                  placeholder="Degree start date"
                  format="dd/MM/yyyy"
                  v-model="educationalBackground.startDate"
                  class="w-full"
                  :input-class="datePickerClasses()">
                </v-datepicker>
              </div>
            </div>
            <div class="mt-6">
              <a class="inline-flex items-center cursor-pointer" @click="addRow('newEducationalBackgrounds', educationalBackgroundData)">
                <span class="mr-2">New row</span>
                <span><img src="@/assets/img/add.svg" alt=""></span>
              </a>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-circular text-xl font-semibold w-full mb-4">Professional background</p>
            <div class="flex mb-3" v-for="(professionalBackground, index) of politicianData.professionalBackground.concat(newProfessionalBackgrounds)" :key="index">
              <div class="w-1/3 xl:mr-5">
                <input class="field w-full py-2 border-gray-c4"
                  type="text"
                  name="title"
                  v-model="professionalBackground.title"
                  placeholder="Title"
                />
              </div>
              <div class="w-2/3">
                <div>
                  <input class="field w-full py-2 border-gray-c4"
                    type="text"
                    name="title-description"
                    v-model="professionalBackground.description"
                    placeholder="Description"
                  />
                </div>
                <div class="flex">
                  <v-datepicker
                    name="start-date"
                    placeholder="Start date"
                    format="dd/MM/yyyy"
                    v-model="professionalBackground.startDate"
                    class="w-full xl:mr-2"
                    :input-class="datePickerClasses()">
                  </v-datepicker>
                  <v-datepicker
                    name="end-date"
                    placeholder="End date"
                    format="dd/MM/yyyy"
                    v-model="professionalBackground.endDate"
                    class="w-full xl:ml-2"
                    :input-class="datePickerClasses()">
                  </v-datepicker>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <a class="inline-flex items-center cursor-pointer" @click="addRow('newProfessionalBackgrounds', professionalBackgroundData)">
                <span class="mr-2">New row</span>
                <span><img src="@/assets/img/add.svg" alt=""></span>
              </a>
            </div>
          </div>
          <div class="flex mt-12">
            <button class="bg-primary text-white font-circular py-3 px-12" type="submit" :disabled="invalid || updateLoading">
              <span v-if="!updateLoading">Save</span>
              <span v-else>Submitting...</span>
            </button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </our-modal>
</template>

<script>
import nigerianStates from '@/assets/json/nigerianStates.json';

export default {
  name: 'NewLeaderModal',
  props: {
    politicianId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      politicianServices: this.$serviceFactory.politicians,
      nigerianStates,
      politicianData: {
        name: '',
        dob: '',
        religion: '',
        stateOfOrigin: '',
        politicalParty: '',
        status: '',
        politicalBackground: [],
        educationalBackground: [],
        professionalBackground: [],
      },
      politicalParties: [],
      updateLoading: false,
      politicalBackgroundData: {
        position: '',
        description: '',
        inOffice: false,
        state: '',
        startDate: '',
        endDate: '',
      },
      educationalBackgroundData: {
        degree: '',
        institution: '',
        startDate: '',
      },
      professionalBackgroundData: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
      },
      newPoliticalBackgrounds: [],
      newEducationalBackgrounds: [],
      newProfessionalBackgrounds: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      console.log('submit');
    },
    datePickerClasses(invalid) {
      let classNames = 'field w-full py-2';

      if (invalid) {
        classNames += ' border-red-600';
      } else {
        classNames += ' border-gray-c4';
      }

      return classNames;
    },
    addRow(list, data) {
      this[list] = this[list].concat(data);
    },
  },
  async mounted() {
    if (this.$store.state.politicalParties.length === 0) {
      const { data } = await this.politicalPartyServices.getPoliticalParties();
      this.$store.commit('storePoliticalParties', data.politicalParties);
    }

    const { politicalParties } = this.$store.state;
    this.politicalParties = politicalParties;

    if (this.politicianId) {
      const {
        name = '',
        dob = '',
        religion = '',
        stateOfOrigin = '',
        politicalParty = {},
        status = '',
        politicalBackground = [],
        educationalBackground = [],
        professionalBackground = [],
      } = this.$store.getters.getPolitician(this.politicianId);

      this.politicianData = {
        name,
        dob,
        religion,
        stateOfOrigin,
        // eslint-disable-next-line no-underscore-dangle
        politicalParty: politicalParty._id || '',
        politicalBackground,
        educationalBackground,
        professionalBackground,
        status,
      };

      if (!politicalBackground.length) {
        this.newPoliticalBackgrounds = this.newPoliticalBackgrounds.concat(this.politicalBackgroundData);
      }
      if (!educationalBackground.length) {
        this.newEducationalBackgrounds = this.newEducationalBackgrounds.concat(this.educationalBackgroundData);
      }
      if (!professionalBackground.length) {
        this.newProfessionalBackgrounds = this.newProfessionalBackgrounds.concat(this.professionalBackgroundData);
      }
    }
  },
};
</script>
