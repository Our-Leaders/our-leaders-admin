export const modalMutations = {
  openModal(state, modalName) {
    state.activeModal = modalName;
  },
  closeModal(state) {
    state.activeModal = null;
  },
};

export const modalGetters = {};
