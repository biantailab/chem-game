import Vue from 'vue'
// import VueRouter from 'vue-router' // 不再需要
import App from './App.vue'
// import Game from './components/Game.vue' // 不再需要
// import Help from './components/Help.vue' // 如果 Help 页面集成或移除，也不再需要

// Vue.use(VueRouter) // 不再需要

// const routes = [ // 不再需要
//   { path: '/', component: Game },
//   { path: '/help', component: Help },
// ]

// const router = new VueRouter({ // 不再需要
//   routes,
// })

new Vue({
  // router, // 不再需要
  render: (h) => h(App),
}).$mount('#app')
