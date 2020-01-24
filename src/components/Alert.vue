<template>
  <transition name="slidein">
    <div :class="customClass"
        class="z-50"
        v-if="display"
        role="alert">
        <div :class="topClass"></div>
        <div class="flex">
          <div class="py-1">
            <svg
              :class="iconClass"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8
                8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
            </svg>
          </div>
          <div>
            <slot/>
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: 'our-alert',
  props: {
    alertType: {
      type: String,
      required: true,
      validator: val => ['error', 'info', 'success'].includes(val),
    },
    display: Boolean,
  },
  computed: {
    customClass() {
      let style = 'our-alert rounded-b m-6 px-4 py-3 shadow-md ';
      if (this.alertType === 'info') {
        style += 'bg-yellow-100 text-yellow-900';
      } else if (this.alertType === 'error') {
        style += 'bg-red-100 text-red-900';
      } else {
        style += 'bg-teal-100 text-teal-900';
      }

      return style;
    },
    topClass() {
      const classes = ['alert-border', 'h-1', 'absolute', 'w-full', 'inset-x-0', 'top-0'];

      if (this.alertType.toLowerCase() === 'info') {
        classes.push('bg-yellow-500');
      } else if (this.alertType.toLowerCase() === 'error') {
        classes.push('bg-red-500');
      } else {
        classes.push('bg-teal-500');
      }

      return classes;
    },
    iconClass() {
      let style = 'fill-current h-6 w-6 mr-4 ';
      if (this.alertType === 'info') {
        style += 'text-yellow-500';
      } else if (this.alertType === 'error') {
        style += 'text-red-500';
      } else {
        style += 'text-teal-500';
      }

      return style;
    },
  },
};
</script>

<style lang="scss">
.our-alert {
  position: fixed;
  right: 10px;
  top: 10px;
}

.alert-border {
  animation: 4s slideout ease-out 1 forwards;
}

.slidein-enter-active {
  transition: all .5s ease;
}
.slidein-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slidein-enter, .slidein-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes slideout {
  100% {
    width: 0;
  }
}
</style>
