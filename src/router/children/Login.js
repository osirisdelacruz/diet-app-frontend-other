export default {
    path: '/',
    component: () => import('@/views/Global.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/components/Login.vue')
      }
    ]
  }
  