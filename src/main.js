import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Game from './components/Game.vue'
import Help from './components/Help.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Game },
  { path: '/help', component: Help },
]

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
