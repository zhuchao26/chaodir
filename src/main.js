import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
/* eslint-disable no-new */
import core from '@/core/core.config'
//core.里面暴露一个函数
Vue.use(core);//通过use把core里所有的东西传入所有的vue实例中
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
