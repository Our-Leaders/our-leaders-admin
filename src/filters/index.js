import Vue from 'vue';
import moment from 'moment';
import numeral from 'numeral';

Vue.filter('numberFormat', (value) => {
  if (parseInt(value / 1000, 10) >= 100) {
    return numeral(value).format('0a');
  }

  if (parseInt(value / 1000, 10) > 1) {
    return numeral(value).format('0,0');
  }

  return value;
});

Vue.filter('dateTimeFormat', value => moment(value).format('DD MMM, YYYY hh:mma'));

Vue.filter('camelCaseSeperator', value => value.replace(/(?=[A-Z])/gm, ' '));
