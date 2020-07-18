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

Vue.filter('currencyFormat', value => numeral(value).format('0,0'));

Vue.filter('dateTimeFormat', value => moment(value).format('DD MMM, YYYY hh:mma'));

Vue.filter('camelCaseSeperator', value => value.replace(/(?=[A-Z])/gm, ' '));

Vue.filter('dateFormat', (value, seperator = ' ') => moment(value).format(`DD${seperator}MM${seperator}YYYY`));

Vue.filter('shortDateFormat', value => moment(value).format('MMM DD YYYY'));

Vue.filter('age', value => moment().diff(moment(value), 'year'));
