import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} is required',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
