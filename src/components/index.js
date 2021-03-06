import Vue from 'vue';

import Tab from './Tabs.vue';
import Alert from './Alert.vue';
import TextEditor from './TextEditor.vue';
import Navigation from './Navigation.vue';
import AdminDetails from './AdminDetails.vue';
import CountryList from './CountrySelector.vue';
import SideNavigation from './SideNavigation.vue';
import Politician from './Politician.vue';
import Modal from './Modals/Modal.vue';
import CareerComponent from './CareerComponent.vue';
import ModalManager from './Modals/ModalManager.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import DropdownItem from './Dropdown/DropdownItem.vue';
import DropdownDivider from './Dropdown/DropdownDivider.vue';
import PoliticalParty from './Politicalparty.vue';
import NewEditAccomplishment from './NewEditAccomplishment.vue';
import ImageUploader from './ImageCrop.vue';
import DateRangePicker from './DateRangePicker.vue';

// charts for analytics
import Line from './charts/LineChart.vue';
import Map from './charts/MapChart.vue';

Vue.component('our-tabs', Tab);
Vue.component('our-alert', Alert);
Vue.component('our-career', CareerComponent);
Vue.component('our-text-editor', TextEditor);
Vue.component('our-admin-details', AdminDetails);
Vue.component('our-country-selector', CountryList);
Vue.component('our-side-navbar', SideNavigation);
Vue.component('our-politician', Politician);
Vue.component('our-party', PoliticalParty);
Vue.component('our-modal', Modal);
Vue.component('our-line-chart', Line);
Vue.component('our-map', Map);
Vue.component('our-modal-manager', ModalManager);
Vue.component('our-dropdown', Dropdown);
Vue.component('our-dropdown-item', DropdownItem);
Vue.component('our-dropdown-divider', DropdownDivider);
Vue.component('our-accomplishment', NewEditAccomplishment);
Vue.component('our-image-crop', ImageUploader);
Vue.component('our-daterange-picker', DateRangePicker);

export default {
  Navigation,
};
