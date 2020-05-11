import axios from 'axios'
import {
    Message,
    Loading
} from 'element-ui'

let baseURL
process.env.NODE_ENV === 'development' ? baseURL = '/api' : baseURL = '/api'

let loading = null
// const $http = axios.create({
//     baseURL
// })
const fetchInstance = axios.create({
    timeout: 8000,
})

// 添加请求头
fetchInstance.interceptors.request.use(
    config => {
        loading = Loading.service()
        config.headers.token = sessionStorage.getItem('token')
        return config
    }, err => {
        Message({
            showClose: true,
            message: err,
            type: 'warning',
        })
        return Promise.reject(err)
    }
)

fetchInstance.interceptors.response.use(
    response => {
        loading.close()
        if (response.data.code === 0) {
            return Promise.resolve(response.data.data)
        } else if (response.data.code === 401 || response.data.code === 403) {
            Message({
                showClose: true,
                message: response.data.msg,
                type: 'error',
            })
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('vuex')
            location.hash = '#/login'
        } else {
            return Promise.reject(response.data)
        }
    },
    error => {
        Message({
            showClose: true,
            message: error.msg || '服务器超时',
            type: 'error',
        })
        return Promise.reject(error)
    }
)

export const get = (url, params) => {
    params = params || {}
    url = baseURL + url
    return new Promise((resolve, reject) => {
        fetchInstance.get(url, {
            params,
        })
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
    })
}

export const post = (url, params) => {
    params = params || {}
    url = baseURL + url
    return new Promise((resolve, reject) => {
        fetchInstance.post(url, params)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
    })
}
