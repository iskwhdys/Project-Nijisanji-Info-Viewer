import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_ID,
  router,
});
