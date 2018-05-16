import Vue from 'vue'
import axios from 'axios'
import Form from './core/Form'
import Example from '../components/Example'

window.axios = axios
window.Form = Form

new Vue({
    el: '#app',
    components: { Example },
    data: {
        books: [],
        form: new Form({
            title: '',
            author: ''
        })
    },
    mounted() {
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
            this.form.post('https://zuzhi-core-spring.herokuapp.com/api/v1/books').then(data => this.refreshTable()).catch(errors => console.log(errors))
        }
    }
})