import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './assets/css/fonts/linecons/css/linecons.css'
import './assets/css/fonts/fontawesome/css/font-awesome.min.css'
import './assets/css/bootstrap.css'
import './assets/css/xenon-core.css'
import './assets/css/xenon-components.css'
import './assets/css/xenon-skins.css'
import './assets/css/nav.css'


// axios.defaults.baseURL='/api'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.request.use(function(config) {
  // 从 localStorage 获取存储的 token,account,password
  const token = localStorage.getItem('token');
  const account = localStorage.getItem('account');
  const password = localStorage.getItem('password');
  // 将账号和密码作为 querystring 参数传递给后端
  config.params = {
    account,
    password
  };
  // 将 token 添加到请求的 Header 中
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
},

function(error) {
  return Promise.reject(error);
});