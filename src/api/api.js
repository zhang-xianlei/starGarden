import {
    post,
    get
} from './http'

export {
    upload
}
    from './upload'

// 接口示例
export function fetchApi(apiParams = {}) {
    return post('/apiUrl', apiParams)
}
