import directive from '@/core/directive'
import commonTemp from '@/components/commonTemp'
import global from "@/core/global"
import apis from "@/core/api"

export default (Vue) => {
    directive(Vue);
    commonTemp(Vue);
    Vue.prototype.$global=global;
    Vue.prototype.$apis=apis;
}
