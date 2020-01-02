<template>
  <component :is="modals[activeModal]" @close-modal="closeModal"></component>
</template>

<script>
import { mapState } from 'vuex';

import NewPoliticianModal from './NewPoliticianModal.vue';
import NewPoliticalPartyModal from './NewPoliticalPartyModal.vue';

export default {
  name: 'ModalManager',
  data() {
    return {
      modals: {
        NewPoliticianModal,
        NewPoliticalPartyModal,
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
