export const modalMutations = {
  openModal(state, { modalName, modalProps = {} }) {
    state.activeModal = modalName;
    state.activeModalProps = modalProps;
  },
  closeModal(state) {
    state.activeModal = null;
  },
};

export const modalGetters = {};
