<template>
  <div class="home pt-12 flex relative h-full mt-24">
    <our-side-navbar />
    <div class="content w-full lg:w-3/4 xl:w-5/6 lg:flex h-full inset-y-0 right-0">
      <div class="lg:w-2/3 xl:w-3/5">
        content
      </div>
      <div class="lg:w-1/3 xl:w-2/5">
        aside
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="scss" scoped>
  .content {
    @screen lg {
      margin-left: 25%;
    }

    @screen xl {
      margin-left: 16.666667%;
    }
  }
</style>
