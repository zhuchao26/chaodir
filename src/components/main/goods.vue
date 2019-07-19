<template>
  <div id="goods">
    <div>
      <button @click="sel(1)">自营</button>
      <button @click="sel(2)">贝斯严选</button>
    </div>
    <div v-if="cindex==1">
      <button v-for="(item,index) in tabList" :key="index" @click="sec(index)">{{item}}</button>
    </div>
    <div v-if="cindex==2">
      <button v-for="(item,index) in tabList2" :key="index">{{item}}</button>
    </div>
    <div style="overflow: hidden;">
      <div v-for="(item,index) in cakelist" :key="index" class="list-product-tab">
        <a >
          <div class="list-product-a">
            <img :src="item.ImgUrl" style="width:100%;height:auto" @click="toPath(item)">
          </div>
        </a>
        <div class="list-product-b"><span v-text="item.Name"></span></div>
        <div class="list-product-c"><span v-text="item.Means"></span></div>
        <div class="list-product-d" style="font-size: 0px;">
          <span style="color: rgb(255, 51, 0); font-size: 3.2vw; padding-left: 2vw;">￥</span>
           <span style="color: rgb(255, 51, 0); font-size: 4.267vw;" v-text="item.CurrentPrice"></span>
            <span style="color: rgb(255, 51, 0); font-size: 3.2vw;">.00</span> 
            <span style="color: rgb(188, 188, 188); font-size: 3.2vw; margin-left: 1.067vw;" v-text="item.Size"></span>
            </div>
            <div class="list-product-e">
          <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" class="am-img-responsive">
        </div>
      </div>
        
      
    </div>
    
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      cakelist: [],
      tabList: ["经典", "女神", "伴手礼"],
      tabList2: ["乳品"],
      nvshen: [],
      jingdian: [],
      bsl: [],
      rp: [],
      cindex: 1
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    sel(data) {
      this.cindex = data;
      this.cakelist=this.jingdian;
      if (data==2) {
        this.cakelist=this.rp;
      }
    },
    sec(data){
      console.log("ok")
      if (data==1) {
        this.cakelist=this.nvshen;
      }else if (data==2) {
        this.cakelist=this.bsl;
      }else if (data==0) {
        this.cakelist=this.jingdian;
      }
    },
    toPath(item) {
      // console.log(item.Id||item.ID);
      // return;
      this.$router.push({
        path: "/show",
        query: {
          City: this.$store.state.city,
          SupplyNo: item.SupplyNo,
          Name: item.Name,
          id: item.ID
        }
      });
    },
    
    pageInit() {
      this.getinfoData(res => {
        res.map((it, index) => {
          if (it.SupplyNo.indexOf("NS") != -1) {
            it.ImgUrl =
              "https://res.bestcake.com/m-images/ww/ns/" + it.Name + ".jpg";
            this.nvshen.push(it);
          } else if (it.SupplyNo.indexOf("KSK") != -1) {
            it.ImgUrl =
              "https://res.bestcake.com/m-images/ww/jd/" + it.Name + ".png";
            this.jingdian.push(it);
          } else if (it.SupplyNo.indexOf("JZ") != -1) {
            it.ImgUrl =
              "https://res.bestcake.com/m-images/ww/jz/" + it.Name + ".png";
            this.bsl.push(it);
          } else if (it.SupplyNo.indexOf("RP") != -1) {
            it.ImgUrl =
              "https://res.bestcake.com/m-images/ww/rp/" + it.Name + ".jpg";
            this.rp.push(it);
          }
        });
        this.cakelist=this.jingdian;
        console.log(this.cakelist)
        // this.cakelist.push(this.jingdian)
        // this.cakelist.push(this.nvshen)
        // this.cakelist.push(this.bsl)
        // this.cakelist.push(this.rp)
        // console.log(this.cakelist)
        // this.cakelist = res;
      });
    },
    getinfoData(call) {
      this.$apis.getIninfoData().then(res => {
        call(res.data.Tag.cakelist);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#goods{

  .list-product-tab:nth-child(2n+1) {
    margin-right: 8.8vw;
}
  .list-product-tab {
    width: r(165);
    float: left;
    position: relative;
    margin-bottom: r(20);
    .list-product-a {
    width: r(165);
    height: r(165);
}
.list-product-b {
    margin-top: 1.867vw;
    line-height: 3.734vw;
    span {
    font-size: 3.734vw;
    color: #333;
    padding-left: 2vw;
}
}
.list-product-c {
    width: 40vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 5vw;
    span {
    font-size: 3.2vw;
    color: #999;
    padding-left: 2vw;
}
}
.list-product-e {
    width: 5.334vw;
    height: 5.334vw;
    position: absolute;
    right: 0vw;
    bottom: 1vw;
    .am-img-responsive {
    display: block;
    max-width: 100%;
    height: auto;
}
}
}
  
}
</style>
