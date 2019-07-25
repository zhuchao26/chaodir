import {UsersData} from './data/userInfo' 

// ajax  拦截器
import axios from 'axios'
// yarn add axios-mock-adapter
import MockAdapter from 'axios-mock-adapter';
// 初始化 拦截器对象
let mock = new MockAdapter(axios);
var user=UsersData;
// 模拟get请求
mock.onGet('/login').reply(config => {
  // 接口传入数据在 config下面获取
  // console.log(config);
  // console.log(UsersData)
  // [状态码,UsersData[0]]
  return new Promise(res=>{
    var userInfo=JSON.parse(config.data).params;
    user.forEach(item => {
      if (item.username==userInfo.username) {
        if (item.password==userInfo.password) {
          res([200,{code:1,msg:'登陆成功',data:item}])
        }else{
          res([200,{code:2,msg:'密码错误'}])
        }
      }
    });
    res([200,{code:3,msg:'帐号不存在'}])
  })
})
mock.onPost('/edit').reply(config => {

	user.push(JSON.parse(config.data).params);
  let n=user.length;
	// 接口传入数据在 config下面获取
	// console.log(config);
	// console.log(UsersData)
	// [状态码,UsersData[0]]
	return [200, user[n-1]];
})

export default axios;	//注意暴露axios


// 在 core/api/index.js  引入  mock暴露 "axios"

// import mock from  "@/mock"


/*
// ,发送ajax模板  例子
 login(data){
    return mock.post("/login",{
      data: data
    })
  }
   login(data){
    return mock.get("/login",{
      params: data
    })
  }
*/










// mock.onGet('/login').reply(config => {
// 	console.log(config)
// 	console.log(UsersData[0])
// 	// 做一个数据效验
// 	var data={
// 				code: 200,
// 				msg: ''
// 			};
	
// 	if(false) {
// 			data.msg="登陆成功";
// 			data.code=1;
// 	}else{
// 			data.msg="账号或者密码错误";
// 			data.code=500
// 	}
// 	return [200,UsersData[0]];
// });

// mock.onPost('/test').reply(config => {
// 	console.log(config)
// 	console.log(UsersData[0])
// 	// 做一个数据效验
// 	var data={
// 				code: 200,
// 				msg: ''
// 			};
	
// 	if(false) {
// 			data.msg="登陆成功";
// 			data.code=200;
    
// 	}else{
// 			data.msg="账号或者密码错误";
// 			data.code=500
// 	}
// 	return [200,UsersData[0]];
// });


// 
