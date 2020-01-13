<template>
  <div class="lg:pr-2 xl:pr-0 xl:flex">
    <div class="w-full xl:w-2/3">
      <header class="flex justify-between">
        <h5 class="text-4xl">
          Web Pages
        </h5>
      </header>
      <div class="w-full mt-10">
        <our-tabs :tabs="tabs"></our-tabs>
      </div>
    </div>
    <div class="w-full xl:w-1/3 xl:ml-10"></div>
  </div>
</template>

<script>
export default {
  name: 'WebPages',
  data() {
    return {
      tabs: [{
        label: 'About Us',
        value: 'about-us',
      }, {
        label: 'Careers',
        value: 'careers',
      }, {
        label: 'Contact',
        value: 'contact',
      }],
    };
  },
};
</script>

<style scoped>

</style>
