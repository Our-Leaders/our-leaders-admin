import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { required, min_value as minValue, max_value as maxValue } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} is required',
});
extend('min_value', minValue);
extend('max_value', maxValue);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
