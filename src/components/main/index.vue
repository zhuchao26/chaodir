<template>
  <div id="index">
    <div class="location clear-both">
      <div class="float-l clear-both">
        <img
          src="https://res.bestcake.com/images/newIndex/localtion.png"
          class="locImg float-l locImg2"
        />
        <span class="color3 fs14 float-l locImgr text-over addres">上海</span>
        <img src="https://res.bestcake.com/images/newIndex/more.png" class="locEnt float-l locImgr" />
      </div>
    </div>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in SwiperBannerList" :key="index">
          <img :src="item.ImgUrl" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <img src="https://res.bestcake.com/images/newIndex/title.png?v=1" style="width:100%" />
    <img
      src="https://res.bestcake.com/images/newindex/tusi.gif"
      style="width:9.14667rem; margin-left:0.42667rem"
    />
    <div class="clear-both iconList">
      <div
        v-for="(item,index) in TopIconList"
        :key="index"
        class="iconList-item float-l"
        :style="'margin-right:'+item.margin+'rem'"
      >
        <a href="#">
          <img :src="item.ImgUrl" class="iconList-item-img" />
          <div class="fs12 color3 iconList-item-name">{{item.ActName}}</div>
        </a>
      </div>
    </div>
    <div class="broadcast" style>
      <div class="broadcastB fs12 colorf float-l">通知</div>
      <div class="broadcastTexts float-r">
        <div class="fs14 text" v-text="NoticeList">​</div>
      </div>
    </div>
    <div class="special clear-both">
      <div
        v-for="(item,index) in CenterContentList"
        :key="index"
        class="float-l special-item"
        :style="'margin-right:'+item.margin+'rem'"
      >
        <a>
          <img :src="item.ImgUrl" alt srcset class="specialImg" />
        </a>
      </div>
    </div>
    <div v-for="(it,i) in CakeList" :key="i">
      <div class="box-header">
        <a>
          <img
            class="box-header-img"
            :src="infoImg[i]"
            lazy="loaded"
          />
        </a>
      </div>
      <swiper  v-if="CakeList.length!=0">
        <div class="swiper-slide" v-for="(item,index) in CakeList[i]" :key="index">
          <div>
            <img :src="item.ImgUrl" style="width: 3.2rem;height:3.2rem;">
            <div class="small-box-item-name color3 fs14" v-text="item.Name"></div>
            <div class="small-box-item-info"><span class="colorcc2 fs16">
              <span class="fs14" style="margin: 0px -2px;">￥
                </span>{{item.Price}}</span> <span class="color9 fs14">
                  <span style="margin-right: 2px; margin-left: -2px;">/
                    </span>{{item.Size}}</span></div>
          </div>
          
      </div>
      </swiper>
    </div>

  </div>
</template>
<script>

export default {
  data() {
    return {
      SwiperBannerList: [],
      NoticeList: "",
      TopIconList: [],
      margin: [0.74, 0.74, 0.74, 0, 0.74, 0],
      margin1: [0.24, 0, 0.24, 0],
      CenterContentList: [],
      CakeList:[],
      SaleList:[],
      infoImg:[
        "https://res.bestcake.com/m-images/HotRecommend/571060506020139900.jpg",
        "https://res.bestcake.com/m-images/HotRecommend/427276281583982800.jpg",
        "https://res.bestcake.com/m-images/HotRecommend/497197919096789000.jpg"
      ]
    };
  },
  computed: {},
  mounted() {
    this.pageInit();  
  },
  methods: {
    pageInit() {
      this.getinfo(res => {
        this.SwiperBannerList = res.SwiperBannerList;
        this.NoticeList = res.NoticeList;
        this.TopIconList = res.TopIconList;
        this.TopIconList.map((item, index) => {
          item.margin = this.margin[index];
        });
        this.CenterContentList = res.CenterContentList;
        this.CenterContentList.map((item, index) => {
          item.margin = this.margin1[index];
        });
        // this.SaleList=res.SaleList
        res.SaleList.map((item)=>{
          this.CakeList.push(JSON.parse(item.CakeList))
        })
        //   this.SaleList.map((item,index)=>{
        //     JSON.parse(item.CakeList).map((it,i)=>{
        //     if (it.SupplyNo.indexOf("NS")!=-1) {
        //       it.ImgUrl="https://res.bestcake.com/m-images/ww/ns/"+it.Name+".jpg";
        //     }else if (it.SupplyNo.indexOf("KSK")!=-1) {
        //       it.ImgUrl="https://res.bestcake.com/m-images/ww/jd/"+it.Name+".png";
        //     }else if (it.SupplyNo.indexOf("JZ")!=-1) {
        //       it.ImgUrl="https://res.bestcake.com/m-images/ww/jz/"+it.Name+".png";
        //     }else if (it.SupplyNo.indexOf("RP")!=-1) {
        //       it.ImgUrl="https://res.bestcake.com/m-images/ww/rp/"+it.Name+".jpg";
        //     }
           
        // })
        //   })
        //   console.log(this.SaleList[0].CakeList)

        // this.CakeList=JSON.parse(res.SaleList.CakeList)
        this.CakeList.map((item,index)=>{
          // console.log(item)
          item.map((it,i)=>{
            if (it.SupplyNo.indexOf("NS")!=-1) {
              it.ImgUrl="https://res.bestcake.com/m-images/ww/ns/"+it.Name+".jpg";
            }else if (it.SupplyNo.indexOf("KSK")!=-1) {
              it.ImgUrl="https://res.bestcake.com/m-images/ww/jd/"+it.Name+".png";
            }else if (it.SupplyNo.indexOf("JZ")!=-1) {
              it.ImgUrl="https://res.bestcake.com/m-images/ww/jz/"+it.Name+".png";
            }else if (it.SupplyNo.indexOf("RP")!=-1) {
              it.ImgUrl="https://res.bestcake.com/m-images/ww/rp/"+it.Name+".jpg";
            }
            // console.log(it.ImgUrl)
        })
        // console.log(this.CakeList)
        })
        // console.log((res.SaleList));
      });
    },
    getinfo(call) {
      this.$apis.getIndexData().then(res => {
        call(res.data.Tag.mainresult);
      });
    }
  },
  watch: {

  },
  component:{
    // item1
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes text {
  0% {
    transform: translateX(30%);
  }

  100% {
    transform: translateX(-100%);
  }
}
#index {
  img {
  }
  width: r(375);
  height: 100%;
  .banner {
    margin: auto;
    width: r(343);
    height: r(180);
    img {
      width: r(343);
      height: r(180);
    }
  }

  .broadcast {
    height: 1.5rem;
    margin: 0 auto;
    color: #1fb1b8;
    position: relative;
    overflow: hidden;
    border-top: 0.21334rem solid #fafafa;
    border-bottom: 0.21334rem solid #fafafa;
    height: r(40);
    .broadcastTexts {
      position: relative;
      margin-right: 0.64rem;
      width: 7.84rem;
      height: 100%;
      top: 0;
      overflow: hidden;
      .text {
        height: 0.48rem;
        line-height: 0.48rem;
        position: absolute;
        top: 0.3rem;
        white-space: nowrap;
        animation: text 25s linear infinite;
      }
    }
    .broadcastB {
      width: 0.96rem;
      height: 0.48rem;
      line-height: 0.48rem;
      text-align: center;
      margin-left: 0.42667rem;
      background: #1fb1b8;
      margin-top: 0.3rem;
      border-radius: 0.10667rem;
    }
  }
  .iconList {
    padding: 0 0.6667rem;
    padding-bottom: 0.5334rem;
    .iconList-item {
      text-align: center;
      width: 1.58667rem;
      margin-right: 0.74rem;
      white-space: nowrap;
      .iconList-item-img {
        width: 1.38667rem;
        height: 1.38667rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.42667rem;
      }
      .iconList-item-name {
        margin-top: 0.29334rem;
      }
    }
  }
  .special {
    padding: 0.42667rem;
    background: #fff;
    .special-item {
      background: #f9f9f9;
      border-radius: 0.16rem;
      width: 4.4533rem;
      height: 2.6667rem;
      margin-right: 0.24rem;
      margin-bottom: 0.24rem;
      position: relative;
      overflow: hidden;
      .specialImg {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .location {
    width: 9.14667rem;
    height: 1.17334rem;
    margin: 0 auto;
    border-bottom: 2upx solid #e1e1e1;
    line-height: 1.17334rem;
    .locEnt {
      width: 0.24rem;
      height: 0.42667rem;
      margin-top: 0.37335rem;
      margin-left: 0.21334rem;
    }
  }
   .box-header {
    height: 4rem;
    position: relative;
    border-top: .21334rem solid #FAFAFA;
    .box-header-img {
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
}
}

.swiper-container {
    .swiper-slide{
      margin-top: r(12);
      // margin-left: r(12);
      margin-bottom: r(24);
      background: #fff;
      border-radius: r(7.5);
      padding: r(15) 0;
      box-shadow: 0 r(2) r(6) rgba(0,0,0,0.1);
      .small-box-item-name {
    width: 31.5vw;
    margin: 0 auto;
    height: 10.667vw;
    margin-top: 1.334vw;
    overflow: hidden;
    line-height: 5.33vw;
    font-weight: bold;
}
  }
}  

}
</style>
