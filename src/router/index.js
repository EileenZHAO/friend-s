import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import Index from '@/components/index'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '*',
      name: 'Login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (!router.app.$judge.isPc()) {
    if (to.name != 'Login') {
      let info = router.app.$base64.base64decode(router.app.$local.fetchSession('loginState'))
      if (info == 'libaicheng') {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  } else {
    location.href = 'http://www.baidu.com'
  }
})

export default router
