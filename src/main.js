// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VCharts from 'v-charts'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import $ from 'jquery'     //引入jquery
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

import Vac from './libs/vac-functions.es'
Vue.config.productionTip = false
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import {SessionStorage} from 'wii-fe-utils'
import moment from 'moment'
import store from './store/index'
import VueBus from 'vue-bus'
import page from './components/page/index.js'
import vueDragSelectPro from 'vue-drag-select-pro'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css';
// 注意：一定要引入css样式
import 'vue-drag-select-pro/lib/vueDragSelectPro.css'

Vue.config.productionTip = false
Vue.use(vueDragSelectPro)
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(moment)
Vue.use(VueBus)
Vue.use(page)
Vue.use(contentmenu);
Vue.component('mavon-editor', mavonEditor)
window.activeMenu;

// 路由钩子
let loadingInstance = null
router.beforeEach((to, from, next) => {
  window.activeMenu = (to.meta && to.meta.parent) ? to.meta.parent : to.name;
  if(to.meta && to.meta.noRequiresAuth){
    next()
  }
  else{
    if(SessionStorage.get('userId')) { //需要校验的key
      next()
    }else{
      next('/login')
    }
  }

  if(to.meta && to.meta.requiresAuth) {//如果需要登录校验，在路由处配置
    if(SessionStorage.get('user')) { //需要校验的key
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
});
router.afterEach((to, from) => {
  // loadingInstance.close()
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
