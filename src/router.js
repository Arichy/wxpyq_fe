import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/chats',
      component: Index,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/chats',
          name: 'chats',
          component: () => import("@/views/Chats.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: () => import("@/views/Contacts.vue")
        },
        {
          path: '/discover',
          name: 'discover',
          component: () => import("@/views/Discover.vue")
        },
        {
          path: '/me',
          name: 'me',
          component: () => import("@/views/Me.vue")
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/Login.vue")
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/views/Register.vue")
    },
    {
      path: '/moments',
      name: 'moments',
      component: () => import("@/views/Moments.vue")
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/Publish.vue')
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('@/views/Information.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/ChatView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('wxpyqToken') ? true : false

  // if (to.path == "/login" || to.path == "/register") {
  //   next()
  // } else {
  //   if (isLogin) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }

  if (to.meta.requireAuth) {
    isLogin ? next() : next('/login')
  } else {
    next()
  }

})

export default router