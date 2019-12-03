<template>
  <div class="lg:flex">
    <div class="lg:w-2/3 xl:w-3/5">
      <div class="banner w-full relative bg-primary h-32 text-white py-5 px-6">
        <h3 class="text-4xl">You're now 403 leaders strong!</h3>
        <p>Keep making African leadership better</p>
      </div>
      <div class="stats flex mt-6">
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Current Leaders</p>
          <p class="stat-data">320</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Upcoming Leaders</p>
          <p class="stat-data">83</p>
        </div>
        <div class="stat flex-grow">
          <p class="stat-title font-semibold font-circular">Parties</p>
          <p class="stat-data">320</p>
        </div>
        <div class="stat flex-grow pl-10 border-l-2 border-gray-c4">
          <p class="stat-title font-semibold font-circular">Admins</p>
          <p class="stat-data">12</p>
        </div>
      </div>
    </div>
    <div class="lg:w-1/3 xl:w-2/5">aside</div>
  </div>
</template>

<script>
export default {
  name: 'admin-home',
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url("../../assets/img/banner-bg.svg");
  background-size: cover;
}
</style>
