import Vue from 'vue';
import Croppa from 'vue-croppa';
import vSelect from 'vue-select';
import Paginate from 'vuejs-paginate';
import Datepicker from 'vuejs-datepicker';
import VuePluralize from 'vue-pluralize';
import DatepickerAlt from 'v-calendar/lib/components/date-picker.umd';

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
import '@/font-awesome';
import 'vue-croppa/dist/vue-croppa.css';

/** import and configure vselect */
Vue.component('v-select', vSelect);
vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: createElement => createElement('img', { attrs: { src: dropdownIndicator, style: 'max-width: 21px;' } }),
  },
});
/** end of vselect */

Vue.component('paginate', Paginate);
Vue.component('v-datepicker', Datepicker);
Vue.component('vc-datepicker', DatepickerAlt);

// configure the pluralize lib
Vue.use(VuePluralize);
Vue.use(Croppa);

Vue.config.productionTip = false;

Vue.prototype.$serviceFactory = serviceFactory;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
