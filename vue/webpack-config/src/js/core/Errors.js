class Errors {
    constructor() {
        this.errors = {}
    }
    get(field) {
        return this.errors[field]
    }
    record(errors) {
        this.errors = {}
        if (errors.length) {
            errors.forEach(error => {
                this.errors[error.field] = 'The ' + error.field + ' field ' + error.defaultMessage
            })
        }
    }
    clear(field) {
        if (field) {
            delete this.errors[field]
            return
        }
        this.errors = {}
    }
    has(field) {
        return this.errors.hasOwnProperty(field)
    }
    any() {
        return Object.keys(this.errors).length > 0
    }
}

export default Errors