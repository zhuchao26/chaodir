<template>
  <div class="hello">
    <div>
      <ul>
        <li v-for="(i,d) in msg" :key="d" @click="a"><router-link :to="i">{{i.substr(1)}}</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      msg: [
        '/info', '/news', '/test'
      ]
    }
  },
  methods: {
    a () {
      console.log(this.msg)
    }
  }
}
</script>
<style>
  li{
    float: left;
    list-style: none;
    padding-right: 10px;
  }
  ul{
    height: 20px;
    border: 1px solid red;
  }
</style>
