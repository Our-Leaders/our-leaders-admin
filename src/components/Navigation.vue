<template>
  <nav class="flex items-center justify-between flex-wrap border-b py-4">
    <!-- <nav class="flex items-center justify-between flex-wrap border-nav xl:border-b xl:m-0 py-4"> -->
    <div class="nav-icon w-1/12 inline-block">
      <img class src="@/assets/img/logo.svg" />
    </div>
    <div class="w-2/3 h-10">
      <div class="w-5/12 mx-auto relative">
        <input
          class="w-full pl-1 py-2 border-b border-gray-400"
          type="text"
          id="text"
          name="text"
          placeholder="Search leader, party or user"
          required
        />
        <img src="@/assets/img/search.svg" alt="search" class="search-img absolute  right-0 top-0 bottom-0 my-auto">
      </div>
    </div>
    <div class="w-auto border-l pl-8 pr-4 h-14 flex items-center font-circular">
      <div
        class="notifications h-8 w-8 bg-gray-f0 rounded-full text-xs flex items-center justify-center mr-5 relative"
      >
        <div class="new-notification-indication rounded-full absolute"></div>12
      </div>
      <div class="avatar h-10 w-10 rounded-full bg-gray-f0 mr-4"></div>
      <div class="admin-info leading-tight">
        <div class="admin-name text-sm">Chidimma</div>
        <div class="admin-info text-xs text-gray-96">Chidimma@ourleaders.africa</div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
nav {
  @screen xl {
    min-height: 6.25rem;
    margin-left: 2.375em;
    margin-right: 3.1875rem;

    .nav-icon img {
      width: 4rem;
    }
  }

  .new-notification-indication {
    background-color: #f14336;
    height: 0.6875rem;
    width: 0.6875rem;
    top: -0.025rem;
    right: -0.025rem;
  }
}
</style>
