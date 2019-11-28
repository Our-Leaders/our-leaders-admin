<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
body, html, #app {
  font-family: 'PT Serif', serif;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.field {
  border-bottom: 1px solid black;
  outline: none;
}

.btn-primary,
.btn-primary:focus,
.btn-primary:active {
  outline: none;
  @apply bg-primary font-semibold p-3 text-white;

  &.loading {
    animation: loading 1.5s linear infinite;
  }
}

.btn-primary:hover {
  background: rgba(206, 152, 51, 0.9);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.horizontal-divide {
  border-bottom: 1px solid #DBDBDB;
  color: #969696;
  font-size: 16px;
  line-height: 0.1em;
  text-align: center;
  width: 100%;

  span {
    background: #ffffff;
    padding: 0 10px;
  }
}

.input-fields {
  border-bottom: 1px solid black;

  input {
    outline: none;
  }
}

// This is just an idea for an animation, it can change
@keyframes loading {
  0% {
    background: #CE9833;
  }

  25% {
    background: #D6A853;
  }

  50% {
    background: #DDB872;
  }

  75% {
    background: #D6A853;
  }

  100% {
    background: #CE9833;
  }
}
</style>
