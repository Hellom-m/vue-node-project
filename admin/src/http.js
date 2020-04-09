import axios from 'axios'
import Vue from 'vue' // 引入 vue

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api/'
})

// http 添加请求头
http.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// http 请求加个全局的拦截器 用于处理全局的错误提示
http.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response.data.message) {
        // 因为 elementUI 实例挂载在 全局 vue 上 所以可以使用 $message 弹框
        Vue.prototype.$message.error(err.response.data.message)
        return Promise.reject(err);
    }
})
export default http