<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit Background</p>
    </template>
    <template v-slot:content>
      <form @submit="submit">
        <div class="mt-10">
          <p class="font-circular text-xl font-semibold w-full mb-4">Political background</p>
          <div class="flex mb-3"
               v-for="(politicalBackground, index) of politicianData.politicalBackground"
               :key="index">
            <div class="w-1/3 xl:mr-5">
              <div>
                <input class="field w-full py-2 border-gray-c4"
                       type="text"
                       name="position"
                       v-model="politicalBackground.position"
                       placeholder="Office *"
                       :required="required(politicalBackground, politicalBackgroundData)"
                />
              </div>
              <div>
                <input class="field w-full py-2 border-gray-c4"
                       type="text"
                       name="region"
                       v-model="politicalBackground.region"
                       placeholder="region/state/country"
                />
              </div>
              <div class="w-full py-2 inline-block cursor-pointer">
                <input class="mr-2"
                       :id="`in-office-${index}`"
                       type="radio"
                       name="in-office"
                       :value="index"
                       :checked="politicalBackground.inOffice"
                       @change="onChangeInOffice($event)"
                />
                <label :for="`in-office-${index}`">Is current office</label>
              </div>
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
                  placeholder="Start date *"
                  format="dd/MM/yyyy"
                  v-model="politicalBackground.startDate"
                  class="w-full xl:mr-2"
                  input-class="field w-full py-2 border-gray-c4"
                  :required="required(politicalBackground, politicalBackgroundData)">
                </v-datepicker>
                <v-datepicker
                  name="end-date"
                  placeholder="End date *"
                  format="dd/MM/yyyy"
                  v-model="politicalBackground.endDate"
                  class="w-full xl:ml-2"
                  input-class="field w-full py-2 border-gray-c4">
                </v-datepicker>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <a :class="addRowClass('politicalBackground', politicalBackgroundData)"
               @click="addRow('politicalBackground', politicalBackgroundData)">
              <span class="mr-2">New row</span>
              <span><img src="@/assets/img/add.svg" alt=""></span>
            </a>
          </div>
        </div>
        <div class="mt-10">
          <p class="font-circular text-xl font-semibold w-full mb-4">Educational background</p>
          <div class="flex mb-3"
               v-for="(educationalBackground, index) of politicianData.educationalBackground"
               :key="index">
            <div class="w-1/3 xl:mr-5">
              <input class="field w-full py-2 border-gray-c4"
                     type="text"
                     name="degree"
                     v-model="educationalBackground.degree"
                     placeholder="Degree *"
                     :required="required(educationalBackground, educationalBackgroundData)"
              />
            </div>
            <div class="w-2/3">
              <input class="field w-full py-2 border-gray-c4"
                     type="text"
                     name="background-description"
                     v-model="educationalBackground.institution"
                     placeholder="Institution *"
                     :required="required(educationalBackground, educationalBackgroundData)"
              />
              <input class="field w-full py-2 border-gray-c4"
                     type="number"
                     maxlength="4"
                     max="9999"
                     name="start-date"
                     v-model="educationalBackground.graduationYear"
                     placeholder="Graduation year"
              />
            </div>
          </div>
          <div class="mt-6">
            <a :class="addRowClass('educationalBackground', educationalBackgroundData)"
               @click="addRow('educationalBackground', educationalBackgroundData)">
              <span class="mr-2">New row</span>
              <span><img src="@/assets/img/add.svg" alt=""></span>
            </a>
          </div>
        </div>
        <div class="mt-10">
          <p class="font-circular text-xl font-semibold w-full mb-4">Professional background</p>
          <div class="flex mb-3"
               v-for="(professionalBackground, index) of politicianData.professionalBackground"
               :key="index">
            <div class="w-1/3 xl:mr-5">
              <input class="field w-full py-2 border-gray-c4"
                     type="text"
                     name="title"
                     v-model="professionalBackground.title"
                     placeholder="Title *"
                     :required="required(professionalBackground, professionalBackgroundData)"
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
                  placeholder="Start date *"
                  format="dd/MM/yyyy"
                  v-model="professionalBackground.startDate"
                  class="w-full xl:mr-2"
                  input-class="field w-full py-2 border-gray-c4"
                  :required="required(professionalBackground, professionalBackgroundData)">
                </v-datepicker>
                <v-datepicker
                  name="end-date"
                  placeholder="End date *"
                  format="dd/MM/yyyy"
                  v-model="professionalBackground.endDate"
                  class="w-full xl:ml-2"
                  input-class="field w-full py-2 border-gray-c4"
                  :required="required(professionalBackground, professionalBackgroundData)">
                </v-datepicker>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <a :class="addRowClass('professionalBackground', professionalBackgroundData)"
               @click="addRow('professionalBackground', professionalBackgroundData)">
              <span class="mr-2">New row</span>
              <span><img src="@/assets/img/add.svg" alt=""></span>
            </a>
          </div>
        </div>
        <div class="mt-8">
          <p class="flex text-red-500 absolute">{{ error }}</p>
          <button class="bg-primary text-white font-circular py-3 px-12 mt-10" type="submit"
                  :disabled="updateLoading">
            <span v-if="!updateLoading">Save</span>
            <span v-else>Submitting...</span>
          </button>
        </div>
      </form>
    </template>
  </our-modal>
</template>

<script>
import isEqual from 'lodash.isequal';

export default {
  name: 'EditPoliticianBackgroundModal',
  props: {
    politicianId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      politicianServices: this.$serviceFactory.politicians,
      politicianData: {
        politicalBackground: [],
        educationalBackground: [],
        professionalBackground: [],
      },
      updateLoading: false,
      error: '',
      politicalBackgroundData: {
        position: '',
        description: '',
        inOffice: false,
        region: '',
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
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit(e) {
      e.preventDefault();
      this.updateLoading = true;
      this.error = '';

      const payload = this.removeEmptySections();

      try {
        // update the politician
        await this.politicianServices.editPoliticianBackground(this.politicianId, payload);

        // update the list of politicians
        const { data } = await this.politicianServices.getPoliticians({});
        const { politicians, total: politicianCount } = data;
        this.$store.commit('storePoliticians', { politicians, politicianCount });
        this.$store.dispatch('displaySuccess', { message: 'Politician\'s background updated successfully' });
        this.closeModal();
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message;
        } else {
          this.$store.dispatch('displayError', err.message);
        }
      } finally {
        this.updateLoading = false;
      }
    },
    removeEmptySections() {
      const politicianData = { ...this.politicianData };
      const { politicalBackground, educationalBackground, professionalBackground } = politicianData;

      politicianData.politicalBackground = politicalBackground.filter(background => !isEqual(this.politicalBackgroundData, background));
      politicianData.educationalBackground = educationalBackground.filter(background => !isEqual(this.educationalBackgroundData, background));
      politicianData.professionalBackground = professionalBackground.filter(background => !isEqual(this.professionalBackgroundData, background));

      return politicianData;
    },
    onChangeInOffice(event) {
      const { value } = event.target;

      this.politicianData.politicalBackground = this.politicianData.politicalBackground.map((bg, index) => {
        const background = { ...bg };
        background.inOffice = index === parseInt(value, 0);
        return background;
      });
    },
    addRow(list, data) {
      if (!this.previousRowIsEmpty(list, data)) {
        this.politicianData[list] = this.politicianData[list].concat({ ...data });
      }
    },
    addRowClass(list, data) {
      let cx = 'inline-flex items-center';

      if (this.previousRowIsEmpty(list, data)) {
        cx += ' cursor-not-allowed opacity-50';
      } else {
        cx += ' cursor-pointer';
      }
      return cx;
    },
    previousRowIsEmpty(list, data) {
      const backgrounds = this.politicianData[list];
      return isEqual(data, backgrounds[backgrounds.length - 1]);
    },
    required(list, data) {
      // Field is required only if section is not empty
      return !isEqual(list, data);
    },
  },
  async mounted() {
    if (this.politicianId) {
      let { politicalBackground, educationalBackground, professionalBackground } = this.$store.getters.getPolitician(this.politicianId);

      if (!politicalBackground.length) politicalBackground = [{ ...this.politicalBackgroundData }];
      if (!educationalBackground.length) educationalBackground = [{ ...this.educationalBackgroundData }];
      if (!professionalBackground.length) professionalBackground = [{ ...this.professionalBackgroundData }];

      this.politicianData = { politicalBackground, educationalBackground, professionalBackground };
    }
  },
};
</script>
