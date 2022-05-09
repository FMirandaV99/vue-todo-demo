import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'todo',
    component: () => import(/* webpackChunkName: "todo" */ '../views/TodoView.vue'),
    children: [
      {
        path: '/',
        name: 'todo-list',
        component: () => import(/* webpackChunkName: "todo-list" */ '../components/TodoList.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { 
    path: '/:pathMatch(.*)*',
    component: () => import( '../views/PageNotFound.vue')
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
