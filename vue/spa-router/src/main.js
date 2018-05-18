import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './routes'

window.Vue = Vue
Vue.use(VueRouter)

window.axios = axios

new Vue({
    el: '#app',
    router
})