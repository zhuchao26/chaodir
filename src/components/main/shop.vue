<template>
  <div>
    我是购物车
    <div v-if="cartList">
      <div v-for="(item,index) in cartList" :key="index">
      <h1>{{item.Name}}</h1>
      <p>{{item.num}}</p>
    </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartList:[],
    };
  },
  mounted() {
   this.cartList=this.$store.state.cartList;
  },
  computed: {
   
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
