<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit accomplishment</p>
    </template>
    <div slot="content" class="pt-8">
      <our-accomplishment :existingAccomplishment="accomplishment" :politicianId="politicianId" :onCancel="closeModal"></our-accomplishment>
    </div>
  </our-modal>
</template>

<script>

export default {
  name: 'EditPoliticianAccomplishmentModal',
  props: {
    accomplishment: {
      type: Object,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
  computed: {
    politicianId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>

</style>
