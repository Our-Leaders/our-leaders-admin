<template>
  <div>
    <div class="button-container mb-4 flex justify-end">
      <button class="border-black border py-1 px-3 flex justify-between items-center font-circular">Edit Manifesto</button>
    </div>
    <div>
      <p class="font-circular text-xl font-semibold w-full mb-5">Manifesto</p>
      <our-text-editor v-model="politician.manifesto.summary" :editable="false" class="mb-4"></our-text-editor>
      <a :href="politician.manifesto.url" class="text-xs text-gray-96 mt-1 font-circular" v-if="politician.manifesto.url">View full Manifesto</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    politician: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
