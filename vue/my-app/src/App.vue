<template>
  <div id="app" class="container">

    <section v-show="false">
      <message>hello</message>
      <message>hello (again)</message>
      <hr class="is-medium">
    </section>

    <counter v-show="false"></counter>

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
        <form @submit.prevent="onSubmit" @keydown="errors.clear($event.target.name)">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input type="text" name="title" class="input" placeholder="e.g Code" v-model="title">
            </div>
            <p class="help is-danger" v-if="errors.has('title')" v-text="errors.get('title')"></p>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <input type="text" name="author" class="input" placeholder="e.g Charles Petzold" v-model="author">
            </div>
            <p class="help is-danger" v-if="errors.has('author')" v-text="errors.get('author')"></p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" :disabled="errors.any()">Add</button>
            </div>
          </div>
        </form>
      </div>
      <hr class="is-medium">
    </section>
  </div>
</template>

<script>
import Message from './components/Message.vue'
import Counter from './components/Counter.vue'

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
    delete this.errors[field]
  }

  has(field) {
    return this.errors.hasOwnProperty(field)
  }

  any() {
    return Object.keys(this.errors).length > 0
  }
}

export default {
  name: 'app',
  components: { Message, Counter },
  data () {
    return {
      books: [],
      title: '',
      author: '',
      errors: new Errors()
    }
  },
  mounted() {
    // console.log("fetching...")
    this.refreshTable()
  },
  methods: {
    onSubmit() {
      axios.post('https://zuzhi-core-spring.herokuapp.com/api/v1/books', this.$data, {
      // axios.post('http://localhost:8080/api/v1/books', this.$data, {
        auth: {
          username: 'user',
          password: 'pass'
        }
      })
      .then(this.onSuccess)
      .catch(error => this.errors.record(error.response.data.errors))
    },
    onSuccess(response) {
      alert('Success')
      this.title = ''
      this.author = ''
      this.refreshTable()
    },
    refreshTable() {
      axios.get('https://zuzhi-core-spring.herokuapp.com/api/v1/books').then(response => {
      // axios.get('http://localhost:8080/api/v1/books').then(response => {
        if (response.status === 200) {
          // console.log(response.data)
          this.books = response.data.content
        }
      })
    }
  }
}
</script>

<style>

.container {
  padding-top: 1em;
}

</style>
