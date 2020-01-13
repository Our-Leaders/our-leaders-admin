/**
 * Created by bolorundurowb on 13/01/2020
 */

import instance from './services';

const resource = '/pages';

export default {
  getPages() {
    return instance.get(resource);
  },
};
