<template>
  <div id="app" class="container">
    <section>
      <p class="title is-4">Books</p>
      <div class="example">
        <table class="table">
          <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
          </thead>
          <tbody>
            <tr v-for="book in books">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="is-medium">
    </section>

    <section>
      <p class="title is-4">Add new book</p>
      <div class="example">
        <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input type="text" name="title" class="input" placeholder="e.g. Refactoring" v-model="form.title">
            </div>
            <p class="help is-danger" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></p>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <input type="text" name="author" class="input" placeholder="e.g. Martin Fowler" v-model="form.author">
            </div>
            <p class="help is-danger" v-if="form.errors.has('author')" v-text="form.errors.get('author')"></p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" :disabled="form.errors.any()">Add</button>
            </div>
          </div>
        </form>
      </div>
      <hr class="is-medium">
    </section>
  </div>
</template>

<script>
import axios from 'axios'

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
      axios[requestType](url, this.data(), requestConfig)
        .then(response => {
          this.onSuccess(response.data)

          resolve(response.data)
        })
        .catch(error => {
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

export default {
  name: 'app',
  data () {
    return {
      books: [],
      form: new Form({
        title: '',
        author: ''
      })
    }
  },
  mounted() {
    // console.log("fetching...")
    this.refreshTable()
  },
  methods: {
    refreshTable() {
      axios.get('https://zuzhi-core-spring.herokuapp.com/api/v1/books').then(response => {
        if (response.status === 200) {
          // console.log(response.data)
          this.books = response.data.content
        }
      })
    },
    onSubmit() {
      this.form.post('https://zuzhi-core-spring.herokuapp.com/api/v1/books')
        .then(data => this.refreshTable())
        .catch(errors => console.log(errors))
    }
  }
}
</script>

<style>

.container {
  padding: 1em;
}

</style>
