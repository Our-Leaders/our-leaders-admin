<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit Ideology</p>
    </template>
    <div slot="content" class="pt-8">
      <our-text-editor v-model="ideology"></our-text-editor>
    </div>
    <div slot="footer" class="flex mt-12">
      <button class="bg-primary text-white font-circular py-3 px-10" @click="submit" :disabled="editIdeologyLoading">
        <span v-if="!editIdeologyLoading">Save</span>
        <span v-else>Submitting...</span>
      </button>
      <button class="font-circular py-3 px-10" @click="closeModal()">Cancel</button>
    </div>
  </our-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditPoliticalPartyIdeology',
  props: {
    politicalPartyId: {
      type: String,
    },
  },
  data() {
    return {
      politicalPartyServices: this.$serviceFactory.politicalParty,
      ideology: '',
      editIdeologyLoading: false,
    };
  },
  methods: {
    ...mapActions({
      displaySuccess: 'displaySuccess',
      displayError: 'displayError',
    }),
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.editIdeologyLoading = true;
      try {
        await this.politicalPartyServices.editPoliticalParty(this.politicalPartyId, { ideology: this.ideology });

        // update the list of political parties
        const { data } = await this.politicalPartyServices.getPoliticalParties();
        const { politicalParties, total: politicalPartyCount } = data;
        this.$store.commit('storePoliticalParties', { politicalParties, politicalPartyCount });
        this.displaySuccess({ message: 'Party ideology edited successfully' });
        this.closeModal();
      } catch (error) {
        this.displayError(error);
      } finally {
        this.editIdeologyLoading = false;
      }
    },
  },
  mounted() {
    const { ideology = '' } = this.$store.getters.getPoliticalParty(this.politicalPartyId);
    this.ideology = ideology;
  },
};
</script>

<style>

</style>
