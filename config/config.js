export default {
  singular: true,
  routes: [{
    path: '/',
    component: '../layout',
    routes: [{
        path: '/',
        component: 'index',
      },
      {
        path: '/helloworld',
        component: 'Helloworld'
      },
      {
        path: '/css-modules-with-less',
        component: '../page/css-modules-with-less'
      },
      {
        path: '/css-modules-with-antd',
        component: '../page/css-modules-with-antd'
      },
      {
        path: 'puzzlecards',
        component: './puzzlecards'
      },
      {
        path: 'list',
        component: '../page/list'
      },
      {
        path: '/dashboard',
        routes: [{
            path: '/dashboard/analysis',
            component: 'Dashboard/Analysis'
          },
          {
            path: '/dashboard/monitor',
            component: 'Dashboard/Monitor'
          },
          {
            path: '/dashboard/workplace',
            component: 'Dashboard/Workplace'
          }
        ]
      },
    ]
  }],
  antd: {
    compact: false
  }
}