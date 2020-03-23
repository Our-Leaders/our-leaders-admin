<template>
  <our-modal @close-modal="closeModal()" :open="true" size="normal">
    <template v-slot:header>
      <p class="text-4xl">Delete accomplishment</p>
      <p class="pt-10">Are you sure you want to permanently delete this accomplishment? You won't be able to recover it once you delete</p>
    </template>
    <div slot="content" class="pt-4">
      <form @submit.prevent="submit">
        <div class="flex mt-8">
          <button class="bg-primary text-white font-circular py-3 px-12" type="submit">
            <span>Delete</span>
          </button>
          <button class="font-circular py-3 px-12" @click="closeModal">
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  </our-modal>
</template>

<script>

export default {
  name: 'DeletePoliticianAccomplishmentModal',
  props: {
    accomplishmentId: {
      type: String,
    },
  },
  data() {
    return {
      politicianServices: this.$serviceFactory.politicians,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async submit() {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const { data } = await this.politicianServices.deleteAccomplishment(this.politicianId, this.accomplishmentId);
        this.closeModal();
        this.$store.dispatch('displaySuccess', { message: 'Accomplishment deleted successfully' });

        // update the politician here
        this.$store.commit('storePolitician', { politicianId: this.politicianId, payload: data.politician });
      } catch (err) {
        this.$store.dispatch('displayError', err);
      }
    },
  },
  computed: {
    politicianId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>

</style>
