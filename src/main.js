import Vue from 'vue'
import App from './App.vue'
import VueLogger from 'vuejs-logger';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.config.productionTip = false

const isProduction = process.env.NODE_ENV === 'production';
const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);

Vue
new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
