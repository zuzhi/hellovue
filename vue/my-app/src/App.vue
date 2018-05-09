<template>
  <div id="app">
    <message>hello</message>
    <message>hello (again)</message>

    <counter></counter>

    <h1>Books</h1>
    <p>Fetch data from `https://zuzhi-core-spring.herokuapp.com/api/v1/books` using Axios</p>
    <table>
      <thead>
        <th>Id</th>
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
</template>

<script>
import Message from './components/Message.vue'
import Counter from './components/Counter.vue'

import axios from 'axios'

export default {
  name: 'app',
  components: { Message, Counter },
  data () {
    return {
      books: []
    }
  },
  mounted() {
    console.log("fetching...")
    axios.get('https://zuzhi-core-spring.herokuapp.com/api/v1/books').then(response => {
    // axios.get('http://localhost:8080/api/v1/books').then(response => {
      if (response.status === 200) {
        console.log(response.data)
        this.books = response.data.content
      }
    })
  }
}
</script>

<style>

</style>
