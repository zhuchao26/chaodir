import item1 from "@/components/main/item1"
import swiper from "@/components/layout/swiper"
import { Button } from 'mint-ui'
import { Swipe, SwipeItem } from 'mint-ui';
import { Tabbar, TabItem ,Cell ,Checklist ,Field} from 'mint-ui';


export default (Vue)=>{
     Vue.component("item1",item1);
     Vue.component("mint_btn",Button);
     Vue.component(Swipe.name, Swipe);
     Vue.component(SwipeItem.name, SwipeItem);
     Vue.component(Tabbar.name, Tabbar);
     Vue.component(TabItem.name, TabItem);
     Vue.component("swiper",swiper);
     Vue.component(Checklist.name, Checklist);
	Vue.component(Cell.name, Cell);
	Vue.component(Field.name, Field);
}