<template>
  <div>
    <div class="button-container mb-4 flex justify-end">
      <!-- <button class="border-black border py-1 px-3 flex justify-between items-center font-circular">Edit Background</button> -->
    </div>
    <div>
      <p>
        {{party.partyBackground}}
      </p>
    </div>
    <div class="mt-8">
      <p class="font-circular text-xl font-semibold w-full mb-5">More details</p>
      <div class="flex mb-3">
        <div class="w-1/3">Founded</div>
        <div class="w-2/3">
          <div>{{party.partyDescription.founded}}</div>
        </div>
      </div>
      <div class="flex mb-3">
        <div class="w-1/3">Chairman</div>
        <div class="w-2/3">
          <div>{{party.partyDescription.partyChairman}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    party: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
