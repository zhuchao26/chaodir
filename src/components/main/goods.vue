<template>
  <div id="goods">
    <div class="list-tabs">
      <div @click="sel(1)" class="list-tabs-a" :class="{'active':cindex==1}">自营</div>
      <div @click="sel(2)" class="list-tabs-b" :class="{'active':cindex==2}">贝斯严选</div>
      <div class="list-tabs-c">&nbsp;</div>
    </div>
    <div v-if="cindex==1" class="list-classify">
      <div v-for="(item,index) in tabList" :key="index" @click="sec(index)" :class="{'active':acti==index}" class="float-l list-classify-a">{{item}}</div>
    </div>
    <div v-if="cindex==2" class="list-classify">
      <div v-for="(item,index) in tabList2" :key="index" class="active list-classify-a">{{item}}</div>
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
            <div class="list-product-e" @click="addcart(item)">
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
      cindex: 1,
      acti:0,
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    addcart(it){
      let bool=true;
      console.log(it)
      // this.$store.state.cartList.map((item,index)=>{
      //   if (this.showTypes[this.sizeNum].Id==item.Id) {
      //     console.log(11)
      //     item.num+=this.num;
      //     bool=false;
      // }
      // })
      // if (bool) {
      //   this.showTypes[this.sizeNum].num=this.num||1;
      //   this.$store.state.cartList.push(this.showTypes[this.sizeNum])
      //   console.log(this.$store.state.cartList)
      // }
    },
    sel(data) {
      this.cindex = data;
      this.cakelist=this.jingdian;
      if (data==2) {
        this.cakelist=this.rp;
      }
    },
    act(data) {
      this.acti = data;
    },
    sec(data){
      this.act(data)
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
  .list-tabs {
    .active {
    color: #1db0b8;
}
    position: relative;
    height: 9.33vw;
    border-bottom: 1px solid #d9d9d9;
    height: 12vw;
    .list-tabs-a {
    width: 50%;
    float: left;
    font-size: 4.266vw;
    text-align: center;
    height: 8.533vw;
    height: 13vw;
    line-height: 12vw;
}
.list-tabs-b {
    width: 50%;
    float: right;
    font-size: 4.266vw;
    text-align: center;
    height: 8.533vw;
    height: 13vw;
    line-height: 12vw;
}
.list-tabs-c {
    width: 50%;
    height: 0.533vw;
    background: #1db0b8;
    position: absolute;
    bottom: 0;
    transition: left 0.35s;
}
.list-tabs-b.active ~ .list-tabs-c {
    right: 0;
}
.list-tabs-a.active ~ .list-tabs-c {
    left: 0;
}

}
.list-classify {
    margin-top: 7.466vw;
    height: 5.8667vw;
    position: relative;
    display: flex;
    justify-content: center;
    .active {
    font-size: 4.266vw;
    font-weight: bold;
    border-bottom:#1db0b8 solid 2px;
}
.list-classify-a {
    margin-right: r(20)
}
}

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
    height: 3.334vw;
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
