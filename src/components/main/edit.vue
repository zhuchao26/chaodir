<template>
  <div id="register">
    <div class="return" @click="back"><</div>
    <h1>注册</h1>
    <div class="reg">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="昵称" placeholder="请输昵称" type="text" v-model="nickname"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="text" v-model="password"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    </div>
    <div class="loadpic">
      <span>上传头像</span>
      <button v-onloadPic="{multiple:true}">上传头像</button>
      <br />
      <span>预览</span>
      <img :src="url" v-if="url!=''" />
    </div>
    <div class="btn">
      <button @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phone: "",
      nickname: "",
      url: ""
    };
  },
  mounted() {},
  methods: {
    register() {
				let data = {
					username: this.username,
					email: this.email,
					password: this.password,
					phone: this.phone,
					nickname: this.nickname,
					img:this.url
				}
				this.$apis.edit(data).then((res) => {
					if(res.status == 200) {
						//console.log(res)
						let instance = Toast({
							message: '注册成功',
						});
						setTimeout(() => {
							instance.close();
							this.$router.push({
								path: "/login"
							})
						}, 1000);
					} else {
						Toast({
							message: '注册失败',
						});
					}
				});
      },
      fileUpload(url) {
				this.url = url;				
			},
			back(){
				this.$router.push("/index");
				this.$store.state.cIndex=0;
			},
		watch: {
			ImgSrc() {
				console.log(111)
			}
		}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
