import Vue from 'vue';

import Alert from './Alert.vue';
import Navigation from './Navigation.vue';
import CountryList from './CountrySelector.vue';
import SideNavigation from './SideNavigation.vue';
import Politician from './Politician.vue';
import Modal from './Modal.vue';

Vue.component('our-alert', Alert);
Vue.component('our-country-selector', CountryList);
Vue.component('our-side-navbar', SideNavigation);
Vue.component('our-politician', Politician);
Vue.component('our-modal', Modal);

export default {
  Navigation,
};
