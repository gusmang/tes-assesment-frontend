import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import RichTextEditor from 'rich-text-editor-vuetify'
Vue.use(RichTextEditor)

import JsonExcel from "vue-json-excel";
 
Vue.component("downloadExcel", JsonExcel);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


