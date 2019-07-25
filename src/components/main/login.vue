<template>
  <div id="register">
    <div class="return" @click="back"><</div>
    <h1>登录</h1>
    <div class="reg">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
    <div class="btn">
      <button @click="login">登录</button>
      <button @click="toReg">注册</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {

  },
  methods: {
    login() {
				let data = {
					username: this.username,
					password: this.password
				}
				this.$apis.login(data).then((res) => {
					//console.log(res)
					if(res.data.code == 200 ) {
						let query = {
							nickname: res.data.data.nickname,
							img: res.data.data.img
						}
						let info=JSON.stringify(query)						
						localStorage.setItem("userinfo",info)	
						
						this.$store.state.cIndex=3;
						let instance = Toast('登陆成功,正在跳转...');
						setTimeout(() => {
							instance.close();
							this.$router.push({
								path: "/my"							
							})

						}, 1000)

					} else {
						Toast(res.data.msg);
					}
				});
		  },
			toReg(){
				this.$router.push({
					path:'/edit'
				})
			},
			back(){
				this.$router.push("/index");
				this.$store.state.cIndex=0;
			}
		}
  }
</script>

<style lang="scss" scoped>
	#register {
		background: linear-gradient(-90deg, rgba(54, 209, 220, 1), rgba(9, 152, 154, 1));
		height: r(667);
		width: 100%;
		position: relative;
		.return{
			text-align: left;
			width: r(50);
			height: r(50);
			font-size: r(40);
			margin-left: r(20);
			font-weight: bold;
		}
		.reg {
			position: absolute;
			left: r(20);
			top: r(100);
			.mint-cell {
				background: transparent;
				input {
					background: transparent;
				}
			}
		}
		h1 {
			color: #fff;
			font-size: r(32);
			position: absolute;
			line-height: r(45);
			left: r(20);
			top: r(40);
		}
		.btn {
			position: absolute;
			left: r(130);
			top: r(260);
			button {
				width: r(100);
				height: r(40);
				border-radius: r(20);
				background: linear-gradient(to right, black, #ccc);
				color: #fff;
				line-height: r(36);
				font-size: r(20);
				margin-right: r(20);
			}
		}
	}
</style>