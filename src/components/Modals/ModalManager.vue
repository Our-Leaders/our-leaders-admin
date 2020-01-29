<template>
  <component :is="modals[activeModal]" v-bind="activeModalProps" @close-modal="closeModal"></component>
</template>

<script>
import { mapState } from 'vuex';

import JobModal from './JobModal.vue';
import ActionModal from './ActionModal.vue';
import EditContactModal from './EditContactModal.vue';
import NewPoliticianModal from './NewPoliticianModal.vue';
import EditPoliticianManifestoModal from './EditPoliticianManifestoModal.vue';
import NewPoliticalPartyModal from './NewPoliticalPartyModal.vue';
import EditPoliticalPartyIdeologyModal from './EditPoliticalPartyIdeologyModal.vue';

export default {
  name: 'ModalManager',
  data() {
    return {
      modals: {
        NewPoliticianModal,
        EditPoliticianManifestoModal,
        NewPoliticalPartyModal,
        EditPoliticalPartyIdeologyModal,
        EditContactModal,
        JobModal,
        ActionModal,
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
      activeModalProps: 'activeModalProps',
    }),
  },
};
</script>

<style>

</style>
