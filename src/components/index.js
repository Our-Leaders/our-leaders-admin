import Vue from 'vue';

import Alert from './Alert.vue';
import Navigation from './Navigation.vue';
import CountryList from './CountrySelector.vue';
import SideNavigation from './SideNavigation.vue';
import Politician from './Politician.vue';
import Modal from './Modal.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import DropdownItem from './Dropdown/DropdownItem.vue';
import DropdownDivider from './Dropdown/DropdownDivider.vue';

Vue.component('our-alert', Alert);
Vue.component('our-country-selector', CountryList);
Vue.component('our-side-navbar', SideNavigation);
Vue.component('our-politician', Politician);
Vue.component('our-modal', Modal);
Vue.component('our-dropdown', Dropdown);
Vue.component('our-dropdown-item', DropdownItem);
Vue.component('our-dropdown-divider', DropdownDivider);

export default {
  Navigation,
};
