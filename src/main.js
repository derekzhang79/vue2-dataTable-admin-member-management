import Vue from 'vue'
import App from './App.vue'
import Router from './router.js'

// console.log(Router)
new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
