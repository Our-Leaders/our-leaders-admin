<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <template v-slot:header>
      <p class="text-4xl">Edit accomplishment</p>
    </template>
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
};
</script>

<style>

</style>
