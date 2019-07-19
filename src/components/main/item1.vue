<template>
   <mt-tabbar v-model="selected" :fixed="true">
  <mt-tab-item v-for="(item,index) in routerList" 
  :key="index" :id="'box'+index"
  @click.native="sel(index)" 
  :class="{'is-selected':cindex==index}">
  <i :class="item.className" ></i>
  {{item.name}}
    
  </mt-tab-item>
</mt-tabbar>
</template>

<script>
export default {
  data () {
    return {
      selected:"",
      routerList: [
        { path: "/index", name: "首页" ,className:'fa fa-hand-peace-o fa-lg '},
        { path: "/goods", name: "分类",className:'fa fa-ambulance fa-lg ' },
        { path: "/shop", name: "购物车",className:'fa fa-truck fa-lg ' },
        { path: "/my", name: "我的",className:'fa fa-user-o fa-lg ' }
      ],
      cindex:0
    }
  },
  methods:{
    sel(index){
      this.cindex=index;
      this.$router.push(this.routerList[index].path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
