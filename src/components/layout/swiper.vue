<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
    <slot></slot>
    </div>
</div>
  </div>
</template>

<script type="text/javascript">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-container {
    width: 100%;
    height: auto;
}  
</style>
<script>        
export default {
  data () {
    return {
     
    }
  },
  mounted(){
    this.$nextTick(()=>{
    this.pageInit();

    })
  },
  methods:{

    pageInit(){
        new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            slidesPerView :3,
            freeMode : true,
            spaceBetween : 15,
        });
    }
  }
}      
  </script>
