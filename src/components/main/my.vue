<template>
  <div id="my">
		<div class="">
			<div class="baseinfo">
				<div class="img">
					<img :src="storage.img" alt="" />
				</div>
				<div class="name">{{storage.nickname}}</div>
			</div>
			<div class="adress">

			</div>
			
			<div class="exit">
				<button @click="exit">退出</button>
			</div>
		</div>
	</div>
</template>

<script>
import Store from "storejs";
export default {
  data() {
    return {
      userInfo: {},
			storage: ""
    };
  },
  created(){
    this.userInfo = this.$route.query;
			this.storage = JSON.parse(localStorage.getItem('userinfo'))||""
			if(!Boolean(this.storage)){
				this.$router.push({
					path: "/login"
				})
			}
  },
  methods:{
      exit(){
				Store.remove("userinfo");
				this.$router.push("/login")
			}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#my {
		background: rgb(247, 247, 247);
		.baseinfo {
			background: #fff;
			width: auto;
			margin-bottom: r(20);
			.img {
				margin-top: r(25);
				img {
					width: r(100);
					height: r(100);
					border-radius: 50%;
				}
			}
			.name {
				width: 100%;
				padding: r(15) r(0);
				font-size: r(22);
				color: #333;
				height: r(30);
				line-height: r(30);
			}
		}
		.adress {
			width: 100%;
			height: r(60);
			background: #fff;
		}
		.exit{
			background: #fff;
			button{
				width: r(200);
				height: r(40);
				border-radius: r(10);
				background: red;
				color: #fff;
				font-size: r(22);
				
			}
		}
	}
</style>
