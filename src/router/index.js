import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: resolve => require(['@/components/home'], resolve),
    children: [{
      path: 'info',
      name: 'info',
      component: resolve => require(['@/components/main/info'], resolve)
    },
    {
      path: 'news',
      name: 'news',
      component: resolve => require(['@/components/main/news'], resolve),
      redirect: 'news/guonei',
      children: [{
        path: 'guonei',
        name: 'guonei',
        component: resolve => require(['@/components/main/guonei'], resolve)
      },
      {
        path: 'guowai',
        name: 'guowai',
        component: resolve => require(['@/components/main/guowai'], resolve)
      }
      ]
    },
    {
      path: 'test',
      name: 'test',
      component: resolve => require(['@/components/main/test'], resolve)
    }
    ]
  }]
})
