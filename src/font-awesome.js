import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBold,
  faItalic,
  faUnderline,
  faParagraph,
  faArrowRight,
  faHeading,
  faListOl,
  faListUl,
  faTrash,
  faArchive,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBold,
  faArchive,
  faTrash,
  faItalic,
  faUnderline,
  faParagraph,
  faArrowRight,
  faHeading,
  faListOl,
  faListUl);

Vue.component('fa-icon', FontAwesomeIcon);
