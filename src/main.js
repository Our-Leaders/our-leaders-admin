import Vue from 'vue';
import vSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';

import App from './App.vue';
import router from './router';
import serviceFactory from './services/factory';
import store from './store';

import './components/index';
import './main.css';
import '@/assets/styles/style.scss';
import dropdownIndicator from './assets/img/dropdown-indicator.svg';

import '@/filters';
import '@/vee-validate';

/** import and configure vselect */
Vue.component('v-select', vSelect);
vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: createElement => createElement('img', { attrs: { src: dropdownIndicator } }),
  },
});
/** end of vselect */

Vue.component('v-datepicker', Datepicker);

Vue.config.productionTip = false;

Vue.prototype.$serviceFactory = serviceFactory;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
