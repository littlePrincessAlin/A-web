import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ExpressionLiLin from '../views/Expression/LiLin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ExpressionLiLin
    },
    {
      // vue基础语法test
      path: '/expression',
      name: 'expression',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Expression/ExpressionTest.vue')
    }
  ]
})

export default router
