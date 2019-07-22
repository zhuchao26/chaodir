<template>
  <div id="show">
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in [1,2,3,4]" :key="index">
          <img :src="showData.bannerImg+item+'.jpg'" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="information-zw ng-binding" v-text="showInfo.Name"></div>
    <div class="am-u-sm-12 clplr bgw mt4" style="height:2.9333rem">
      <div class="cake-info-datum">
        <div class="am-u-sm-12 clplr cake-info-datum-list cake-info-datum-a">
          <div class="cake-info-left qfc">甜度</div>
          <div class="cake-info-right hfc">
            <img style="vertical-align: top; width: 22.4vw; margin-top: 0.6vw;" :src="imgs" />
          </div>
        </div>
        <div class="am-u-sm-12 clplr cake-info-datum-list cake-info-datum-b">
          <div class="cake-info-left qfc">口味</div>
          <div class="cake-info-right hfc ng-binding" v-text="showInfo.CategoryName"></div>
        </div>
        <div class="am-u-sm-12 clplr cake-info-datum-list cake-info-datum-c">
          <div class="cake-info-left qfc">原材料</div>
          <div class="cake-info-right hfc ng-binding" v-text="showInfo.Resourse"></div>
        </div>
        <div class="am-u-sm-12 clplr cake-info-datum-list cake-info-datum-d">
          <div class="cake-info-left qfc">适合人群</div>
          <div class="cake-info-right hfc ng-binding">所有人群</div>
        </div>
        <div class="am-u-sm-12 clplr cake-info-datum-list cake-info-datum-e">
          <div class="cake-info-left qfc">保鲜条件</div>
          <div class="cake-info-right hfc ng-binding" v-text="showInfo.KeepFresh"></div>
        </div>
      </div>
    </div>
    <div class="pj">
      <div class="pj-l">
        <div class="left">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" />
          <div class="right">商品评价</div>
        </div>
      </div>
      <div class="pj-r">
        <div class="right">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" />
        </div>
        <div class="left qfc ng-binding">(114条)</div>
      </div>
    </div>
    <div v-if="isShowDate">
      <div class="Size">
        <div class="Size-la"
          v-for="(item,index) in showTypes"
          :key="index"
          :class="{'active':index==iindex}"
          @click="selSize(item,index)"
        >{{item.Size}}</div>
      </div>
      <div class="Info">
        <div class="Info-a">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png" alt="" srcset="">
          </div>
          <div class="right" v-text="data[iindex][0]"></div>
        </div>
        <div class="Info-b">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt="" srcset="">
          </div>
          <div class="right" v-text="data[iindex][1]"></div>
        </div>
        <div class="Info-a">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt="" srcset="">
          </div>
          <div class="right" v-text="data[iindex][2]"></div>
        </div>
        <div class="Info-b">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt="" srcset="">
          </div>
          <div class="right" v-text="data[iindex][3]"></div>
        </div>
      </div>
    </div>
<div class="number">
  <div class="number-l">购买数量</div>
  <div class="number-r">
    <div @click="dev" style="margin:0 .433rem">-</div>
      {{num}}
    <div @click="num++" style="margin:0 .433rem">+</div>
  </div>
</div>
<div class="button">
<div>
        <h1 class="Allprice">{{num*showSize.CurrentPrice}}</h1>
      </div>
      <div class="gou" @click="addCart()">立即购买</div>
      <div class="mai" @click="addCart()">加入购物车</div>
    </div>
</div>
      
</template>

<script>
export default {
  data() {
    return {
      routeData: [], //传来的数据.自己写的
      showData: {}, //用来装轮播图的图片路径
      initData: "", //接口传来的数据
      showInfo: {}, //展示出来的数据
      showTypes: [], //可以展出的种类,可能没有就是获得数据的第一条,多条那就取第一条展示
      isShowDate: false, //一开始为false,是不显示,获得数据之后变为true,确保有数据展示,解决异步问题
      showSize: {}, //大小,展示出来的
      num: 1, //
      sizeNum: 0, //该大小的价格.
      imgs: "" ,
      data:[
        ['13.5*13.5cm','适合4-5人分享','含五人份餐具','至少需提前一天预约'],
        ['17*17cm','适合8-10人分享','含十人份餐具','至少需提前一天预约'],
        ['21*21cm','适合12-15人分享','含十五人份餐具','至少需提前一天预约'],
        ['27*40.5cm','适合35-40人分享','含四十人份餐具','至少需提前一天预约']
      ],
      iindex:0,
    };
  },
  created() {
    // console.log(this.$route);
    // console.log()
    this.routeData = this.$route.query;
    // showData
    this.pageInit();
  },
  methods: {
    dev(){
      if (this.num<=1) {
        this.num=2;
      }
      this.num--;
    },
    pageInit() {
      // banner图片设置
      this.showData.bannerImg = this.setImg(this.routeData.SupplyNo);
      // console.log(this.showData);
      // console.log(this.initData);
      // this.imgs(this.showInfo.CakeType[0].Sweet)
      // console.log(this.showInfo)
    },
    setsweet(data) {
      // https://res.bestcake.com/m-images/ww/jz/tiandu_3.png
      let set = "https://res.bestcake.com/m-images/ww/jz/tiandu_";
      this.imgs = set + `${data}.png`;
    },
    _getShowData(data, callback) {
      this.$apis.getinfo(data).then(res => {
        // 取到所有的数据   数据类型有两种  ksk {}    ns []
        callback(res.data.Tag);
      });
    },
    addCart() {
      let temp = {
        City: this.$store.state.city,
        SupplyNo: this.$route.query.SupplyNo,
        Name: this.showInfo.Name,
        id:this.showTypes[this.sizeNum].Id,// size ID
        CurrentPrice: this.showTypes[this.sizeNum].CurrentPrice,
        num:this.num
      };
      // console.log(temp)
      return;
      this.$store.commit("add",temp)
      
    },
    setImg(No) {
      let path = "https://res.bestcake.com/m-images";
      // xx-detail/Name/Name-=   1~4.jpg
      // console.log(No)
      if (No.indexOf("KSK") != -1) {
        // "https://res.bestcake.com/m-images/jd-detail/浓情花意/浓情花意-"
        let data = {
          City: this.routeData.City,
          ProName: this.routeData.Name,
          c: "Product",
          m: "GetCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
          console.log(this.initData);
        });
        return (
          path + `/jd-detail/${this.routeData.Name}/${this.routeData.Name}-`
        ); //1~4.jpg
      } else if (No.indexOf("NS") != -1) {
        // "https://res.bestcake.com/m-imagesjd-detail/浓情花意/浓情花意-"

        let data = {
          Name: this.routeData.Name,
          c: "NsCakeCenter",
          m: "GetNSCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
          console.log(this.initData);
        });

        return (
          path + `/ns-detail/${this.routeData.Name}/${this.routeData.Name}-`
        ); //1~4.jpg
      } else if (No.indexOf("JZ") != -1) {
        // "https://res.bestcake.com/m-imagesjd-detail/浓情花意/浓情花意-"
        let data = {
          City: this.routeData.City,
          ProName: this.routeData.Name,
          c: "IndexCenter",
          m: "GetjzCakeInfo",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
          console.log(this.initData);
        });

        return (
          path + `/jz-detail/${this.routeData.Name}/${this.routeData.Name}-`
        ); //1~4.jpg
      } else if (No.indexOf("RP") != -1) {
        // "https://res.bestcake.com/m-imagesjd-detail/浓情花意/浓情花意-"
        let data = {
          Name: this.routeData.Name,
          c: "NsCakeCenter",
          m: "GetRuPCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
          console.log(this.initData);
        });
        return (
          path + `/rp-detail/${this.routeData.Name}/${this.routeData.Name}-`
        ); //1~4.jpg
      }
    },
    selSize(i, n) {
      this.showSize = i;
      this.iindex=n;
      this.sizeNum = n;
      // console.log(this.showSize)
    }
  },
  watch: {
    initData() {
      if (this.initData.length) {
        this.initData.map(item => {
          if (this.routeData.City == item.City) {
            this.showTypes.push(item);
          }
        });
        if (this.showTypes.length == 0) {
          this.showTypes[0] = this.initData[0];
        }
        this.showInfo = this.showTypes[0];
        this.isShowDate = true;
      } else {
        this.showTypes = this.initData.infos.CakeType;
        this.showInfo = this.initData.infos;
        this.isShowDate = true;
      }
      this.selSize(this.showTypes[0], 0);
      this.setsweet(this.showInfo.CakeType[0].Sweet);
      // console.log(this.showTypes);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#show {
  // background-color: #eee;
  .banner {
    height: r(445);
    img {
      width: 100%;
      height: auto;
    }
  }
  .information-zw {
    line-height: 4.53vw;
    font-weight: bold;
    color: #333;
    font-size: 4.53vw;
    margin-top: 2vw;
    margin-bottom: 4vw;
    text-align: center;
  }
  .Size{
    width:100%;
    margin-top: r(20);
    overflow: hidden;
    .active{
      background-color: #02d3d6;
      color:#fff;
      border-radius: 2px;
      border: 1px solid #02d3d6;
    }
    .Size-la{
      float: left;
      border: 1px solid #aaa;
      padding: 0 r(13);
      margin-left: r(15);
      height: r(28);
      display: flex;
      align-items: center;
    }
  }
  .pj {
    width: 100%;
    height: r(32);
    padding: r(10) 0;
    margin-top: r(15);
    .pj-l {
      float: left;
      padding-left: r(15);
      width: 30%;
      .right {
        float: right;
      }
      .left {
        float: left;
        img {
          height: r(17);
          width: r(21);
        }
      }
    }
    .pj-r {
      float: right;
      padding-right: r(15);
      width: 30%;
      .right {
        float: right;
        img {
          height: r(17);
          width: r(21);
        }
      }
      .left {
        float: left;
      }
    }
  }
  .number{
    width: 100%;
    height: r(32);
    padding: r(10) 0;
    margin-top: r(15);
    .number-l{
      padding-left: r(15);
      float: left;
      width: 30%;
      font-size: r(16);
      line-height: r(24);
    }
    .number-r{
      padding-right: r(15);
      float: right;
      width: 30%;
      display: flex;
      align-content: space-around;
      font-size: r(16);
      line-height: r(24);
      
    }
  }
  .button{
    position: fixed;
    background-color: white;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    height: r(55);
    .Allprice{
      position: fixed;
      color: #f2495e;
      font-size: r(27);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      bottom: r(20);
      padding-left: r(15);
    }
    .gou{
      box-sizing: border-box;
      height: 100%;
      padding: r(15) 0;
      font-size: r(16);
      line-height: r(26);
      float: right;
      width: 30%;
      text-align: center;
      background-color: #02d3d6;
      color: #fff;
    }
    .mai{
      box-sizing: border-box;
      height: 100%;
      padding: r(15) 0;
      font-size: r(16);
      float: right;
      line-height: r(26);
      width: 30%;
      text-align: center;
    }
  }
  .Info{
    overflow: hidden;
    margin-top: r(43);
    .Info-a{
      height: r(24);
      float: left;
      padding-left: r(15);
      width: 43%;
      .right {
        float: left;
        margin-left: r(5);
      }
      .left {
        float: left;
        img {
          height: r(20);
          width: r(20);
        }
      }
    }
    .Info-b{
      height: r(24);
      float: left;
      padding-right: r(15);
      width: 43%;
      .right {
        float: left;
        margin-left: r(5);
      }
      .left {
        float: left;
        img {
          height: r(20);
          width: r(20);
        }
      }
    }  
  }
}
</style>