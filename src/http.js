import axios from 'axios'
import router from './router'

// response拦截
axios.interceptors.response.use(res => {
    return res
}, err => {
    console.log('错误:' + err)

    const { status } = err.response
    alert(JSON.stringify(err.response.data))
    if (status == 401) {
        alert('token过期')
        // 清除token
        localStorage.removeItem('wxpyqToken')

        // 页面跳转
        router.push('/login')
    }

    return Promise.reject(err)
})

// request拦截
axios.interceptors.request.use(config => {
    if (localStorage.getItem('wxpyqToken')) {
        config.headers.Authorization = localStorage.getItem('wxpyqToken')
    }

    return config
}, err => Promise.reject(err))

export default axios