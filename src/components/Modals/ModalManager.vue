<template>
  <component :is="modals[activeModal]" v-bind="activeModalProps" @close-modal="closeModal"></component>
</template>

<script>
import { mapState } from 'vuex';

import JobModal from './JobModal.vue';
import ActionModal from './ActionModal.vue';
import NewAdminModal from './NewAdminModal.vue';
import EditContactModal from './EditContactModal.vue';
import EditProfileModal from './EditProfileModal.vue';
import NewPoliticianModal from './NewPoliticianModal.vue';
import EditPoliticianManifestoModal from './EditPoliticianManifestoModal.vue';
import EditPoliticianBackgroundModal from './EditPoliticianBackgroundModal.vue';
import NewPoliticalPartyModal from './NewPoliticalPartyModal.vue';
import EditPoliticalPartyIdeologyModal from './EditPoliticalPartyIdeologyModal.vue';
import EditPoliticianAccomplishmentModal from './EditPoliticianAccomplishmentModal.vue';
import DeletePoliticianAccomplishmentModal from './DeletePoliticianAccomplishmentModal.vue';

export default {
  name: 'ModalManager',
  data() {
    return {
      modals: {
        NewPoliticianModal,
        EditPoliticianManifestoModal,
        EditPoliticianBackgroundModal,
        NewPoliticalPartyModal,
        EditPoliticalPartyIdeologyModal,
        EditPoliticianAccomplishmentModal,
        DeletePoliticianAccomplishmentModal,
        EditContactModal,
        JobModal,
        ActionModal,
        NewAdminModal,
        EditProfileModal,
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
