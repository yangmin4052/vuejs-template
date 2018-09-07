{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue';
import App from './App';
import {api} from '@/utils/api';
{{#router}}
import router from './router';
{{/router}}
{{#vuex}}
import store from './store';
{{/vuex}}
{{#axios}}
import axios from 'axios';
{{/axios}}
{{#rem}}
import htmlSizeCalculation from '@/utils/htmlSizeCalculation';
{{/rem}}
{{#wxShare}}
import {wxShare} from '@/wxShare';
{{/wxShare}}

{{#rem}}
htmlSizeCalculation(document, window);
{{/rem}}
Vue.config.productionTip = false;
Vue.prototype.$api = api;
{{#axios}}
Vue.prototype.$axios = axios;
{{/axios}}
{{#wxShare}}
// 微信分享
router.beforeEach((to, form, next) => {
  wxShare(to.path, to.query);
  window.document.title = to.meta.title;
  next();
});
{{/wxShare}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
});
