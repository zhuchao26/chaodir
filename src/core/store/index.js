import Vuex from "vuex";
import Vue from "vue";
import apis from "@/core/api"
import {
  Indicator,
  MessageBox
} from 'mint-ui';
import store from 'storejs';
Vue.use(Vuex);
// Vuex作用是什么? 全局状态管理

//理解为 组件内部  data 属性
const state = {
  city: "上海",
  cartList: []
}
//定义  methods 同步方法   视图调用     this.$store.commit("xxxx",val)
const mutations = {
  // 没有第三个参数
  add(state, data) {
    let flag = true;
    if (state.cartList.length != 0) {
      state.cartList.map(item => {
        if (item.id == data.id) {
          if (data.mark == "show") {
            item.num = item.num + data.num;
            flag = false;
            return;
          }
          item.num++;
          flag = false;
        }
      })
    }
    if (flag) {
      data.num = data.num || 1
      state.cartList.push(data)
    }
    store.set("cartList", state.cartList)
  },
  vuexInit(state) {
    if (store.get("cartList")) {
      state.cartList = store.get("cartList");
      // console.log(state.cartList)
    }
  },
  alt(state) {
    MessageBox.confirm('是否删除此商品?').then(action => {
      store.remove(infoList);
      state.cartList.map((it, i) => {
        if (it.num == 0) {
          state.cartList.splice(i, 1)
        }
      })
      store.set(infoList, state.cartList)
    });
  }
}
// 定义 compunted  属性计算
const getters = {
}
// --------------
//定义 异步方法 通用接口调用    视图调用     this.$store.dispatch("xxxx",val)
const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
