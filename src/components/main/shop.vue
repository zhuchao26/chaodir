<template>
  <div class="warn box">
    <div v-for="(item,index) in cartList" :key="index" class="cart warn">
      <div @click="tg(index)">
        <img
          src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
          alt
          v-show="item.sele"
        />
        <img
          src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
          alt
          v-show="!item.sele"
        />
      </div>
      <div>
        <div class="d1">
          <img :src="`https://res.bestcake.com/m-images/cart/${item.Name}.png`" />
        </div>
        <div class="d2">
          <div v-text="item.Name" class="t1"></div>
          <div class="t2">
            <p v-text="item.Size"></p>
            <p @click="dev(item)">-</p>
            <p>{{item.num}}</p>
            <p @click="add(item)">+</p>
          </div>
          <div class="t3" v-text="item.currentPrice*item.num+'.00'"></div>
        </div>
      </div>
    </div>
    <div class="warn cl">
      <ul>
        <li @click="sec">
          <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg" alt v-show="bool" />
          <img
            src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
            alt
            v-show="!bool"
          />
        </li>
        <li>全选</li>
        <li @click="dele">清空</li>
        <li>
          <div>
            合计：
            <span>{{allPrice}}.00</span>
          </div>
          <div>已优惠：00</div>
        </li>
        <li>结算</li>
      </ul>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import store from "storejs";
export default {
  data() {
    return {
      bool: true,
      cartList: [],
      allPrice:0,
    };
  },
  created() {
    this.$store.commit("vuexInit");
    this.cartList = this.$store.state.cartList;
    this.pageInit();
  },
  methods: {
    pageInit(){
      let num=0;
      this.$store.state.cartList.map(item=>{
        if (item.sele==true) {
          num++;
        }
      })
      if (num==this.$store.state.cartList.length) {
        this.bool=true;
      }else{
        this.bool=false;
      }
      this.count();
    },
    add(data) {//增加
      data.mark = "";
      this.$store.commit("add", data);
      this.count();
    },
    dev(data) { //减少
      if (data.num <= 1) {
        data.num--;
        MessageBox.confirm("", {
          title: "",
          message: "确定要删除此款商品吗?",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(action => {
          this.cartList.map((item, index) => {
            if (item.id == data.id) {
              this.cartList.splice(index, 1);
              store.set("cartList", this.cartList);
            }
          });
        }).catch(()=>{
          data.num++
        })
      } else {
        this.$store.state.cartList.map(i=>{
          if (i.id==data.id) {
            i.num--;
          }
        })
        store.set("cartList",this.$store.state.cartList)
      }
      this.count();
    },
    tg(i){ //切换选中
      let a=this.$store.state.cartList[i]
      a.sele=!a.sele;
      this.$store.state.cartList.splice(i,1,a);
      let num=0;
      this.$store.state.cartList.map(item=>{
        if (item.sele==true) {
          num++;
        }
      })
      if (num==this.$store.state.cartList.length) {
        this.bool=true;
      }else{
        this.bool=false;
      }
      this.count();
    },
    sec(){ //全选
      this.bool=!this.bool;
      this.$store.state.cartList.map(item=>{
        item.sele=this.bool;
      })
      store.set("cartList",this.$store.state.cartList)
      this.count();
    },
    dele(){
      MessageBox.confirm('确定清空购物车?').then(action => {
          this.cartList = [];
          this.$store.state.cartList=[];
          store.set("cartList",this.$store.state.cartList)
          this.bool=false;
        })
          this.count();
    },
    count(){
      let all=0;
      this.$store.state.cartList.map((item,index)=>{
        if (item.sele==true) {
          all+=item.currentPrice*item.num;
        }
      })
      this.allPrice=all;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.warn {
  width: r(375);
  margin: 0 auto;
}
.box {
  background: #f7f7f7;
  position: relative;
}
.cart {
  background: #fff;
  padding-bottom: r(16);
  margin-bottom: r(15);
  height: r(122);
  > div:nth-child(1) {
    float: left;
    margin-left: r(15);
    margin-right: r(11.25);
    img {
      width: r(20);
      margin-top: r(63.75);
    }
  }
  > div:nth-child(2) {
    float: left;
    height: 100%;
    .d1 {
      float: left;
      margin-right: r(16);
      padding-top: r(15);
      width: r(114);
      height: r(106);
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
    .d2 {
      float: left;
      width: r(195);
      height: r(77);
      overflow: hidden;
      padding-top: r(19);
      .t1 {
        font-size: r(16);
        color: #000;
        line-height: r(18);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: r(183.75);
      }
      .t2 {
        margin: r(4.5) 0;
        width: 100%;
        overflow: hidden;
        height: r(25);
        p {
          float: left;
          line-height: r(25);
          font-size: r(16);
          padding: 0 r(8);
          color: #333;
        }
        p:nth-child(1) {
          width: 50%;
          line-height: r(12);
          font-size: r(12);
          color: #ccc;
          margin-top: r(6.4);
          padding: 0;
        }
      }
      .t3 {
        font-size: r(13);
        color: #030303;
        font-weight: bold;
        line-height: r(15);
        margin-top: r(10);
      }
    }
  }
}
.cl {
  position: fixed;
  background: #fff;
  left: 0;
  bottom: r(50);
  height: r(56);
  ul {
    height: r(56);
    li {
      float: left;
      font-size: r(15);
      color: #333;
      line-height: r(56);
      text-align: center;
    }
    li:nth-child(1) {
      width: r(20);
      margin-left: r(11.25);
      margin-right: r(5);
      img {
        width: 100%;
        height: auto;
        margin-top: r(17.5);
      }
    }
    li:nth-child(2) {
      width: r(33.75);
      margin-right: r(15);
    }
    li:nth-child(4) {
      width: r(137.5);
      height: r(43);
      margin-right: r(6.5);
      margin-top: r(9.5);
      font-size: r(12);
      div:nth-child(1) {
        height: r(24);
        line-height: r(24);
        text-align: right;
        padding-right: r(8.5);
        span {
          font-size: r(18);
          color: #f2495e;
        }
      }
      div:nth-child(2) {
        height: r(19);
        line-height: r(16);
        text-align: right;
        padding-right: r(8.5);
      }
    }
    li:nth-child(5) {
      width: r(115);
      line-height: r(56);
      background: #02d4d7;
      color: #fff;
      font-weight: bolder;
    }
  }
}
.foot {
  height: r(200);
}
</style>
