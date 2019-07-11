export default (Vue) => {
    Vue.directive("test", (el, binding, vnode) => {
        el.onclick = function () {
            alert("自定义指令触发");
        }
    })
  
}