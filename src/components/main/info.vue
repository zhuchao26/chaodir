<template>
  <div class="hello">
    <h1>info</h1>
  </div>
</template>
<script>
export default {
  name: 'info',
  data() {
    return {
      
    }
  },
  mounted(){
    // console.log(this.$apis.getItem())
    this.$apis.getItem()
  }
}
</script>
