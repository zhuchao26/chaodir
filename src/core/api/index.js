import request from "./http"
import mock from '@/mock'
class Apis {
    // json1811.ashx?v=1562741893374&c=NewIndexController&m=index
    getIndexData() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1563179591924",
                "c": "NewIndexController",
                "m": "index"
            }
        });
    }
    getIninfoData() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1563410822863",
                "c": "NsCakeCenter",
                "m": "GetJdListNew"
            }
        });
    }
    getinfo(params) {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params
        });
    }
    edit(data){
		return mock.post("/edit",{
          params: data
        })
	}
	
	login(data){
		return mock.post("/login",{
          params: data
        })
	}
}
export default new Apis();