<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit Manifesto</p>
    </template>
    <div slot="content" class="pt-8">
      <our-text-editor v-model="manifesto.summary"/>
      <div class="flex mt-12 items-center">
        <div class="w-1/4">Manifesto link</div>
        <div class="w-3/4">
          <input class="field w-full py-2 border-gray-c4"
              type="text"
              id="email"
              name="email"
              v-model="manifesto.url"
              placeholder="Manifesto URL"
              required/>
        </div>
      </div>
    </div>
    <div slot="footer" class="flex mt-12">
      <button class="bg-primary text-white font-circular py-3 px-10" @click="submit" :disabled="editManifestoLoading">
        <span v-if="!editManifestoLoading">Save</span>
        <span v-else>Submitting...</span>
      </button>
      <button class="font-circular py-3 px-10" @click="closeModal()">Cancel</button>
    </div>
  </our-modal>
</template>

<script>

export default {
  name: 'EditPoliticianModal',
  props: {
    politicianId: {
      type: String,
    },
  },
  data() {
    return {
      politicianServices: this.$serviceFactory.politicians,
      manifesto: {
        summary: '',
        url: '',
      },
      editManifestoLoading: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      this.editManifestoLoading = true;
      try {
        await this.politicianServices.editPolitician(this.politicianId, { manifesto: this.manifesto });

        // update the list of politicians
        const { data } = await this.politicianServices.getPoliticians({});
        const { politicians, total: politicianCount } = data;
        this.$store.commit('storePoliticians', { politicians, politicianCount });
        this.closeModal();
      } catch (err) {
        // do something with the error here
      } finally {
        this.editManifestoLoading = false;
      }
    },
  },
  mounted() {
    const { manifesto = {} } = this.$store.getters.getPolitician(this.$route.params.id);
    this.manifesto = { ...manifesto };
  },
};
</script>

<style>

</style>
