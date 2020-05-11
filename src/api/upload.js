import axios from 'axios'

let baseURL
process.env.NODE_ENV === 'development' ? baseURL = '/api' : baseURL = '/api'

export const upload = (url, formData) => {
    url = baseURL + url
    return new Promise((resolve, reject) => {
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            resolve(res)
        }).then(err => {
            reject(err)
        })
    })
}
