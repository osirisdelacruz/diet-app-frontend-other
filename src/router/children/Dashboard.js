export default {
    path: '/dashboard',
    component: () => import('@/views/Global.vue'),
    children: [
      {
        path: 'psr/home',
        name: 'dashboard-psr',
        component: () => import('@/components/Dashboard/Psr/DashboardPsr.vue'),
      },
      {
        path: 'psr/md',
        name: 'dashboard-psr-md',
        component: () => import('@/components/Dashboard/Psr/Md/DashboardPsrMd.vue')
      },
      {
        path: 'psr/md/:code/',
        name: 'dashboard-psr-md-view',
        component: () => import('@/components/Dashboard/Psr/Md/DashboardPsrMdView.vue'),
        children: [
          {
            path: 'secretary',
            name: 'dashboard-psr-md-secretary',
            component: () => import('@/components/Dashboard/Psr/Md/Secretary/DashboardPsrMdSecretary.vue')
          },
          {
            path: 'profile',
            name: 'dashboard-psr-md-profile',
            component: () => import('@/components/Dashboard/Psr/Md/Profile/DashboardPsrMdProfile.vue')
          }
        ]
      },
      //----------------------------------------------------
      {
        path: 'md/home',
        name: 'dashboard-md',
        component: () => import('@/components/Dashboard/Md/DashboardMd.vue'),
      }

    ]
  }
  