import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from './components/TodoList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList
    },
    {
      path: '/todo/:id',
      name: 'todo',
      component: () => import('./components/TodoEdit.vue')
    },
    {
      path: '/add',
      name: 'todo-add',
      component: () => import('./components/TodoAdd.vue')
    }

  ]
})

export default router