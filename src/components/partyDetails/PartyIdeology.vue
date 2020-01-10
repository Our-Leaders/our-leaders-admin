<template>
  <div>
    <div class="button-container mb-4 flex justify-end">
      <button class="border-black border py-1 px-3 flex justify-between items-center font-circular" @click="editIdeology">Edit Ideology</button>
    </div>
    <div>
      <p class="font-circular text-xl font-semibold w-full mb-5">Ideology</p>
      <our-text-editor v-model="party.ideology" :editable="false" class="mb-4"></our-text-editor>
      <!-- <a :href="politician.manifesto.url" class="text-xs text-gray-96 mt-1 font-circular" v-if="politician.manifesto.url" target="_blank">View full Manifesto</a> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    party: {
      type: Object,
    },
  },
  methods: {
    editIdeology() {
      // this.$store.commit('openModal', { modalName: 'EditPoliticianManifestoModal', modalProps: { politicianId: this.politician.id } });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
