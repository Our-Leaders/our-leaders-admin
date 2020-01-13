/**
 * Created by bolor on 1/13/2020
 */

import StringUtil from '../helpers/stringUtil';

export const notificationActions = {
  displayError(context, data) {
    context.commit('showError', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  displayInfo(context, data) {
    context.commit('showInfo', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  displaySuccess(context, data) {
    context.commit('showSuccess', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
};

export const notificationMutations = {
  hideMessage(state) {
    state.info.display = false;
  },
  showError(state, data) {
    state.info.header = 'Error';
    state.info.details = StringUtil.getErrorText(data);
    state.info.type = 'error';
    state.info.display = true;
  },
  showInfo(state, data) {
    state.info.header = 'Warning!';
    state.info.details = data.message;
    state.info.type = 'info';
    state.info.display = true;
  },
  showSuccess(state, data) {
    state.info.header = 'Success!';
    state.info.details = data.message;
    state.info.type = 'success';
    state.info.display = true;
  },
};
