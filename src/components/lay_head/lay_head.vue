<template>
    <div>
        <ul>
            <li v-for="(item,index) in msg" :key="index">
                <router-link to="item" key="index"></router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'lay_head',
  data () {
    return {
      msg: ['name', 'info', 'news', 'test']
    }
  }
}
</script>
