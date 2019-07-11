import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
Vue.use(Router)
const ruoters=new Router({
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
console.log(ruoters)
ruoters.beforeEach((to,from,next)=>{
  console.log(to.path)
  if(to.path=="/"){
    if(location.search.indexOf("news")!=-1){
      next({path:"/news"});
    }else if(location.search.indexOf("info")!=-1){
      next({path:"/info"});
    }else if(location.search.indexOf("test")!=-1){
      next({path:"/test"});
    }else{
      next(); 
    }
  }else{
    next();  //前往下一个路由
  }
})
export default ruoters
ruoters.afterEach((to,from)=>{
  console.log("跳转之后执行")
})
