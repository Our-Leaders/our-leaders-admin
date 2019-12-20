<template>
  <div class="modal fixed inset-0 flex justify-center items-center h-full w-full z-50" v-if="open">
    <!-- <div class="modal-container bg-white bg-white relative"> -->
    <div class="modal-container bg-white px-10 pt-10 pb-12 bg-white relative" :class="size">
      <button class="close-modal-button absolute" @click="closeModal">
        <img src="@/assets/img/close.svg" alt="close modal">
      </button>
      <div class="modal-header relative w-full">
        <slot name="header"></slot>
      </div>
      <div class="modal-content w-full">
        <slot name="content"></slot>
      </div>
      <div class="modal-footer w-full">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'large'].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style lang="scss">
  .modal {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
  }

  .modal-container {
    min-width: 31.25rem;
    min-height: 10rem;
    max-height: calc(100vh - 20%);
    overflow-y: auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 0px 6px rgba(0, 0, 0, 0.1);
    transition: all .3s ease;

    &.large {
      width: 45rem;
    }
  }

  .close-modal-button {
    top: 1.5rem;
    right: 1.5rem;
    outline: none;
    height: 1rem;
    width: 1rem;
  }
</style>
