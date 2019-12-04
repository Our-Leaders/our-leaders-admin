<template>
  <div class="leader-profile">
    <img class="w-full mb-3" src="@/assets/img/osibanjo.png" alt="">
    <div class="flex likes mb-3 font-circular text-2xl lg:text-sm text-gray-96">
      <span class="flex mr-3 items-baseline cursor-pointer">
        <img class="mr-2 w-8 lg:w-6 relative" src="@/assets/img/upvote.svg" alt="upvote">
        {{politician.upvotes}}
      </span>
      <span class="flex items-baseline cursor-pointer">
        <img class="mr-2 w-8 lg:w-6 relative downvote" src="@/assets/img/downvote.svg" alt="downvote">
        {{politician.downvotes}}
      </span>
    </div>
    <p class="name font-circular text-3xl lg:text-base xl:text-xl font-bold">{{politician.name}}</p>
    <p class="position text-lg lg:text-sm xl:text-base">{{politician.position}}</p>
  </div>
</template>

<script>
export default {
  name: 'Politician',
  props: {
    politician: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
  .leader-profile {
    flex: 0 0 94%;
    margin-top: 0.75rem;
    margin-left: 0.75rem;
    margin-right: 0.75rem;

    @screen sm {
      margin-top: 1rem;
      margin-left: 1rem;
      margin-right: 1rem;
      flex: 0 0 45%;
    }

    @screen lg {
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      flex: 0 0 30%;
    }

    @screen xl {
      margin-top: 0.7rem;
      margin-left: 0.7rem;
      margin-right: 0.7rem;
      flex: 0 0 22%;
    }

    @apply h-auto mb-12;

    .position {
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @screen sm {
        max-width: 21rem;
      }

      @screen lg {
        max-width: 12rem;
      }

      @screen xl {
        max-width: 10.6rem;
      }
    }

    .downvote {
      top: 12px;

      @screen lg {
        top: 8px;
      }
    }
  }
</style>
