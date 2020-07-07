<template>
  <our-modal @close-modal="closeModal()" :open="true" size="large">
    <div slot="content" class="pt-4">
      <our-admin-details :adminId="adminId"></our-admin-details>
    </div>
  </our-modal>
</template>

<script>

export default {
  name: 'DeletePoliticianAccomplishmentModal',
  props: {
    adminId: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style>

</style>
