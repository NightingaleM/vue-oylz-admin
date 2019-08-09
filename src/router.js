import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/blogs',
      name: 'blogs',
      children: [{
        path: 'blogs',
        name: 'blogs',
        component: () => import('@/views/Blogs'),
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/404'),
        hidden: true
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
      hidden: true
    }
  ]
})
