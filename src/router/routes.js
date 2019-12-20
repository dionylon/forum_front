
const routes = [
    {
      path: '/',
      component: () => import('@/pages/layout.vue'),
      children: [
        { 
          path: '/',
          name: 'index',
          component: () => import('@/pages/Home.vue'),
          title: '主页'
        },
        { 
          path: '/home',
          name: 'home',
          component: () => import('@/pages/Home.vue'),
          title: '主页'
        }
      ]
    },
    {
      path: '/signIn',
      component: () => import('@/pages/sign/signIn.vue')
    },
    {
      path: '/signUp',
      component: () => import('@/pages/sign/signUp.vue')
    },
    {
      path: '/article',
      name: 'openArticle',
      component: () => import('@/pages/article/article.vue')
    },
    {
      path: '/article/update',
      name: 'updateArticle',
      component: () => import('@/pages/article/update.vue') 
    },
    {
      path: '/write',
      name: 'writeArticle',
      component: () => import('@/pages/article/write.vue')
    },
    {
      path: '/user/profile',
      name: 'userProfile',
      component: () =>import('@/pages/user/profile.vue')
    }
  ]

export default routes;