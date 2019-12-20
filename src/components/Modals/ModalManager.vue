<template>
  <component :is="modals[activeModal]" @close-modal="closeModal"></component>
</template>

<script>
import { mapState } from 'vuex';

import NewPoliticianModal from './NewPoliticianModal.vue';

export default {
  name: 'ModalManager',
  data() {
    return {
      modals: {
        NewPoliticianModal,
      },
    };
  },
  methods: {
    closeModal() {
      this.$store.commit('closeModal');
    },
  },
  computed: {
    ...mapState({
      activeModal: 'activeModal',
    }),
  },
};
</script>

<style>

</style>
