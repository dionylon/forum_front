
const routes = [
    {
      path: '/',
      component: () => import('@/components/layout.vue'),
      children: [
        { 
          path: '/',
          name: 'index',
          component: () => import('@/views/Home.vue'),
          title: '主页'
        },
        { 
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue'),
          title: '主页'
        },
        { 
            path: '/find',
            name: 'find',
            component: () => import('@/views/Find.vue'),
            title: '发现'
        }
      ]
    },
    {
      path: '/signIn',
      component: () => import('@/components/signIn.vue')
    },
    {
      path: '/signUp',
      component: () => import('@/components/signIn.vue')
    }
  ]

export default routes;