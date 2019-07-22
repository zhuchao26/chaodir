<template>
  <div id="app">
         <router-view />
         <div id="cheng"></div>
    <item1 v-show="$route.path!='/show'"></item1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
      this.$eventHub.$on("test",(res)=>{
        alert(res);
      });
  },
  components:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#app{
  width:r(375);
  height:100%;
  #cheng{
    height:r(53)
  }
}
</style>
