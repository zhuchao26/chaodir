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
    <div class="content" v-if="isShowDate">
      <button
        v-for="(item,index) in showTypes"
        :key="index"
        @click="selSize(item,index)"
      >{{item.Size}}</button>
      <div>
        <button @click="num++">+</button>
        {{num}}
        <button>-</button>
      </div>
      <button @click="addCart()">加入购物车</button>
      <div>
        <h1>价格:{{num*showSize.CurrentPrice}}</h1>
      </div>
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
      sizeNum: 0 //该大小的价格.
    };
  },
  created() {
    console.log(this.$route);
    // console.log()
    this.routeData = this.$route.query;
    // showData
    this.pageInit();
  },
  methods: {
    pageInit() {
      // banner图片设置
      this.showData.bannerImg = this.setImg(this.routeData.SupplyNo);
      // console.log(this.showData);
      console.log(this.initData);
    },
    _getShowData(data, callback) {
      this.$apis.getinfo(data).then(res => {
        // 取到所有的数据   数据类型有两种  ksk {}    ns []
        callback(res.data.Tag);
      });
    },
    addCart(){
      console.log(this.showTypes[this.sizeNum]
      
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
      this.sizeNum = n;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#show {
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
}
</style>