"use strict";

import Vue from 'vue';
import API from '../api/index'

Plugin.install = function (Vue) {
  Vue.axios = API;
  window.axios = API;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return API;
      }
    },
    $axios: {
      get() {
        return API;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
