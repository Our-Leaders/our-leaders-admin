<template>
  <our-modal @close-modal="closeModal()" :open="true">
    <div slot="content" class="flex items-center justify-centermt-10">
      <p class="font-circular text-3xl" v-if="isLoading">Processing...</p>
      <p class="font-circular text-3xl" v-else>{{message}}</p>
    </div>
    <div class="flex mt-12" slot="footer">
      <button class="bg-primary text-white font-circular py-3 px-12" @click="positiveAction" :disabled="isLoading">
        Yes
      </button>
      <button class="font-circular py-3 px-12" @click="closeModal()" :disabled="isLoading">Cancel</button>
    </div>
  </our-modal>
</template>

<script>
export default {
  name: 'ActionModal',
  props: {
    action: {
      type: Function,
      default: () => {},
    },
    message: {
      type: String,
      default: 'Are you sure you want to carry out this action?',
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async positiveAction() {
      this.isLoading = true;
      try {
        await this.action();
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
      this.closeModal();
    },
  },
};
</script>

<style scoped lang="scss">

</style>
