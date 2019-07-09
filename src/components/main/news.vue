<template>
  <div class="hello">
    <ul>
      <li v-for="(i,d) in news" :key="d" @click="b"><router-link :to="i">{{i}}</router-link></li>
    </ul>
    <h1>news</h1>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'news',
  data () {
    return {
      news: [
        'guonei', 'guowai'
      ]
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    b () {
      console.log(this.news)
    }
  }
}
</script>
