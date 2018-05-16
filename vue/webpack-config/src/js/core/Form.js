import Errors from './Errors'

class Form {
    constructor(data) {
        this.originalData = data
        for (let field in data) {
            this[field] = data[field]
        }
        this.errors = new Errors()
    }
    reset() {
        for (let field in this.originalData) {
            this[field] = ''
        }
        this.errors.clear()
    }
    data() {
        let data = {}
        for (let property in this.originalData) {
            data[property] = this[property]
        }
        return data
    }
    post(url) {
        let requestConfig = {
            auth: {
                username: 'user',
                password: 'pass'
            }
        }
        return this.submit('post', url, requestConfig)
    }
    submit(requestType, url, requestConfig) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data(), requestConfig).then(response => {
                this.onSuccess(response.data)
                resolve(response.data)
            }).catch(error => {
                this.onFail(error.response.data)
                reject(error.response.data)
            })
        })
    }
    onSuccess(data) {
        // alert('Success')
        this.reset()
    }
    onFail(errors) {
        this.errors.record(errors.errors)
    }
}

export default Form